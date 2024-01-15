"use client";
import { setCookie, getCookie } from "cookies-next";
import Image from "next/image";
import { toast } from "sonner";
import useSWR from "swr";

interface AddBooksProps {
  id: number;
}
interface Book {
  book: {
    id: number;
  };
}

export default function AddBooks({ id }: AddBooksProps) {
  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR('/api/user-shelf', fetcher);

  const user = getCookie("id");

  async function AddBook() {
    const user = getCookie("id");
    setCookie("bookId", id);
    const response = await fetch("/api/shelf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, user }),
    });
    const res = await response.json();

    if (res.error) {
      const duplicate = res.error.code || "";

      if (duplicate === "23505") {
        toast.info("This book is already in your shelf.");
      }
    } else {
      mutate();
      toast.success("Book added to your shelf.");
    }
  }

  async function RemoveBook() {
    setCookie("bookId", id);
    const response = await fetch("/api/delete-book", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    mutate();
    toast.success("Book removed from your shelf.");
  }

  if (isLoading)
    return (
      <>
        <div className="flex flex-col items-center">
          <Image
            src={"/shelf.svg"}
            alt="Shelf"
            width={32}
            height={32}
            priority
          />
          <label>Loading...</label>
        </div>
      </>
    );

  if (!user)
    return (
      <>
        <div className="flex flex-col items-center">
          <Image
            className="cursor-pointer"
            src={"/shelf.svg"}
            alt="Shelf"
            onClick={() => toast.info("You need to join to add books to your shelf.")}
            width={32}
            height={32}
            priority
          />
          <label>Add to shelf</label>
        </div>
      </>
    );

  if (data?.data?.map((book: Book) => book.book.id).includes(id))
    return (
      <>
        <div className="flex flex-col items-center">
          <Image
            onClick={() => {
              RemoveBook();
            }}
            className="cursor-pointer"
            src={"/shelf.svg"}
            alt="Shelf"
            width={32}
            height={32}
            priority
          />
          <label>Remove from shelf</label>
        </div>
      </>
    );

  if (user)
    return (
      <>
        <div className="flex flex-col items-center">
          <Image
            onClick={() => AddBook()}
            className="cursor-pointer"
            src={"/shelf.svg"}
            alt="Shelf"
            width={32}
            height={32}
            priority
          />
          <label>Add to shelf</label>
        </div>
      </>
    );
}
