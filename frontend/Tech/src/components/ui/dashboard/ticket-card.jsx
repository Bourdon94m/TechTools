import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { PenSquare, Check, X } from "lucide-react";
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
import { useToast } from "../use-toast";

const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

const TicketStatusDialog = ({ ticketID, status, onConfirm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isTicketOpen = status === "open";
  const action = isTicketOpen ? "fermer" : "rouvrir";

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="p-1 rounded border border-[#E7E7E7] justify-center items-center flex w-12">
          {isTicketOpen ? (
            <X className="text-red-500 w-4 h-4" />
          ) : (
            <Check className="text-green-500 w-4 h-4" />
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmation de {action}</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir {action} le ticket numéro {ticketID} ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Annuler
          </Button>
          <Button type="button" onClick={handleConfirm}>
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
  initialStatus,
}) => {
  const [status, setStatus] = useState(initialStatus);
  const { toast } = useToast();

  const getStatusColor = (status) => {
    return status === "open" ? "bg-green-500" : "bg-red-500";
  };

  const toggleTicketStatus = async () => {
    const newStatus = status === "open" ? "closed" : "open";
    const updateData = {
      ticket_id: ticketID,
      title,
      content,
      status: newStatus,
      creation_date: getCurrentDate(),
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/ticket/update/${ticketID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Statut : ${response.status}, Message : ${errorText}`);
      }

      const data = await response.json();
      console.log("Réponse du serveur:", data);

      setStatus(newStatus);

      toast({
        title: "Succès",
        description: `Ticket ${newStatus === "closed" ? "fermé" : "rouvert"} !`,
        variant: "primary",
      });
    } catch (error) {
      console.error("Erreur détaillée:", error);
      toast({
        title: "Erreur",
        description: `Impossible de ${
          status === "open" ? "fermer" : "rouvrir"
        } le ticket. Erreur: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={cn(
        "rounded-lg border border-[#E7E7E7] overflow-hidden shadow-lg",
        className
      )}
    >
      <div className="flex items-center p-4">
        <div className={`w-6 h-6 rounded-full ${getStatusColor(status)}`}></div>
        <h3 className="text-lg ml-6 font-bold text-[#2E2C34]">
          #{ticketID} | {title}
        </h3>
        <span className="text-xs text-[#84818A] ml-auto">{date}</span>
      </div>
      <p className="px-4 pb-2 text-sm text-[#84818A]">{content}</p>
      <div className="flex justify-end p-2 space-x-2">
        <TicketStatusDialog
          status={status}
          ticketID={ticketID}
          onConfirm={toggleTicketStatus}
        />
        <button className="p-1 rounded border border-[#E7E7E7] justify-center items-center flex w-12">
          <PenSquare className="text-orange-500 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
