import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const twofactor = require("node-2fa");

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  const user = req.cookies.get("bookworm");
  const token = req.cookies.get("otp");
  console.log(token?.value);
  if (!user)
    return NextResponse.json({
      error: "No user sent from the client.",
    });
  if (!token)
    return NextResponse.json({
      error: "No token sent from the client.",
    });

  try {
    let { data: bookworm, error } = await supabase
      .from("bookworm")
      .select("id, username, secret")
      .eq("username", `${user.value}`);

    const isValidToken = twofactor.verifyToken(bookworm[0].secret, token.value);
    if (isValidToken.delta === 0)
      return NextResponse.json({
        data: bookworm,
        error,
      });

    if (isValidToken.delta !== 0)
      return NextResponse.json({
        expired: "Expired 2FA token.",
      });

    if (isValidToken === null)
      return NextResponse.json({
        error: "Invalid 2FA token.",
      });

    return NextResponse.json({ data: bookworm, error });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
