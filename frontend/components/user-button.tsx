import { getUserDetails } from "@/actions/user";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types";
import Link from "next/link";
import { AdminBadge } from "./custom-badges";

export function UserAvatar({
  src = "https://github.com/shadcn.png",
  initials,
  size = "icon",
  className,
}: {
  src?: string;
  initials?: string;
  size?: "icon" | "medium" | "large";
  className?: string;
}) {
  const name = initials
    ? initials
        .split(" ")
        .map((name: string) => name[0])
        .join("")
    : "UG";

  return (
    <Avatar
      className={`relative flex items-center justify-center rounded-full overflow-hidden 
        ${size === "icon" ? "w-10 h-10" : ""} 
        ${size === "medium" ? "w-16 h-16" : ""} 
        ${size === "large" ? "w-20 h-20" : ""} 
        ${className}`}
    >
      <AvatarImage
        src={src}
        alt="User"
        className="w-full h-full object-cover rounded-full"
      />

      {/* Fallback */}
      <AvatarFallback
        className={`flex items-center justify-center text-white bg-gray-500 uppercase font-bold 
          ${size === "icon" ? "text-sm" : ""} 
          ${size === "medium" ? "text-lg" : ""} 
          ${size === "large" ? "text-xl" : ""}`}
      >
        {name}
      </AvatarFallback>
    </Avatar>
  );
}

export async function UserButton() {
  const session = await auth();
  const user = session?.user;
  const checkIsAdmin: User = await getUserDetails(user?.id as string);
  const isAdmin = checkIsAdmin?.isAdmin;
  console.log(isAdmin, "isAdmin");
  const initials = user?.name
    ? user?.name
        .split(" ")
        .map((name: string) => name[0])
        .join("")
    : ("G" as string);
  console.log(user, "user");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isAdmin && (
          <div className="absolute top-[26px] right-[6px] z-10 rounded-full p-1 shadow-md">
            <AdminBadge />
          </div>
        )}
        <div
          className={`rounded-full ring-2 
            ${isAdmin ? "ring-blue-500" : "dark:ring-gray-300 ring-gray-500"}`}
        >
          <UserAvatar src={user?.image as string} initials={initials} />
        </div>
      </DropdownMenuTrigger>
      {!user ? (
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Link href="/auth">Log In/Sign Up</Link>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Link href="/profile">{user?.name}</Link>
          </DropdownMenuLabel>
          {isAdmin && (
            <DropdownMenuLabel>
              <Link href={`/admin/${user?.id}`}>Admin Page</Link>
            </DropdownMenuLabel>
          )}
          <DropdownMenuLabel>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">
                <span>Sign Out</span>
              </button>
            </form>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
