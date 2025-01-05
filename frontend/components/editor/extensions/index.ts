import { Mark } from "@tiptap/core";

// Extend the ChainedCommands interface to include setContextText
declare module "@tiptap/core" {
  interface Commands {
    setContextText: {
      setContextText: (context: string) => void;
    };
  }
}

export const ContextText = Mark.create({
  name: "contextText",

  addAttributes() {
    return {
      context: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span.context-text",
        getAttrs: (dom: HTMLElement) => ({
          context: dom.getAttribute("context"),
        }),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", { ...HTMLAttributes, class: "context-text" }, 0];
  },

  addCommands() {
    return {
      setContextText:
        (context: string) =>
        ({ chain }: { chain: any }) => {
          return chain().setMark("contextText", { context }).run();
        },
    };
  },
});
