import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SearchButton = ({ placeholder, className, onSearch }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const value = e.targer.value;
    setSearch(value);
    console.log(value);
    onSearch(value);
  };

  return (
    <form className={`relative flex items-center  ${className}`}>
      <Button
        onChange={handleInputChange}
        variant="ghost"
        size="icon"
        className="absolute left-0 z-10 hover:bg-transparent focus:bg-transparent active:bg-transparent"
      >
        <Search className="h-4 w-4" />
      </Button>
      <Input
        name="search"
        className="pl-10 bg-[#FBFBFB]"
        type="text"
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchButton;
