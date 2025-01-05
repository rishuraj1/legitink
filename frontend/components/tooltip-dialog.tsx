"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface TooltipDialogProps {
  content: string;
}

const TooltipDialog: React.FC<TooltipDialogProps> = ({ content }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [tooltipText, setTooltipText] = useState<string>("");

  const handleWordClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const context = target.getAttribute("context");
    if (context) {
      setTooltipText(context);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTooltipText("");
  };

  return (
    <>
      <div
        className="text-lg text-zinc-800 dark:text-zinc-500"
        onClick={handleWordClick}
        dangerouslySetInnerHTML={{
          __html: content || "",
        }}
      />

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogTitle>Some Context</DialogTitle>
          <p>{tooltipText}</p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TooltipDialog;
