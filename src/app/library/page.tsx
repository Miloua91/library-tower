import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Library | Library Tower",
  description: "Browse public domain books",
};

interface Books {
  author: {
    name: string;
  };
  title: string;
  id: number;
}

export default async function Library() {
  const res = await import("@/app/api/library/route");
  const books: { data: Books[] } = await (await res.GET()).json();
  return (
    <div className="mx-2 md:mx-12">
      <h1 className="text-center mt-10 text-xl mb-10">SHELF I</h1>
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 justify-items-center">
        {books.data.map((book) => (
          <div
            key={book.id}
            className="relative bg-gray-950 w-20 h-96 px-5 mb-5 cursor-pointer hover:bg-gray-900 group"
          >
            <Link href={{
                  pathname: `/library/book/${book.id}`,
                  query: { book: book.title },
                }}>
            <div className="absolute border-t-2 w-8 border-yellow-200 mt-2 ml-1"></div>
            <div className="absolute border-t-2 w-8 border-yellow-200 mt-4 ml-1"></div>
            <div className="absolute h-4 w-4 bg-yellow-200 rounded-tl-full rotate-180 -ml-3 top-4"></div>
            <div className="absolute h-4 w-4 bg-gray-950 group-hover:bg-gray-900 rounded-tl-full rotate-180 -ml-5 top-[15px]"></div>
            <div className="absolute h-4 w-4 bg-yellow-200 rounded-tl-full -rotate-90 ml-9 top-4"></div>
            <div className="absolute h-4 w-4 bg-gray-950 group-hover:bg-gray-900 rounded-tl-full -rotate-90 ml-11 top-[15px]"></div>
            <div className="absolute border-l-2 border-r-2 border-yellow-200 h-80 w-16 -ml-3 top-8"></div>
            <div className="absolute h-4 w-4 bg-yellow-200 rounded-tl-full -rotate-135 ml-9 bottom-4"></div>
            <div className="absolute h-4 w-4 bg-gray-950 group-hover:bg-gray-900 rounded-tl-full -rotate-135 ml-11 bottom-[15px]"></div>
            <div className="absolute h-4 w-4 bg-yellow-200 rounded-tl-full rotate-90 -ml-3 bottom-4"></div>
            <div className="absolute h-4 w-4 bg-gray-950 group-hover:bg-gray-900 rounded-tl-full rotate-90 -ml-5 bottom-[15px]"></div>
            <div className="absolute border-t-2 w-8 border-yellow-200 mt-4 ml-1 bottom-4"></div>
            <div className="absolute border-t-2 w-8 border-yellow-200 mt-2 ml-1 bottom-2"></div>
            <div className="flex justify-center items-center h-80 whitespace-normal break-words mt-8">
              <div className="rotate-90  text-center ">
                <div className="flex items-center text-yellow-200 text-gl w-80">
                  <div className="text-center w-48">{book.author.name}</div>
                  <div className="text-center w-72">{book.title}</div>
                </div>
              </div>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
