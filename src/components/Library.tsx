"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Lottie from "lottie-react";
import Loading from "../../public/loading.json";

interface Books {
  author: {
    name: string;
  };
  title: string;
  id: number;
}

interface Route {
  route: string;
}

export default function LibraryShelf({route}: Route) {
  const searchParams = useSearchParams();
  const id = searchParams.get("shelf");
  const shelf: number = id !== null ? parseInt(id, 10) : 0;

  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    `/api/${route}?shelf=${shelf}`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="mx-2 md:mx-12 text-center">
        <Lottie
          className="m-auto h-80 w-80 mt-20"
          animationData={Loading}
          loop={true}
        />
        <div className="-mt-20 text-xl">Loading...</div>
      </div>
    );

  if (data?.data?.length === 0)
    return (
      <ul className="flex flex-col items-center mx-2 md:mx-12 text-center justify-center mt-[8em] text-3xl">
        <h1>The shelf is empty.</h1>
        <PaginationPrevious href={`/${route}?shelf=${shelf - 1}`} />
      </ul>
    );

    function convertToRomanNumber(number: number) {
    const romanNumerals = ['I', 'IV', 'V', 'IX', 'X', 'XL', 'L', 'XC', 'C', 'CD', 'D', 'CM', 'M'];
    const arabicValues = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];
    
      let result = '';
    
      for (let i = arabicValues.length - 1; i >= 0; i--) {
        while (number >= arabicValues[i]) {
          result += romanNumerals[i];
          number -= arabicValues[i];
        }
      }
    
      return result;
    }
    
    const romanNumber = convertToRomanNumber(shelf);
    

  return (
    <div className="mx-2 md:mx-12">
      <h1 className="text-center mt-10 text-xl mb-10">SHELF {romanNumber}</h1>
      <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 justify-items-center">
        {data?.data?.sort((a: Books, b: Books) => b.id - a.id)?.map((book: Books) => (
          <div
            key={book.id}
            className="relative bg-gray-950 w-20 h-96 px-5 mb-5 cursor-pointer hover:bg-gray-900 group"
          >
            <Link
              href={{
                pathname: `/library/book/${book.id}`,
                query: { book: book.title },
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
                    <div className="text-center w-48">{book.author.name}</div>
                    <div className="text-center w-72">{book.title}</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/${route}?shelf=${shelf - 1}`}
              className={shelf <= 1 ? "pointer-events-none" : ""}
              aria-disabled={shelf <= 1}
              tabIndex={shelf <= 1 ? -1 : undefined}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`/${route}?shelf=${shelf === 1 ? shelf : shelf - 1}`}
              isActive={shelf === 1}
            >
              {shelf === 1 ? shelf : shelf - 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`/${route}?shelf=${shelf === 1 ? shelf + 1 : shelf}`}
              isActive={shelf > 1}
            >
              {shelf === 1 ? shelf + 1 : shelf}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`/${route}?shelf=${shelf === 1 ? shelf + 2 : shelf + 1}`}
            >
              {shelf === 1 ? shelf + 2 : shelf + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className={data?.data?.length < 12 ? "hidden" : ""}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`/${route}?shelf=${shelf + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
