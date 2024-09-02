import React from "react";
import { cn } from "@/lib/utils";
import { PenSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useToast } from "../use-toast";

const TicketCloseDialog = ({ ticketID, onClose, onConfirm }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1 rounded border border-[#E7E7E7] justify-center items-center flex w-12">
          <Check className="text-green-500 w-4 h-4" />{" "}
          {/* Need to show cancel closed ticket for a features  */}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Confirmation de {status === "open" ? "fermeture" : "réouverture"}
          </DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir {status === "open" ? "fermer" : "rouvrir"}{" "}
            le ticket numéro {ticketID} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={onClose}>
            Annuler
          </Button>
          <Button type="button" onClick={onConfirm}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TicketCard = ({
  className,
  ticketID,
  date,
  title,
  content,
  status,
  color,
  onClose,
}) => {
  const { toast } = useToast();

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
              #{ticketID} | {title}
            </h3>
          </div>
          <span className="text-xs text-[#84818A]">{date}</span>
        </div>
        <div className="px-4 pb-2">
          <p className="text-sm text-[#84818A]">{content}</p>
        </div>
        <div className="flex justify-end p-2 space-x-2">
          <TicketCloseDialog
            ticketID={ticketID}
            onClose={() => console.log("Fermeture annulée")}
            onConfirm={() => {
              console.log(ticketID);
              // Fetch for put status to "close"
              fetch(`http://127.0.0.1:8000/ticket/update/${ticketID}`, {
                method: "PUT", // Pour modifier
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ticket_id: ticketID,
                  title: title,
                  content: content,
                  status: "closed",
                  creation_date: date,
                }),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(
                      `La requête a échoué avec le statut : ${response.status}`
                    );
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log("Succès:", data);
                  // Message de succées
                  toast({
                    title: "Succées",
                    description: "Ticket fermée !",
                    variant: "primary",
                  });
                })
                .catch((error) => {
                  console.error("Erreur:", error);
                  // messages
                  toast({
                    title: "Erreur",
                    description: "Impossible de fermer le ticket",
                    variant: "destructive",
                  });
                });
            }}
          />
          <button className="p-1 rounded border border-[#E7E7E7] justify-center items-center flex w-12">
            <PenSquare className="text-orange-500 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
