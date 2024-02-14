"use client";

import useLocalStorageState from "use-local-storage-state";
import { ReactReader } from "react-reader";

type Data = {
    bookTitle: string | null;
    bookLink: string | null;
}

export default function Reader(book: Data) {
  const [location, setLocation] = useLocalStorageState<string | number>(
    `${book.bookTitle}`,
    {
      defaultValue: 0,
    }
  );

  return (
    <div style={{ height: "100vh" }} className="md:mx-12">
      <ReactReader
        url={book.bookLink ?? ""}
        title={book.bookTitle ?? ""}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
      />
    </div>
  );
}
