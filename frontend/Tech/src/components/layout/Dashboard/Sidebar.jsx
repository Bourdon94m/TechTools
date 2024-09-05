import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Ticket,
  Settings,
  Menu,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeSelector from "@/components/ui/dashboard/ThemeSelector"; // Assurez-vous que le chemin d'importation est correct

const SidebarContent = ({ collapsed, setCollapsed }) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full",
        collapsed ? "items-center" : "p-4"
      )}
    >
      <div className="flex items-center p-4 justify-center mb-8">
        {!collapsed && (
          <span className="text-2xl font-MrRobot">
            <a href="/">Ticket Panel</a>
          </span>
        )}
      </div>

      <nav className="space-y-2 flex-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <LayoutDashboard className="h-5 w-5 mr-2" />
                {!collapsed && <a href="dashboard">Dashboard</a>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Dashboard</TooltipContent>
            )}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Ticket className="h-5 w-5 mr-2" />
                {!collapsed && <a href="tickets">Tickets</a>}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Tickets</TooltipContent>}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="h-5 w-5 mr-2" />
                {!collapsed && "Settings"}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Settings</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </nav>

      {/* ThemeSelector placé en bas */}
      <div className={cn(
        "mt-auto pt-4",
        collapsed ? "w-full flex justify-center" : ""
      )}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={collapsed ? "w-10 h-10" : "w-full"}>
                <ThemeSelector />
              </div>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Change Theme</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      
    </div>
  );
};

const Sidebar = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Version desktop */}
      <div
        className={cn(
          "relative h-screen bg-background border-r hidden md:block lg:block transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          className
        )}
      >
        <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Version mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden md:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[300px] p-0">
          <SidebarContent collapsed={false} setCollapsed={() => {}} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;