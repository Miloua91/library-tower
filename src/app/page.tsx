import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-2 md:mx-12">
      <div className="relative flex flex-col xl:mx-20">
        <div className="text-center relative translate-y-10 lg:translate-y-36 flex flex-col gap-5 sm:gap-10 h-10 lg:w-2/4">
          <div>
            <h1 className="text-5xl lg:text-7xl">Library Tower</h1>
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl">
              Discover and read a wide variety of public domain books across
              different genres and topics. Whether you're interested in classic
              literature, philosophy, or nonefiction, our platform offer a
              wealth of reading material. Enjoy your exploration!
            </h2>
          </div>
        </div>
        <div className="absolute translate-y-96 lg:translate-y-24 w-full lg:w-96 h-96 right-0 bg-gray-100 rounded-xl">
          <Link href="#">
            <div className="absolute bottom-2 cursor-pointer right-44 rotate-12 bg-gray-950 hover:bg-gray-900 h-3/4 w-16">
              <div className="text-xl translate-y-36 -rotate-90 text-yellow-200">
                Popular
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="absolute bottom-2 cursor-pointer right-24 rotate-6 bg-gray-950 hover:bg-gray-900 h-3/4 w-16">
              <div className="text-xl translate-y-36 -rotate-90 text-yellow-200">
                Fiction
              </div>
            </div>
          </Link>
          <Link href="#">
            <div className="absolute bottom-2 cursor-pointer right-4 bg-gray-950 hover:bg-gray-900 h-3/4 w-16">
              <div className="text-xl translate-y-36 -rotate-90 text-yellow-200">
                Nonefiction
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
