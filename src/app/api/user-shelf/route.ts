import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  const bookworm = req.cookies.get("id");
  if (!bookworm)
  return NextResponse.json({
    error: "You need to login.",
  });
  try {
    let { data: books, error } = await supabase
      .from("shelf")
      .select("id, book(id, title, author(name))")
      .eq("bookworm", `${bookworm.value}`);
    return NextResponse.json({ data: books, error });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
