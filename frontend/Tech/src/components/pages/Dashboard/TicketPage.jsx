import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Dashboard/Sidebar";
import NotificationButt from "@/components/ui/dashboard/notification-button";
import NewTicketButton from "@/components/ui/dashboard/newTicket-button";
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
  const [tickets, setTickets] = useState([
    {
      ticketID: "Ticket# 2023-CS123",
      date: "Posted at 12:45 AM",
      title: "How to deposit money to my portal?",
      content:
        "Je n'arrive pas a faire des beaux design au secours help me je sais pas ce qui m'arrive !!",
      color: "green",
    },
    {
      ticketID: "Ticket# 2024-CS111",
      date: "Posted at 16:12 AM",
      title: "Need assistance for mac?",
      content:
        "J'ai un soucis avec mon mac car je suis débile, pouvez vous venire me sauver ?",
      color: "orange",
    },
    {
      ticketID: "Ticket# 2022-CS042",
      date: "Posted at 09:22 AM",
      title: "Cannot log into admin panel",
      content:
        "I cant log with my actual login, i think someone juste hacked me and have access to my email!!! urgent",
      color: "green",
    },
    // Ajoutez d'autres tickets ici...
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  useEffect(() => {
    const results = tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.ticketID.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredTickets(results);
  }, [searchTerm, tickets]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-merriweather">
      <Sidebar className="w-full md:w-64 flex-shrink-0" />
      <div className="flex-grow">
        <div className="h-28 w-full merriweather flex items-center justify-between px-8">
          <div className="w-1/3"></div> {/* Espace vide à gauche */}
          <h1 className="text-primary text-3xl  font-bold w-1/3 text-center">
            Welcome!
          </h1>
          <div className="w-1/3 flex justify-end">
            <NotificationButt />
          </div>
        </div>
        <div className="h-20 w-[80%] flex justify-start items-center">
          <h1 className="text-3xl ml-8 font-bold">Tickets</h1>
        </div>
        <div className="h-[6rem] w-full flex items-center justify-between">
          <SearchButton
            className="w-[40%] ml-8"
            placeholder="Search for Ticket"
            onSearch={handleSearch}
          />
          <Select>
            <SelectTrigger className="w-[40%] mr-8">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Ouvert</SelectItem>
              <SelectItem value="dark">En cours</SelectItem>
              <SelectItem value="system">Fermée</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 p-8">
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket, index) => (
              <TicketCard
                key={index}
                ticketID={ticket.ticketID}
                date={ticket.date}
                title={ticket.title}
                content={ticket.content}
                color={ticket.color}
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
