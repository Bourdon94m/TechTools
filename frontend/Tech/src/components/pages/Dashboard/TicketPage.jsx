import React, { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import Sidebar from "@/components/layout/Dashboard/Sidebar";
import NotificationButt from "@/components/ui/dashboard/notification-button";
import { NewTicketButton } from "/src/components/ui/dashboard/newTicket-button.jsx";
import SearchButton from "@/components/ui/dashboard/searchButton";
import TicketCard from "@/components/ui/dashboard/ticket-card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PenToolIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  HashIcon,
} from "lucide-react";
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

// Composant StylishTicketEditor
const StylishTicketEditor = ({ ticket, onSave, onClose }) => {
  const [title, setTitle] = useState(ticket.title);
  const [content, setContent] = useState(ticket.content);
  const [isOpen, setIsOpen] = useState(ticket.status === "open");
  const [lastUpdated, setLastUpdated] = useState(
    new Date(ticket.creation_date)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTicket = {
      ...ticket,
      title,
      content,
      status: isOpen ? "open" : "closed",
    };
    onSave(updatedTicket);
    setLastUpdated(new Date());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className=" bg-gradient-to-r from-blue-400 to-indigo-600  text-white px-3 py-1 rounded-full text-sm font-bold flex items-center"
              >
                <HashIcon className="w-4 h-4 mr-1" />
                {ticket.ticketID}
              </motion.div>
            </div>
            <CardTitle className="text-3xl font-bold text-center text-gray-800">
              Modifier le Ticket
            </CardTitle>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <ClockIcon className="w-4 h-4" />
              <span>Dernière mise à jour : {lastUpdated.toLocaleString()}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-lg font-semibold text-gray-700"
              >
                Titre du Ticket
              </Label>
              <div className="relative">
                <PenToolIcon className="absolute top-3 left-3 w-5 h-5 text-gray-400" />
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pl-10 bg-white/50 border-2 border-gray-300 focus:border-purple-500 transition-all duration-300"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-lg font-semibold text-gray-700"
              >
                Contenu
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[150px] bg-white/50 border-2 border-gray-300 focus:border-purple-500 transition-all duration-300"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="status"
                className="text-lg font-semibold text-gray-700"
              >
                État du Ticket
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={isOpen}
                  onCheckedChange={setIsOpen}
                />
                <Label
                  htmlFor="status"
                  className="text-sm font-medium text-gray-600"
                >
                  {isOpen ? "Ouvert" : "Fermé"}
                </Label>
                {isOpen ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircleIcon className="w-5 h-5 text-red-500" />
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <motion.div
              className="w-1/2 pr-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full text-normal bg-gradient-to-r from-blue-400 to-indigo-600 hover:from-blue-500 hover:to-indigo-700  text-white font-bold py-3 rounded-lg transition-all duration-300"
              >
                Enregistrer les Modifications
              </Button>
            </motion.div>
            <motion.div
              className="w-1/2 pl-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                onClick={onClose}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-all duration-300"
              >
                Annuler
              </Button>
            </motion.div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

// Composant TicketPage principal
const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTicket, setEditingTicket] = useState(null);
  const { toast } = useToast();
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
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tickets:", error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les tickets",
          variant: "destructive",
        });
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
    setCurrentPage(1);
  }, [searchTerm, filterStatus, tickets]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleStatusChange = (value) => {
    setFilterStatus(value);
  };

  const handleTicketUpdate = (ticketId) => {
    const ticketToEdit = tickets.find((ticket) => ticket.ticketID === ticketId);
    if (ticketToEdit) {
      setEditingTicket(ticketToEdit);
    }
  };

  const handleSaveTicket = (updatedTicket) => {
    fetch(`http://127.0.0.1:8000/ticket/update/${updatedTicket.ticketID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTicket),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Ticket modifié:", data);
        setEditingTicket(null);
        toast({
          title: "Succès",
          description: "Le ticket a été mis à jour",
        });
        fetchTicketFromApi(); // Rafraîchir la liste des tickets
      })
      .catch((error) => {
        console.error("Erreur:", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour le ticket",
          variant: "destructive",
        });
      });
  };

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
                onButtonClick={() => handleTicketUpdate(ticket.ticketID)}
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

      {editingTicket && (
        <StylishTicketEditor
          ticket={editingTicket}
          onSave={handleSaveTicket}
          onClose={() => setEditingTicket(null)}
        />
      )}
    </div>
  );
};

export default TicketPage;
