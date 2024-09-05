import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const RecentTicket = ({ title, author, isOpen, date, avatarUrl }) => {
  return (
    <div className="bg-card text-card-foreground shadow-md rounded-lg p-4 mb-4 h-1/5 flex items-center space-x-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatarUrl} alt={author} />
        <AvatarFallback className="bg-muted text-muted-foreground">
          {author.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-grow">
        <h3 className="font-semibold text-lg text-primary">{title}</h3>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
      <Badge 
        variant={isOpen ? "default" : "destructive"}
        className={isOpen ? "bg-primary text-primary-foreground" : ""}
      >
        {isOpen ? "Ouvert" : "Fermé"}
      </Badge>
    </div>
  );
};

export default RecentTicket;