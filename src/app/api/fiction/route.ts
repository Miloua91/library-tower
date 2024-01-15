import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function GET(req: NextRequest) {
  const idParam: string | null = req.nextUrl.searchParams.get("shelf");
  const page: number = idParam !== null ? parseInt(idParam, 10) : 0;
  const size = 12;
  
  const limit = size ? +size : 3;
  const pageOrDefault = page ? +page : 0;
  const from = (pageOrDefault - 1) * limit;
  const to = from + size - 1;
  
  try {
    let { data: books, error } = await supabase
      .from("books")
      .select("id, title, author(name)")
      .eq("isFiction", true )
      .range(from, to);
    return NextResponse.json({ data: books, error });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
