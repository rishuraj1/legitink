import { cn } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

const AdminBadge = ({ size = "sm" }: { size?: "sm" | "md" | "lg" | "xl" }) => {
  const sm = "w-4 h-4";
  const md = "w-6 h-6";
  const lg = "w-8 h-8";
  const xl = "w-12 h-12";

  const getClasses = (size: string) => {
    switch (size) {
      case "sm":
        return sm;
      case "md":
        return md;
      case "lg":
        return lg;
      case "xl":
        return xl;
      default:
        return sm;
    }
  };

  return (
    <div className="rounded-full p-1">
      <ShieldCheck
        className={cn(
          getClasses(size),
          "text-blue-500 dark:bg-zinc-700 bg-gray-300 rounded-full p-[1px]",
        )}
      />
    </div>
  );
};

export { AdminBadge };
