import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Dashboard/Sidebar";
import NotificationButt from "@/components/ui/dashboard/notification-button";
import { NewTicketButton } from "/src/components/ui/dashboard/newTicket-button.jsx";
import SearchButton from "@/components/ui/dashboard/searchButton";
import TicketCard from "@/components/ui/dashboard/ticket-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



const TicketPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTicketFromApi = () => {
      fetch("http://127.0.0.1:8000/ticket/all")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // Transformer les données reçues
          const formattedTickets = data.map((ticket) => ({
            ticketID: ticket.ticket_id || "",
            date: ticket.creation_date || "",
            title: ticket.title || "",
            content: ticket.content || "",
            status: ticket.status,
          }));
          setTickets(formattedTickets);
          console.log("Tickets formatés :", formattedTickets);
        });
    };
    fetchTicketFromApi();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [filterStatus, setFilterStatus] = useState("all");

  // Fonction pour filtrer les tickets par statut et terme de recherche
  const filterTickets = () => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "open" && ticket.status === "open") ||
        (filterStatus === "closed" && ticket.status != "open");

      return matchesSearch && matchesStatus;
    });
  };

  // Effet pour mettre à jour les tickets filtrés
  useEffect(() => {
    setFilteredTickets(filterTickets());
  }, [searchTerm, filterStatus, tickets]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Gestionnaire pour le changement de statut
  const handleStatusChange = (value) => {
    setFilterStatus(value);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-merriweather">
      <Sidebar className="w-full md:w-64 flex-shrink-0" />
      <div className="flex-grow">
        <div className="h-28 w-full merriweather flex items-center justify-between px-8">
          <div className="w-1/3"></div>
          <h1 className="text-primary text-3xl  font-bold w-1/3 text-center">
            Welcome!
          </h1>
          <div className="w-1/3 flex justify-end">
            <NotificationButt />
          </div>
        </div>
        <div className="h-20 w-full  flex justify-between items-center">
          <h1 className="text-3xl ml-8 font-bold">Tickets</h1>
          <NewTicketButton
            className={
              "bg-[#7b4bff] text-white mr-8 flex items-center space-x-2 rounded-md px-4 py-2 transition-colors duration-300 hover:bg-[#6b3bff]"
            }
          />
        </div>
        <div className="h-[6rem] w-full flex items-center justify-between">
          <SearchButton
            className="w-[40%] ml-8"
            placeholder="Search for Ticket"
            onSearch={handleSearch}
          />
          <Select onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[40%] mr-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              <SelectItem value="open">Ouvert</SelectItem>
              <SelectItem value="closed">Fermé</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 p-8">
          {filteredTickets.length > 0 ? ( // Just check if mini 1 ticket exist
            filteredTickets.map((ticket, index) => (
              <TicketCard
                ticketID={`#${ticket.ticketID} | ${ticket.title}`}
                key={index}
                date={ticket.date}
                content={ticket.content}
                color={ticket.status === "open" ? "bg-green-400" : "bg-red-400"} // This mfucking color is bugging tf
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucun ticket ne correspond à votre recherche.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
