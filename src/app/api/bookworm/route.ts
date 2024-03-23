import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const twofactor = require("node-2fa");

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    const user = req.cookies.get("bookworm");
    const id = req.cookies.get("id");
    if (!user?.value || !id)
      return NextResponse.json({
        error:
          "Invalid data sent from the client. Make sure username and id are provided.",
      });

    const newSecret = twofactor.generateSecret({
      name: "Library Tower",
      account: `${user.value}`,
    });

    console.log(newSecret);

    const { data: bookworm, error } = await supabase
      .from("bookworm")
      .insert([
        {
          id: `${id.value}`,
          username: `${user.value}`,
          secret: newSecret.secret,
          uri: newSecret.uri,
        },
      ])
      .select("id, username");

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error });
    }

    return NextResponse.json({ data: bookworm });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error occurred." });
  }
}
