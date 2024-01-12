"use client";

import useLocalStorageState from "use-local-storage-state";
import { ReactReader } from "react-reader";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Lottie from "lottie-react";
import Loading from "../../../../../public/loading.json";

export const dynamic = "force-dynamic";

export default function Reader() {
  const searchParams = useSearchParams();
  const [bookTitle, setBookTitle] = useState<string>();
  const [location, setLocation] = useLocalStorageState<string | number>(
    "persist-location",
    {
      defaultValue: 0,
    }
  );

  const id = searchParams.get("id");

  const fetcher = (...args: [RequestInfo, RequestInit?]) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/book?id=${id}`, fetcher);

  useEffect(() => {
    if (data?.data?.length > 0) {
      setBookTitle(data.data[0].title);
    }
  }, [data]);

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
      <div className="mx-2 md:mx-12 text-center mt-[8em] text-3xl">
        Book not found.
      </div>
    );

  if (error)
    return (
      <div className="mx-2 md:mx-12 text-center mt-[8em] text-3xl">
        Can&apos;t load the book.
      </div>
    );

  return (
    <div style={{ height: "100vh" }} className="mx-2 md:mx-12">
      <ReactReader
        url="https://izfdjscvmavogprtzufx.supabase.co/storage/v1/object/public/library/Metamorphosis_Kafka.epub"
        title={bookTitle}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
      />
    </div>
  );
}
