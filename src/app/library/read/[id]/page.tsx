
import type { Metadata, ResolvingMetadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../../database.types";
import Reader from "@/components/Reader";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const revalidate = 3600;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  let { data: book } = await supabase
    .from("books")
    .select("*, author(name)")
    .eq("id", id);

  if (!book || book.length === 0) {
    return {
      title: "Book not found | Library Tower",
    };
  }
  const { title, author } = book[0];

  return {
    title: `${title} - ${author.name} | Library Tower`,
  };
}

export default async function Read({ params }: { params: { id: number } }) {

  let { data: book } = await supabase
  .from("books")
  .select("title, link")
  .eq("id", params.id);

if (!book || book?.length === 0) {
  return (
    <div className="mx-2 md:mx-12 text-center mt-[8em] text-3xl">
      Book not found
    </div>
  );
}

const { title, link } = book[0];

 return <Reader bookTitle={title} bookLink={link} />
}
