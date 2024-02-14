import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../../../database.types";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import AddBooks from "@/components/AddBook";
import ReadButton from "@/components/ReadButton";

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

  let { data: book } = await supabase
    .from("books")
    .select("*, author(name)")
    .eq("id", params.id);

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
export default async function Book({ params }: { params: { id: number } }) {
  let { data: book } = await supabase
    .from("books")
    .select("*, author(name)")
    .eq("id", params.id);

  if (!book || book.length === 0) {
    return (
      <div className="mx-2 md:mx-12 text-center mt-[8em] text-3xl">
        Book not found
      </div>
    );
  }

  const { id, title, author, description } = book[0];
  

  return (
    <div className="mx-2 md:mx-12 flex flex-col-reverse items-center text-center mt-8 lg:flex-row lg:text-start lg:my-10">
      <div className="lg:w-[320em]">
        <h1 className="text-2xl lg:text-4xl">{title}</h1>
        <p>{author.name}</p>
        <div className="lg:flex lg:flex-col-reverse">
          <div className="flex justify-around mt-4">
            <ReadButton id={id} title={title}/>
            <AddBooks id={id}/>
          </div>
          <hr className="my-2" />
          <p className="text-start lg:mt-1">{description}</p>
        </div>
      </div>
      <div className="relative lg:mx-20 lg:w-[140em] 2xl:w-[80em]">
        <div className="absolute w-[10em] flex flex-col gap-32 text-center text-yellow-200 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <div className="text-2xl lg:text-xl">{title}</div>{" "}
          <div className="text-xl">{author.name}</div>
        </div>
        <Image
          className="bg-gray-950 w-72 lg:w-[140em]"
          src="/cover.svg"
          alt="Book cover"
          width={520}
          height={726}
          priority
        />
      </div>
    </div>
  );
}
