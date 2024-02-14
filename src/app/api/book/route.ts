import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  const idParam: string | null = req.nextUrl.searchParams.get("id");
  const id: number = idParam !== null ? parseInt(idParam, 10) : 0; 
  try {
    let { data: books, error } = await supabase
      .from("books")
      .select("id, title, link, read")
      .eq("id", id);
    return NextResponse.json({ data: books, error });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
