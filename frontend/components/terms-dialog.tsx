import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function TermsDialog({
  title,
  disabled,
  onAgree,
}: {
  title: string;
  disabled: boolean;
  onAgree: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          {title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            By submitting content to LegalInk, you agree that all submitted work
            is original, does not infringe on any copyright, and complies with
            fair use guidelines. If your content includes material from other
            sources, you must provide proper attribution by referencing the
            original source or including a link to it. You grant us a
            non-exclusive license to publish and promote your work, while
            retaining ownership of the content. You are solely responsible for
            the accuracy, legality, and integrity of your submission, including
            ensuring proper credit is given for any referenced material. Any
            claims arising from plagiarism, copyright violations, or improper
            attribution will be your responsibility. We reserve the right to
            edit, reject, or remove any content at our discretion. By submitting
            content, you acknowledge and accept these terms.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" onClick={onAgree}>
            Agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
