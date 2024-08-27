import { useState, useEffect } from "react";
import Sidebar from "@/components/layout/Dashboard/Sidebar";
import NotificationButt from "@/components/ui/dashboard/notification-button";
import NewTicketButton from "@/components/ui/dashboard/newTicket-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  return (
    <div className="flex flex-col md:flex-row min-h-screen font-merriweather">
      {/* Sidebar */}
      <Sidebar className="w-full md:w-64 flex-shrink-0" />
      {/* Main content */}
      <div className="flex-grow">
        <div className="h-28 w-full merriweather flex items-center justify-between px-4 md:px-8 lg:px-16">
          <div className="flex-grow" />
          <h1 className="text-primary text-2xl md:text-3xl font-bold">
            Welcome!
          </h1>
          <div className="flex-grow flex justify-end">
            <NotificationButt className="ml-4 md:ml-8 lg:ml-16" />
          </div>
        </div>
        <div className="h-20 w-full flex justify-between items-center">
          <h1 className="text-3xl ml-8 font-bold">Tickets</h1>
          <NewTicketButton />
        </div>
        <div className="h-[6rem] w-full flex items-center justify-between lg:justify-center lg:gap-10">
          <SearchButton
            className={"w-[40%] ml-8 lg:w-[30%]  :placeholder:text-xl "}
            placeholder={"Search for Ticket ..."}
          />
          <Select>
            <SelectTrigger className="w-[40%] mr-8 lg:w-[30%]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Ouvert</SelectItem>
              <SelectItem value="dark">En cours</SelectItem>
              <SelectItem value="system">Fermée</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Updated grid for TicketCards */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 px-8 py-6">
          <TicketCard
            ticketID="Ticket# 2023-CS123"
            title="How to deposit money to my portal ?"
            date="Posted at 12:45 AM"
            content="Je n'arrive pas a faire des beaux design au secours help me je sais pas ce qui m'arrive !!"
            status="unresolved"
            color="red"
          />
          <TicketCard
            ticketID="Ticket# 2023-CS124"
            title="Issue with account login"
            date="Posted at 14:30 PM"
            content="I'm having trouble logging into my account. Can someone please help?"
            status="in progress"
            color="orange"
          />
          <TicketCard
            ticketID="Ticket# 2023-CS125"
            title="Request for feature enhancement"
            date="Posted at 09:15 AM"
            content="I would like to suggest a new feature for the dashboard. Can we discuss this?"
            status="open"
            color="green"
          />
          {/* You can add more TicketCard components here as needed */}
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
