"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Input } from "./ui/input";
import RichTextEditor from "./editor/rich-text-editor";
import { TermsDialog } from "./terms-dialog";
import { createNewArticle } from "@/actions/post";

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
  const bibliographyRef = useRef<HTMLInputElement>(null);
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

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);

    const title = titleRef.current?.value || "";
    const subtitle = subtitleRef.current?.value || "";
    const mainImage = mainImageRef.current?.files?.[0];
    // const bibliography = bibliographyRef.current?.value || "";

    if (!title || !subtitle || !content || content === "<p></p>") {
      toast.error("All fields are required");
      return;
    }

    const data = { title, subtitle, content, mainImage };
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
    !content ||
    !titleRef.current?.value ||
    !subtitleRef.current?.value ||
    loading;

  return (
    <form className="flex flex-col gap-4">
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

      {/* Rich Text Editor */}
      <RichTextEditor value={content} onChange={handleContentChange} />
      <Input
        ref={bibliographyRef}
        placeholder="Bibliography"
        className="mb-4"
        title="bibliography"
      />

      <div className="flex justify-end">
        <TermsDialog
          title="Submit"
          disabled={disabled}
          onAgree={handleSubmit}
        />
      </div>
    </form>
  );
}
