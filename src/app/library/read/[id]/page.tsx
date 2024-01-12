
import type { Metadata } from "next";
import Reader from "@/components/Reader";

export const metadata: Metadata = {
  title: "Read | Library Tower",
  description: "Store public domain books in your shelf",
};

export default async function Shelf() {

 return <Reader />
}
