"use client";
import Link from "next/link";
import useSWR from "swr";
import Lottie from "lottie-react";
import Loading from "../../public/loading.json";

interface Books {
  book: {
    id: number;
    title: string;
    author: {
      name: string;
    };
  };
}

export default function Shelfs() {
  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/user-shelf`, fetcher);

  if (isLoading)
    return (
      <div className="mx-2 md:mx-12 text-center">
        <Lottie className="m-auto h-80 w-80 mt-20" animationData={Loading} loop={true}/>
        <div className="-mt-20 text-xl">Loading...</div>
      </div>
    );

  if (data.error)
    return (
      <div className="mx-2 md:mx-12 text-center mt-[8em] text-3xl">
        Join the library to add books to your shelf.
      </div>
    );

  if (!data || !Array.isArray(data.data) || data.data.length === 0)
    return (
      <div className="mx-2 md:mx-12 text-center mt-[8em] text-3xl">
        No books in your shelf.
      </div>
    );

  return (
    <div className="mx-2 md:mx-12">
      <h1 className="text-center mt-10 text-xl mb-10">SHELF I</h1>
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 justify-items-center">
        {data.data.map((shelf: Books) => (
          <div
            key={shelf.book.id}
            className="relative bg-gray-950 w-20 h-96 px-5 mb-5 cursor-pointer hover:bg-gray-900 group"
          >
            <Link
              href={{
                pathname: `/library/book/${shelf.book.id}`,
                query: { book: shelf.book.title },
              }}
            >
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
                    <div className="text-center w-48">
                      {shelf.book.author.name}
                    </div>
                    <div className="text-center w-72">{shelf.book.title}</div>
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
