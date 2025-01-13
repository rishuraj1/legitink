"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Input } from "./ui/input";
import RichTextEditor from "./editor/rich-text-editor";
import { TermsDialog } from "./terms-dialog";
import { createNewArticle } from "@/actions/post";
import BibliographySection from "./editor/bibliography";
import { Bibliography } from "@/types";

export default function ArticleEditor({
  params,
}: {
  params: { id?: string; userId: string };
}) {
  const { userId } = params;

  // Use refs to track form fields
  const titleRef = useRef<HTMLInputElement>(null);
  const subtitleRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);

  const [bibliography, setBibliography] = useState<Bibliography>({
    books: [],
    urls: [],
  });
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle content change in the rich text editor
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    console.log("Updated content:", newContent);
  };

  useEffect(() => {
    if (mainImage) {
      const objectUrl = URL.createObjectURL(mainImage);
      setMainImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setMainImagePreview(null);
  }, [mainImage]);

  const handleBibliographyChange = (newBibliography: Bibliography) => {
    setBibliography(newBibliography);
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    const title = titleRef.current?.value || "";
    const subtitle = subtitleRef.current?.value || "";
    const mainImage = mainImageRef.current?.files?.[0];
    // const bibliography = bibliographyRef.current?.value || "";

    if (
      !title ||
      !subtitle ||
      !content ||
      content === "<p></p>" ||
      (!bibliography?.urls?.length && !bibliography?.books?.length)
    ) {
      toast.error("All fields are required");
      return;
    }

    const data = { title, subtitle, content, mainImage, bibliography };
    console.log("Data:", data);
    const toastId = toast.loading("Saving article...");
    const error = await createNewArticle(data);
    if (error) {
      toast.error(error, { id: toastId });
    } else {
      toast.success("Article saved successfully", { id: toastId });
      redirect(`/user/${userId}`);
    }
    setLoading(false);
  };

  const disabled =
    loading ||
    !content ||
    content === "<p></p>" ||
    !titleRef.current?.value?.trim() ||
    !subtitleRef.current?.value?.trim() ||
    (!bibliography?.urls?.length && !bibliography?.books?.length);

  return (
    <form
      id="article-editor-form"
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input ref={titleRef} placeholder="Title" className="mb-2" />

      {/* Subtitle Input */}
      <Input ref={subtitleRef} placeholder="Subtitle" className="mb-4" />
      <Input
        ref={mainImageRef}
        type="file"
        accept="image/*"
        className="mb-4"
        onChange={(e) => setMainImage(e.target.files?.[0] ?? null)}
      />

      <div>
        {mainImagePreview && (
          <Image
            src={mainImagePreview}
            alt="Main Image"
            className="h-56 w-72 object-cover dark:border-white border-zinc-500 border-2 rounded-md"
            width={192}
            height={100}
          />
        )}
      </div>

      <RichTextEditor value={content} onChange={handleContentChange} />

      <div className="flex flex-col gap-4 mt-4  border-dashed border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold">Bibliography</h2>
        <BibliographySection onBibliographyChange={handleBibliographyChange} />
      </div>

      <div className="flex justify-end">
        <TermsDialog
          title="Submit"
          disabled={disabled}
          type="submit"
          formId="article-editor-form"
        />
      </div>
    </form>
  );
}
