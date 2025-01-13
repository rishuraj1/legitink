import React from "react";
import { BookOpen, Link as LinkIcon } from "lucide-react";
import { Bibliography, Book } from "@/types";

interface BibliographyProps {
  bibliography: Bibliography;
}

const ShowBibliography = ({ bibliography }: BibliographyProps) => {
  if (
    !bibliography ||
    (!bibliography.books?.length && !bibliography.urls?.length)
  ) {
    return null;
  }

  return (
    <div className="mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-8">
      <h2 className="text-2xl font-semibold mb-6">Bibliography</h2>

      {/* Books Section */}
      {bibliography?.books?.length !== undefined &&
        bibliography?.books?.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Books
            </h3>
            <ul className="space-y-4">
              {bibliography?.books?.map((book: Book, index: number) => (
                <li
                  key={book.isbn || index}
                  className="text-zinc-700 dark:text-zinc-300"
                >
                  {book.title} ({book.year}) by{" "}
                  <span className="italic">{book.author}</span>.
                  {book.isbn && (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-2">
                      ISBN: {book.isbn}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

      {/* URLs Section */}
      {bibliography?.urls?.length !== undefined &&
        bibliography?.urls?.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <LinkIcon className="w-5 h-5" />
              Online References
            </h3>
            <ul className="space-y-3">
              {bibliography?.urls?.map((url, index) => (
                <li key={index} className="text-zinc-700 dark:text-zinc-300">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                  >
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default ShowBibliography;
