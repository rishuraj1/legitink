import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const ContextTooltip: React.FC<{ text: string; context: string }> = ({
  text,
  context,
}: {
  text: string;
  context: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger className="context-text">{text}</TooltipTrigger>
      <TooltipContent className="max-w-sm p-4 rounded-md shadow-lg bg-white text-gray-700">
        {context}
      </TooltipContent>
    </Tooltip>
  );
};
