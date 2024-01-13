import type { Metadata } from "next";
import LibraryShelf from "@/components/Library";

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
  return <LibraryShelf />
}
