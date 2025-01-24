"use client";

import { Copy, LucideCopyCheck, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Article } from "@/types";

const ShareArticle = ({ article }: { article: Article }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${article._id}`;
  console.log("Share URL:", shareUrl);
  const [linkCopied, setLinkCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setLinkCopied(true);

    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  const handleShare = (
    platform: "twitter" | "facebook" | "linkedin" | "email" | "whatsapp",
  ) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(article?.title || "Untitled");
    const encodedImage = encodeURIComponent(article?.mainImage || "");

    let Url = "";
    switch (platform) {
      case "twitter":
        Url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "facebook":
        Url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "linkedin":
        Url = `https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedTitle}&source=${encodedUrl}`;
        break;
      case "email":
        Url = `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}%0A%0A${encodedImage}`;
        break;
      case "whatsapp":
        Url = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`;
        break;
      default:
        break;
    }
    if (Url) window.open(Url, "_blank");
  };

  return (
    <div className="flex items-start flex-col gap-2">
      <div className="w-full min-w-full">
        <Button
          variant="outline"
          size="sm"
          className="dark:text-zinc-300 w-full"
          onClick={handleCopyLink}
          disabled={linkCopied}
        >
          {linkCopied ? (
            <span className="flex items-center gap-2">
              <LucideCopyCheck size={16} className="dark:text-zinc-300" />
              Link Copied!
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Copy size={16} className="dark:text-zinc-300" />
              Copy Link
            </span>
          )}
        </Button>
      </div>
      <div className="flex gap-1 items-start">
        <Button
          variant="outline"
          size="sm"
          className="dark:text-zinc-300 w-full"
          onClick={() => handleShare("linkedin")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="72"
            height="72"
            viewBox="0 0 72 72"
            id="linkedin"
          >
            <g
              id="providers-list"
              fill="none"
              fillRule="evenodd"
              stroke="none"
              strokeWidth="1"
            >
              <g id="linkedin">
                <rect
                  id="Rectangle-2"
                  width="72"
                  height="72"
                  x="0"
                  y="0"
                  fill="#117EB8"
                  rx="4"
                ></rect>
                <path
                  id="Shape"
                  fill="#FFF"
                  d="M13.139 27.848h9.623V58.81h-9.623V27.848zm4.813-15.391c3.077 0 5.577 2.5 5.577 5.577 0 3.08-2.5 5.581-5.577 5.581a5.58 5.58 0 1 1 0-11.158zm10.846 15.39h9.23v4.231h.128c1.285-2.434 4.424-5 9.105-5 9.744 0 11.544 6.413 11.544 14.75V58.81h-9.617V43.753c0-3.59-.066-8.209-5-8.209-5.007 0-5.776 3.911-5.776 7.95V58.81h-9.615V27.848z"
                ></path>
              </g>
            </g>
          </svg>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="dark:text-zinc-300 w-full"
          onClick={() => handleShare("facebook")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Facebook"
            viewBox="0 0 512 512"
            id="facebook"
          >
            <rect width="512" height="512" fill="#1877f2" rx="15%"></rect>
            <path
              fill="#fff"
              d="M355.6 330l11.4-74h-71v-48c0-20.2 9.9-40 41.7-40H370v-63s-29.3-5-57.3-5c-58.5 0-96.7 35.4-96.7 99.6V256h-65v74h65v182h80V330h59.6z"
            ></path>
          </svg>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="dark:text-zinc-300 w-full"
          onClick={() => handleShare("twitter")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            id="twitter"
          >
            <path
              fill="#050505"
              fillRule="evenodd"
              d="m60,12c0-4.42-3.58-8-8-8H12C7.58,4,4,7.58,4,12v40c0,4.42,3.58,8,8,8h40c4.42,0,8-3.58,8-8V12h0Z"
            ></path>
            <path
              fill="#fff"
              d="m15.07,48.28h4l10.68-12.14,9.29,12.12h10.86l-14.25-18.84,12.06-13.7h-4l-9.91,11.26-8.5-11.25h-11.21l13.79,17.99-12.82,14.57Zm5.11-29.56h3.64l20.06,26.54h-3.35l-20.34-26.54Z"
            ></path>
          </svg>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="dark:text-zinc-300 w-full"
          onClick={() => handleShare("whatsapp")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2489"
            height="2500"
            viewBox="0 0 1219.547 1225.016"
            id="whatsapp"
          >
            <path
              fill="#E0E0E0"
              d="M1041.858 178.02C927.206 63.289 774.753.07 612.325 0 277.617 0 5.232 272.298 5.098 606.991c-.039 106.986 27.915 211.42 81.048 303.476L0 1225.016l321.898-84.406c88.689 48.368 188.547 73.855 290.166 73.896h.258.003c334.654 0 607.08-272.346 607.222-607.023.056-162.208-63.052-314.724-177.689-429.463zm-429.533 933.963h-.197c-90.578-.048-179.402-24.366-256.878-70.339l-18.438-10.93-191.021 50.083 51-186.176-12.013-19.087c-50.525-80.336-77.198-173.175-77.16-268.504.111-278.186 226.507-504.503 504.898-504.503 134.812.056 261.519 52.604 356.814 147.965 95.289 95.36 147.728 222.128 147.688 356.948-.118 278.195-226.522 504.543-504.693 504.543z"
            ></path>
            <linearGradient
              id="a"
              x1="609.77"
              x2="609.77"
              y1="1190.114"
              y2="21.084"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#20b038"></stop>
              <stop offset="1" stopColor="#60d66a"></stop>
            </linearGradient>
            <path
              fill="url(#a)"
              d="M27.875 1190.114l82.211-300.18c-50.719-87.852-77.391-187.523-77.359-289.602.133-319.398 260.078-579.25 579.469-579.25 155.016.07 300.508 60.398 409.898 169.891 109.414 109.492 169.633 255.031 169.57 409.812-.133 319.406-260.094 579.281-579.445 579.281-.023 0 .016 0 0 0h-.258c-96.977-.031-192.266-24.375-276.898-70.5l-307.188 80.548z"
            ></path>
            <path
              fill="#FFF"
              fillRule="evenodd"
              d="M462.273 349.294c-11.234-24.977-23.062-25.477-33.75-25.914-8.742-.375-18.75-.352-28.742-.352-10 0-26.25 3.758-39.992 18.766-13.75 15.008-52.5 51.289-52.5 125.078 0 73.797 53.75 145.102 61.242 155.117 7.5 10 103.758 166.266 256.203 226.383 126.695 49.961 152.477 40.023 179.977 37.523s88.734-36.273 101.234-71.297c12.5-35.016 12.5-65.031 8.75-71.305-3.75-6.25-13.75-10-28.75-17.5s-88.734-43.789-102.484-48.789-23.75-7.5-33.75 7.516c-10 15-38.727 48.773-47.477 58.773-8.75 10.023-17.5 11.273-32.5 3.773-15-7.523-63.305-23.344-120.609-74.438-44.586-39.75-74.688-88.844-83.438-103.859-8.75-15-.938-23.125 6.586-30.602 6.734-6.719 15-17.508 22.5-26.266 7.484-8.758 9.984-15.008 14.984-25.008 5-10.016 2.5-18.773-1.25-26.273s-32.898-81.67-46.234-111.326z"
              clipRule="evenodd"
            ></path>
            <path
              fill="#FFF"
              d="M1036.898 176.091C923.562 62.677 772.859.185 612.297.114 281.43.114 12.172 269.286 12.039 600.137 12 705.896 39.633 809.13 92.156 900.13L7 1211.067l318.203-83.438c87.672 47.812 186.383 73.008 286.836 73.047h.255.003c330.812 0 600.109-269.219 600.25-600.055.055-160.343-62.328-311.108-175.649-424.53zm-424.601 923.242h-.195c-89.539-.047-177.344-24.086-253.93-69.531l-18.227-10.805-188.828 49.508 50.414-184.039-11.875-18.867c-49.945-79.414-76.312-171.188-76.273-265.422.109-274.992 223.906-498.711 499.102-498.711 133.266.055 258.516 52 352.719 146.266 94.195 94.266 146.031 219.578 145.992 352.852-.118 274.999-223.923 498.749-498.899 498.749z"
            ></path>
          </svg>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="dark:text-zinc-300 w-full"
          onClick={() => handleShare("email")}
        >
          <Mail size={16} className="dark:text-zinc-300" />
        </Button>
      </div>
    </div>
  );
};

export default ShareArticle;
