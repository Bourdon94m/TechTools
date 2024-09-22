import React, { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Dashboard/Sidebar";
import NotificationButt from "@/components/ui/dashboard/notification-button";
import { NewTicketButton } from "/src/components/ui/dashboard/newTicket-button.jsx";
import SearchButton from "@/components/ui/dashboard/searchButton";
import { format, parseISO } from "date-fns";
import TicketCard from "@/components/ui/dashboard/ticket-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 3;

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
        const formattedTickets = data.map((ticket) => ({
          ticketID: ticket.ticket_id || "",
          date: ticket.creation_date
            ? format(parseISO(ticket.creation_date), "dd/MM/yyyy")
            : "",
          title: ticket.title || "",
          content: ticket.content || "",
          status: ticket.status,
        }));
        setTickets(formattedTickets);
      });
  };

  useEffect(() => {
    fetchTicketFromApi();
  }, []);

  const filterTickets = () => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.content.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        (filterStatus === "open" && ticket.status === "open") ||
        (filterStatus === "closed" && ticket.status !== "open");

      return matchesSearch && matchesStatus;
    });
  };

  useEffect(() => {
    setFilteredTickets(filterTickets());
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, filterStatus, tickets]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusChange = (value) => {
    setFilterStatus(value);
  };

  const handleTicketStatusChange = (ticketId, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.ticketID === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(
    indexOfFirstTicket,
    indexOfLastTicket
  );
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-merriweather">
      <Sidebar className="w-full md:w-64 flex-shrink-0" />
      <div className="flex-grow">
        <div className="h-28 w-full merriweather flex items-center justify-between px-8">
          <div className="w-1/3"></div>
          <h1 className="text-primary text-3xl font-bold w-1/3 text-center">
            Welcome!
          </h1>
          <div className="w-1/3 flex justify-end">
            <NotificationButt />
          </div>
        </div>
        <div className="h-20 w-full flex justify-between items-center">
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
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => (
              <TicketCard
                key={ticket.ticketID}
                ticketID={ticket.ticketID}
                date={ticket.date}
                title={ticket.title}
                content={ticket.content}
                initialStatus={ticket.status}
                onStatusChange={(newStatus) =>
                  handleTicketStatusChange(ticket.ticketID, newStatus)
                }
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Aucun ticket ne correspond à votre recherche.
            </div>
          )}
        </div>
        <div className="flex justify-center pb-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => paginate(index + 1)}
                    isActive={currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
