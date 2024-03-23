import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  const user = req.cookies.get("bookworm");
  if (!user)
    return NextResponse.json({
      error: "No user sent from the client.",
    });

  try {
    let { data: bookworm, error } = await supabase
      .from("bookworm")
      .select("id, username, secret, uri")
      .eq("username", `${user.value}`);

    return NextResponse.json({ data: bookworm, error });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
