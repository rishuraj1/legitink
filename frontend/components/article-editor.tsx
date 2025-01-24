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
import { Bibliography, CurrProfile } from "@/types";
import AuthorProfile from "./author-profile";

export default function ArticleEditor({
  params,
}: {
  params: { id?: string; userId: string };
}) {
  const { userId } = params;

  const titleRef = useRef<HTMLInputElement>(null);
  const subtitleRef = useRef<HTMLInputElement>(null);
  const mainImageRef = useRef<HTMLInputElement>(null);

  const [bibliography, setBibliography] = useState<Bibliography>({
    books: [],
    urls: [],
    cases: [],
  });
  const [content, setContent] = useState("");
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [selectProfile, setSelectProfile] = useState<string | null>("default");
  const [loading, setLoading] = useState(false);
  const [authorProfile, setAuthorProfile] = useState<CurrProfile | null>(null);

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

  const handleSubmit = async () => {
    setLoading(true);

    const title = titleRef.current?.value || "";
    const subtitle = subtitleRef.current?.value || "";
    const mainImage = mainImageRef.current?.files?.[0];

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

    const data = {
      title,
      subtitle,
      content,
      mainImage,
      bibliography,
      authorProfile,
    };
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

  const handleChangeProfile = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectProfile(e.target.value);
    setAuthorProfile(null);
  };

  const disabled =
    loading ||
    !content ||
    content === "<p></p>" ||
    !titleRef.current?.value?.trim() ||
    !subtitleRef.current?.value?.trim() ||
    (!bibliography?.urls?.length && !bibliography?.books?.length) ||
    !authorProfile ||
    authorProfile?.type === "default";

  console.log("data => ", {
    bibliography,
    authorProfile,
  });

  return (
    <form
      id="article-editor-form"
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* Current designation/college/university/year */}
      <AuthorProfile
        authorProfile={authorProfile}
        selectProfile={selectProfile}
        handleChangeProfile={handleChangeProfile}
        setAuthorProfile={setAuthorProfile}
      />

      <div className="flex flex-col gap-4 border-dashed border border-gray-200 dark:border-gray-700 p-6">
        {/* Title Input */}
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
      </div>
      <div className="flex flex-col gap-4 mt-4  border-dashed border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg leading-3 font-normal">Bibliography</h2>
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
