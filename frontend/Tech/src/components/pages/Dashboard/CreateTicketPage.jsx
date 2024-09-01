import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "../../layout/Dashboard/Sidebar";
import NotificationButton from "../../ui/dashboard/notification-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CreateTicketButton } from "@/components/ui/dashboard/newTicket-button";
import { useToast } from "@/components/ui/use-toast";

const CreateTicketPage = () => {
  const { toast } = useToast();

  const createTicketToDB = () => {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    const ticketData = { title, content };

    fetch("http://127.0.0.1:8000/ticket/new-ticket", {
      method: "POST", // Pour envoyer
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
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
          description: "Ticket crée !",
          variant: "primary",
        });
      })
      .catch((error) => {
        console.error("Erreur:", error);
        // messages
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les données de l'utilisateur",
          variant: "destructive",
        });
      });

    console.log("Données envoyées:", ticketData);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-merriweather">
      {/* Top page */}
      <Sidebar className="w-full md:w-64 flex-shrink-0" />
      <div className="flex-grow flex flex-col">
        <div className="h-28 w-full merriweather flex items-center justify-between px-8">
          <div className="w-1/3"></div>
          <h1 className="text-primary text-3xl  font-bold w-1/3 text-center">
            Welcome!
          </h1>
          <div className="w-1/3 flex justify-end">
            <NotificationButton />
          </div>
        </div>
        {/* Top Page */}

        {/* Main Content */}
        <div className="flex-grow bg-white w-[95%] sm:w-[90%] md:w-[85%] max-w-4xl mx-auto p-4 sm:p-6 md:p-8 rounded-lg shadow-md space-y-12">
          <h1 className="font-bold text-2xl md:text-3xl mb-6 md:mb-8 text-gray-800">
            New Ticket
          </h1>

          <div className="mb-8">
            <h2 className="font-bold text-xl md:text-2xl mb-2 text-gray-700">
              Create Quick Ticket
            </h2>
            <h3 className="font-light text-sm md:text-base text-gray-600">
              Write and address new queries and issues
            </h3>
          </div>

          {/* Formulaire */}
          <div className="space-y-12 md:space-y-12">
            {/* Titre */}
            <div className="space-y-2 md:space-y-3">
              <label
                className="font-medium text-lg md:text-xl block text-gray-700"
                htmlFor="titre"
              >
                Titre :
              </label>
              <Input
                id="title"
                placeholder="Jaws Mise a jour ..."
                className="w-full"
              />
            </div>

            {/* Content */}
            <div className="space-y-2 md:space-y-3">
              <label
                className="font-medium text-lg md:text-xl block text-gray-700"
                htmlFor="content"
              >
                Corps du ticket :
              </label>
              <Textarea
                id="content"
                rows={10}
                placeholder="Probleme Jaws sur ..."
                className="w-full resize-y min-h-[150px]"
              />
            </div>

            <div className="flex justify-end">
              <CreateTicketButton
                onClick={createTicketToDB}
                className="px-3 py-2 text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
      </div>
    </div>
  );
};

export default CreateTicketPage;
