import { getDictionary } from "@/actions/dictionary";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import DictionaryTable from "./components/dictionary-table";
import LimitSelector from "./components/limit-selector";

export default async function DictionaryPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string; limit?: string }>;
}) {
  const searchparams = await searchParams;
  const query = searchparams?.query || "";
  const page = parseInt(searchparams?.page as string) || 1;
  const limit = parseInt(searchparams?.limit as string) || 10;

  const results = await getDictionary(query, limit, page);
  const { data: dictionary, totalItems: total, totalPages } = results;

  return (
    <div className="px-4 pb-4 pt-16 flex-col flex gap-6 items-center h-full w-full">
      <div className="flex flex-col md:flex-row justify-between w-full gap-4 mx-20 sm:gap-3">
        <h1 className="text-4xl font-semibold font-sans">Dictionary</h1>
        <Form
          action={`/dictionary`}
          className="flex justify-end items-center gap-4 w-full"
        >
          <input
            type="text"
            name="query"
            placeholder="Search for a word"
            defaultValue={query}
            className="border border-gray-300 rounded-md p-2 md:w-[400px] w-full"
          />
          <button
            type="submit"
            className="rounded-full p-2 bg-blue-500 text-white"
          >
            <Search className="w-6 h-6" />
          </button>
        </Form>
      </div>

      {dictionary && dictionary.length > 0 ? (
        <DictionaryTable
          data={dictionary}
          currPage={page}
          itemsPerPage={limit}
        />
      ) : (
        <h2 className="text-lg text-gray-500">No results found</h2>
      )}

      <div className="flex justify-center items-center w-full gap-10">
        {total > limit && (
          <div className="flex justify-center items-center gap-4">
            {page > 1 && (
              <Link
                href={`/dictionary?query=${query}&page=${page - 1}&limit=${limit}`}
                className="px-4 py-2 border rounded-md"
              >
                <ChevronLeft className="w-6 h-6 text-gray-200 group-hover:text-white" />
              </Link>
            )}
            <span className="text-gray-500">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/dictionary?query=${query}&page=${page + 1}&limit=${limit}`}
                className="px-4 py-2 border rounded-md duration-300 ease-in-out group"
              >
                <ChevronRight className="w-6 h-6 text-gray-200 group-hover:text-white" />
              </Link>
            )}
            <LimitSelector query={query} currentLimit={limit} />
          </div>
        )}
      </div>
    </div>
  );
}
