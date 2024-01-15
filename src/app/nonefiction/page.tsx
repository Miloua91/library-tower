export const dynamic = "force-dynamic";
import type { Metadata, ResolvingMetadata } from "next";
import LibraryShelf from "@/components/Library";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = parseInt(searchParams.shelf, 10);

  function convertToRomanNumber(number: number) {
    const romanNumerals = [
      "I",
      "IV",
      "V",
      "IX",
      "X",
      "XL",
      "L",
      "XC",
      "C",
      "CD",
      "D",
      "CM",
      "M",
    ];
    const arabicValues = [1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

    let result = "";

    for (let i = arabicValues.length - 1; i >= 0; i--) {
      while (number >= arabicValues[i]) {
        result += romanNumerals[i];
        number -= arabicValues[i];
      }
    }

    return result;
  }

  const romanNumber = convertToRomanNumber(id);

  return {
    title: `Shelf ${romanNumber} - Library | Library Tower`,
  };
}

export default async function Library() {
  return <LibraryShelf route="nonefiction" />;
}
