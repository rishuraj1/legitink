import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus, Check } from "lucide-react";
import { Bibliography, Book } from "@/types";

interface BibliographySectionProps {
  onBibliographyChange: (bibliography: Bibliography) => void;
}

const BibliographySection: React.FC<BibliographySectionProps> = ({
  onBibliographyChange,
}) => {
  const [showBookInput, setShowBookInput] = useState<boolean>(false);
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookAuthor, setBookAuthor] = useState<string>("");
  const [bookYear, setBookYear] = useState<string>("");
  const [isbn, setIsbn] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");

  const handleAddBook = (): void => {
    if (bookTitle.trim() && bookAuthor.trim() && bookYear.trim()) {
      const newBook: Book = {
        title: bookTitle.trim(),
        author: bookAuthor.trim(),
        year: bookYear.trim(),
        isbn: isbn.trim(),
      };
      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);
      setBookTitle("");
      setBookAuthor("");
      setBookYear("");
      setIsbn("");
      setShowBookInput(false);
      onBibliographyChange({ books: updatedBooks, urls });
    }
  };

  // Rest of the handlers remain the same...
  const handleUrlInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.endsWith(" ")) {
      const url = value.trim();
      if (url && isValidUrl(url) && !urls.includes(url)) {
        const updatedUrls = [...urls, url];
        setUrls(updatedUrls);
        setUrlInput("");
        onBibliographyChange({ books, urls: updatedUrls });
      } else {
        setUrlInput("");
      }
    } else {
      setUrlInput(value);
    }
  };

  const isValidUrl = (urlString: string): boolean => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const removeUrl = (urlToRemove: string): void => {
    const updatedUrls = urls.filter((url) => url !== urlToRemove);
    setUrls(updatedUrls);
    onBibliographyChange({ books, urls: updatedUrls });
  };

  const removeBook = (bookIsbn: string): void => {
    const updatedBooks = books.filter((book) => book?.isbn !== bookIsbn);
    setBooks(updatedBooks);
    onBibliographyChange({ books: updatedBooks, urls });
  };

  const handleBookTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBookTitle(e.target.value);
  };

  const handleBookAuthorChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setBookAuthor(e.target.value);
  };

  const handleBookYearChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^\d]/g, "").slice(0, 4);
    setBookYear(value);
  };

  const handleBookIsbnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value.replace(/[^\d]/g, "").slice(0, 13);
    setIsbn(value);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          {!showBookInput && (
            <Button
              onClick={() => setShowBookInput(true)}
              type="button"
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Book
            </Button>
          )}
        </div>

        {showBookInput && (
          <div className="space-y-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <div className="flex gap-2 flex-wrap">
              <Input
                placeholder="Book Title"
                value={bookTitle}
                onChange={handleBookTitleChange}
                className="flex-1 min-w-[200px]"
              />
              <Input
                placeholder="Author Name"
                value={bookAuthor}
                onChange={handleBookAuthorChange}
                className="flex-1 min-w-[200px]"
              />
              <Input
                placeholder="Published Year"
                value={bookYear}
                onChange={handleBookYearChange}
                className="w-24"
                maxLength={4}
              />
              <Input
                placeholder="ISBN"
                value={isbn}
                onChange={handleBookIsbnChange}
                className="w-32 sm:max-w-max"
                maxLength={100}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowBookInput(false)}
                type="button"
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddBook}
                disabled={
                  !bookTitle.trim() || !bookAuthor.trim() || !bookYear.trim()
                }
                type="button"
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" /> Save Book
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {books.map((book) => (
            <div
              key={book.isbn}
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
            >
              <span className="text-sm">
                {book.title} by {book.author} ({book.year})
              </span>
              <button
                onClick={() => removeBook(book.isbn as string)}
                className="hover:text-red-500"
                type="button"
                aria-label={`Remove ${book.title}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* URLs section remains the same */}
      <div className="space-y-2">
        <div className="relative">
          <div className="min-h-10 flex flex-wrap items-center gap-2 p-2 border rounded-md bg-background">
            {urls.map((url) => (
              <span
                key={url}
                className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm"
              >
                {url}
                <button
                  onClick={() => removeUrl(url)}
                  className="hover:text-red-500"
                  type="button"
                  aria-label={`Remove ${url}`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <input
              value={urlInput}
              onChange={handleUrlInput}
              type="text"
              placeholder={
                urls.length === 0 ? "Enter URLs (press space to add)" : ""
              }
              className="flex-1 min-w-20 outline-none bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibliographySection;
