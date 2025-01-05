"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";

const LimitSelector = ({
  query,
  currentLimit,
}: {
  query: string;
  currentLimit: number;
}) => {
  const handleLimitChange = (value: string) => {
    const selectedLimit = parseInt(value, 10);
    redirect(`/dictionary?query=${query}&page=1&limit=${selectedLimit}`);
  };
  return (
    <Select
      onValueChange={handleLimitChange}
      defaultValue={String(currentLimit)}
    >
      <SelectTrigger className="border rounded-md p-2 w-32">
        <SelectValue placeholder="Limit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="20">20</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LimitSelector;
