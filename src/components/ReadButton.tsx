"use client";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface Book {
    id: number;
    title: string | null;
}

export default function ReadButton({ id, title }: Book) {
  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/book?id=${id}`, fetcher);

  const read = data?.data[0]?.read;

  async function UpdateCount() {
    if (read !== null && read !== undefined) {
        const updatedReadCount = read + 1;
    const response = await fetch("/api/update-count", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, updatedReadCount }),
    });
  }
}

  return (
    <div className="flex flex-col items-center">
            <Link href={{
                  pathname: `/library/read/${id}`,
                  query: { book: title },
                }}>
                <Image src={"/read.svg"} alt="Read" width={32} height={32} priority onClick={() => UpdateCount()}/>
                <label>Read</label>
              </Link>
            </div>
  )
}
