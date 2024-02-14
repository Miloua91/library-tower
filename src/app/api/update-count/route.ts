import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
    const readingCount = await req.json();
  try {
    const { data, error } = await supabase
      .from("books")
      .update({ read: readingCount.updatedReadCount })
      .eq("id", readingCount.id)
      .select();
    return NextResponse.json({ readingCount });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
