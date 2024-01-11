import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    let { data: books, error } = await supabase
      .from("books")
      .select("id, title, author(name)");
    return NextResponse.json({ data: books, error });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
