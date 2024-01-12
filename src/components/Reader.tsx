"use client";

import useLocalStorageState from "use-local-storage-state";
import { ReactReader } from "react-reader";

type Title = {
    bookTitle: string | null;
  };

export default function Reader(bookTitle: Title) {
  const [location, setLocation] = useLocalStorageState<string | number>(
    "persist-location",
    {
      defaultValue: 0,
    }
  );

  return (
    <div style={{ height: "100vh" }} className="mx-2 md:mx-12">
      <ReactReader
        url="https://izfdjscvmavogprtzufx.supabase.co/storage/v1/object/public/library/Metamorphosis_Kafka.epub"
        title={`${bookTitle.bookTitle}`}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
      />
    </div>
  );
}
