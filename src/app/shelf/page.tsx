import type { Metadata } from "next";
import Link from "next/link";
import Shelfs from "@/components/Shelf";

export const metadata: Metadata = {
  title: "Shelf | Library Tower",
  description: "Store public domain books in your shelf",
};


export default async function Shelf() {
 return <Shelfs />
}
