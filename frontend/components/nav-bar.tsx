import { auth } from "@/auth";
import BrandLogo from "@/components/brand-logo";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "./user-button";

const routes = [
  { name: "Home", href: "/" },
  { name: "Library", href: "/library" },
  { name: "Dictionary", href: "/dictionary" },
  // { name: "Network", href: "/network" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "About Us", href: "/about-us" },
];

export default async function NavBar() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Logo Section */}
      <div className="w-1/2 sm:w-1/3 flex justify-start">
        <BrandLogo />
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-5 w-full sm:w-1/3 justify-center rounded-full bg-gray-900">
        {routes?.map((route) => (
          <Link
            key={route?.href}
            href={route?.href}
            className="ease-in-out duration-75 text-[#3B3C4A] dark:text-[#A1A1AA] hover:text-black dark:hover:text-white"
          >
            <span className="font-semibold text-sm leading-8">
              {route?.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Actions Section */}
      <div className="flex gap-2 items-center w-1/2 sm:w-1/3 justify-end">
        {user && (
          <Link href={`/create-post`}>
            <button className="font-semibold bg-gradient-to-tr from-blue-500 to-purple-900 rounded-full p-2 hover:from-blue-700 hover:to-purple-900 ease-in-out duration-200 group flex items-center justify-center gap-1 hover:rounded-md transition-all hover:w-full text-white">
              <Image
                src={"/pen.svg"}
                width={20}
                height={20}
                alt="Create Post"
                className="transition-transform group-hover:-rotate-45 duration-300"
              />
              <span className="hidden md:block md:opacity-100 transition-opacity duration-300">
                Create Post
              </span>
            </button>
          </Link>
        )}
        <UserButton />
      </div>

      {/* Mobile Navigation */}
      {/* <nav className="flex md:hidden w-full justify-center mt-4 gap-3">
        {routes?.map((route) => (
          <Link
            key={route?.href}
            href={route?.href}
            className="text-sm font-medium text-[#3B3C4A] dark:text-[#A1A1AA] hover:text-black dark:hover:text-white"
          >
            {route?.name}
          </Link>
        ))}
      </nav> */}
    </header>
  );
}
