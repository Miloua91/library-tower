import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

export async function GET(req: NextRequest) {
  const user = req.cookies.get("bookworm");
  if (!user)
    return NextResponse.json({
      error: "No user sent from the client.",
    });
  try {
    let { data: bookworm, error } = await supabase
      .from("bookworm")
      .select("id, username")
      .eq("username", `${user.value}`);

    const newFactorResponse = await client.verify.v2
      .services("VA2569c344f0ec746da93abb75412c1a76")
      .entities(bookworm[0].id)
      .newFactors.create({
        friendlyName: `Library Tower`,
        factorType: "totp",
      });

    const link = newFactorResponse;

    return NextResponse.json({ data: bookworm, error, link });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
