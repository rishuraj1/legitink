"use client";

import React, { useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { fontFamilies } from "@/lib/utils";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Underline,
  Quote,
  Heading1,
  Heading2,
} from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import UnderlineExtension from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Text from "@tiptap/extension-text";
import Heading from "@tiptap/extension-heading";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import CharacterCount from "@tiptap/extension-character-count";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { uploadArticleImageToS3 } from "@/actions/post";
import ContextDialog from "./context-dialog";
import { ContextText } from "./extensions";

const RichTextEditor = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] max-h-[150px] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      ContextText,
      StarterKit.configure({
        orderedList: { HTMLAttributes: { class: "list-decimal pl-4" } },
        bulletList: { HTMLAttributes: { class: "list-disc pl-4" } },
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      ImageResize,
      UnderlineExtension,
      Document,
      Paragraph,
      Text,
      Blockquote,
      TextStyle,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      CharacterCount,
      Placeholder.configure({
        placeholder: "Start typing here...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      console.log("Updated content:", editor.getHTML());
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;
    const items = clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.startsWith("image")) {
        console.log("Image found in clipboard");
        const file = item.getAsFile();
        if (file) {
          const fileName = `${Date.now()}-${file.name}`;
          try {
            const s3Url = await uploadArticleImageToS3(file, fileName);
            editor?.chain().focus().setImage({ src: s3Url }).run();
          } catch (err) {
            console.error("Failed to upload image:", err);
          }
          event.preventDefault();
          return;
        }
      }
    }
  };

  return (
    <div onPaste={handlePaste}>
      {editor ? <RichTextEditorToolbar editor={editor} /> : null}
      <EditorContent editor={editor} className="editor" />
    </div>
  );
};

const RichTextEditorToolbar = ({ editor }: { editor: Editor }) => {
  const [font, setFont] = React.useState<string | undefined>("Aa");
  const [isContextDialogOpen, setContextDialogOpen] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [context, setContext] = useState<string | null>(null);

  const handleFontFamilyChange = (value: string) => {
    editor.chain().focus().setFontFamily(value).run();
  };

  return (
    <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center justify-between gap-1">
      <div className="flex gap-1">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 1 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading", { level: 2 })}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("blockquote")}
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
        >
          <Quote className="h-4 w-4" />
        </Toggle>
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="text-sm">{font}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {fontFamilies?.map((fontFamily) => (
              <DropdownMenuItem
                key={fontFamily?.value}
                onClick={() => {
                  setFont(fontFamily?.label);
                  handleFontFamilyChange(fontFamily?.value);
                }}
              >
                {fontFamily?.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <button
          type="button"
          onClick={() => {
            const selection = editor.state.doc.textBetween(
              editor.state.selection.from,
              editor.state.selection.to,
            );
            if (selection) {
              setSelectedText(selection);
              setContextDialogOpen(true);
            } else {
              alert("No text selected!");
            }
          }}
        >
          Add Context
        </button>
      </div>
      <ContextDialog
        isOpen={isContextDialogOpen}
        onClose={() => setContextDialogOpen(false)}
        onSave={(contextValue) => {
          if (selectedText) {
            // Apply the contextText mark only to the selected range
            editor
              .chain()
              .focus()
              .extendMarkRange("contextText") // Extend the mark to the selected text range
              .setContextText(contextValue) // Set the context on the selected text
              .run() as void;

            // Move the cursor to the end of the context-text marked area
            const endPosition = editor.state.selection.to;
            editor.chain().focus().setTextSelection(endPosition).run();

            // Close the dialog and reset states
            setContextDialogOpen(false);
            setContext("");
            setSelectedText("");
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
