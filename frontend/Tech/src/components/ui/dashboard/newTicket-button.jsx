/**
 * v0 by Vercel.
 * @see https://v0.dev/t/A5ZIgV3lLMD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NewTicketButton = ({ className }) => {
  return (
    <Button className={(cn, className)}>
      <PencilIcon className="w-4 h-4" />
      <a href="/create-ticket">Nouveau</a>
    </Button>
  );
};

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

const CreateTicketButton = ({ className, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-colors",
        className
      )}
    >
      <PlusIcon className="h-5 w-5" />
      Nouveau ticket
    </Button>
  );
};

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export { NewTicketButton, CreateTicketButton };
