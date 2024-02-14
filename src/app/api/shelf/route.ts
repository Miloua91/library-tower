import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  const bookworm = req.cookies.get("id");
  const bookId = req.cookies.get("bookId");
  const id: number = parseInt(bookId?.value ?? "0", 10);

  if (!bookworm || !id)
    return NextResponse.json({
      error: "No book data sent from the client.",
    });

  try {
    const { data, error } = await supabase
      .from("shelf")
      .insert([{ id: `${id}-${bookworm.value}`, book: id, bookworm: `${bookworm.value}` }])
      .select();
    return NextResponse.json({ data, error });
  } catch (err) {
    return NextResponse.json({ err });
  }
}
