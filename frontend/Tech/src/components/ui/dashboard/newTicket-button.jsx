import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";

const NewTicketButton = ({ className, icon, onClick }) => {
  return (
    <>
      <Button
        onClick={onClick}
        className={cn(
          "flex items-center space-x-2 mr-8 bg-[#7F56D8]  text-sm text-input p-6",
          className
        )}
      >
        <SquarePlus />
        <span>New tickets</span>
      </Button>
    </>
  );
};

export default NewTicketButton;
