import React from "react";
import { cn } from "@/lib/utils";
import { Check, PenSquare } from "lucide-react";



const TicketCard = ({ className, ticketID, date, title, content, color }) => {
  return (
    <div className="">
      <div
        className={cn(
          "rounded-lg border border-[#E7E7E7] overflow-hidden shadow-lg",
          className
        )}
      >
        <div className="flex items-center p-4">
          <div className={`w-6 h-6 rounded-full ${color}`}></div>
          <div className="flex-grow">
            <h3 className="text-lg ml-6 font-bold text-[#2E2C34]">
              {ticketID}
            </h3>
          </div>
          <span className="text-xs text-[#84818A]">{date}</span>
        </div>
        <div className="px-4 pb-2">
          <h4 className="font-medium mb-2">{title}</h4>
          <p className="text-sm text-[#84818A]">{content}</p>
        </div>
        <div className="flex justify-end p-2 space-x-2">
          <button className="p-1 rounded border border-[#E7E7E7] justify-center items-center flex w-12">
            <Check className="text-green-500 w-4 h-4" />
          </button>
          <button className="p-1 rounded border border-[#E7E7E7] justify-center items-center flex  w-12">
            <PenSquare className="text-orange-500 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
