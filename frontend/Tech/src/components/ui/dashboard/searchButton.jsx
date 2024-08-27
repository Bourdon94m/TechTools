import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchButton = ({ placeholder, className, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onWriting = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Si vous voulez appeler onSearch à chaque changement
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 z-10 hover:bg-transparent focus:bg-transparent active:bg-transparent"
      >
        <Search className="h-4 w-4" />
      </Button>
      <Input
        onChange={onWriting}
        value={searchTerm}
        name="search"
        className="pl-10 bg-[#FBFBFB]"
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchButton;
