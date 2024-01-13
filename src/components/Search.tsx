import { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { DialogClose } from "@/components/ui/dialog";
import Link from "next/link";

interface Author {
  name: string;
}

interface Book {
  id: number;
  title: string;
  author: Author;
}

interface GroupedBooks {
  [authorName: string]: Book[];
}

export default function Search() {
  const [books, setBooks] = useState<Book[]>([]);
  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR(`/api/search`, fetcher);
  
  useEffect(() => {
    if (data) {
      setBooks(data.data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  const groupBooksByAuthor = (): GroupedBooks => {
    const groupedBooks: GroupedBooks = {};
    books?.forEach((book) => {
      const authorName = book.author.name;
      if (!groupedBooks[authorName]) {
        groupedBooks[authorName] = [];
      }
      groupedBooks[authorName].push(book);
    });
    return groupedBooks;
  };

  const groupedBooks: GroupedBooks = groupBooksByAuthor();

  return (
    <>
      <Command>
        <CommandInput className="text-lg" placeholder="Search library tower" />
        <CommandList>
          {Object.keys(groupedBooks).map((authorName) => (
            <CommandGroup key={authorName} heading={authorName}>
              {groupedBooks[authorName].map((book) => (
                <Link
                  key={book.id}
                  href={{
                    pathname: `/library/book/${book.id}`,
                    query: { book: book.title },
                  }}
                >
                  <DialogClose className="flex flex-col w-full text-start">
                    <CommandItem className="w-full">
                      {authorName} - {book.title}
                    </CommandItem>
                  </DialogClose>
                </Link>
              ))}
              <CommandSeparator />
            </CommandGroup>
          ))}
        </CommandList>
      </Command>
    </>
  );
}
