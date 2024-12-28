"use client";

import RichTextEditor from "@/components/editor/rich-text-editor";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { createNewArticle } from "@/actions/post";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import Image from "next/image";

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
  const [content, setContent] = useState("Initial content of the blog post");
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


  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const title = titleRef.current?.value || "";
    const subtitle = subtitleRef.current?.value || "";
    const mainImage = mainImageRef.current?.files?.[0];

    if (!title || !subtitle || !content || content === "<p></p>") {
      toast.error("All fields are required");
      return;
    }

    const data = { title, subtitle, content, mainImage };
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        ref={titleRef}
        placeholder="Title"
        className="mb-2"
      />

      {/* Subtitle Input */}
      <Input
        ref={subtitleRef}
        placeholder="Subtitle"
        className="mb-4"
      />

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

      {/* Rich Text Editor */}
      <RichTextEditor value={content} onChange={handleContentChange} />

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          disabled={!content || !titleRef.current?.value || !subtitleRef.current?.value || loading}
          type="submit"
          className="mt-4 bg-blue-700 hover:bg-blue-800 ease-in-out drop-shadow-md dark:text-white w-full min-[768px]:w-1/5"
        >
          Save
        </Button>
      </div>
    </form>
  );
}
