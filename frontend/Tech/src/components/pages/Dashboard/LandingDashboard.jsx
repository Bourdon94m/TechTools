import React from "react";
import Sidebar from "../../layout/Dashboard/Sidebar";
import { ChartCard } from "@/components/layout/Dashboard/ChartCards";
import RecentTicket from "@/components/layout/Dashboard/RecentTicket";

const LandingDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar className="w-full md:w-64 flex-shrink-0" />

      {/* Main content */}
      <div className="flex-1 p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ChartCard
            className="rounded-lg p-4 h-full"
            classContainerName="h-48 md:h-64"
            title="Tickets Ouvert"
          />
          <ChartCard
            className="rounded-lg p-4 h-full"
            classContainerName="h-48 md:h-64"
            title="Tickets En Cours"
          />
          <ChartCard
            className="rounded-lg p-4 h-full"
            classContainerName="h-48 md:h-64"
            title="Tickets Fermées"
          />
        </div>
        <div className="bg- h-[40rem] w-full mt-4 gap-10">
          <RecentTicket
            avatarUrl={
              "https://cdn.pixabay.com/photo/2023/11/01/11/15/cable-car-8357178_640.jpg"
            }
          />
          <RecentTicket
            avatarUrl={
              "https://cdn.pixabay.com/photo/2024/08/05/21/19/lion-8947711_640.jpg"
            }
          />
          <RecentTicket
            avatarUrl={
              "https://cdn.pixabay.com/photo/2024/02/17/13/38/cabin-8579310_640.jpg"
            }
          />
          <RecentTicket
            avatarUrl={
              "https://cdn.pixabay.com/photo/2024/01/15/21/13/puppy-8510899_640.jpg"
            }
          />
        </div>
      </div>
      {/* Main content */}
    </div>
  );
};

export default LandingDashboard;
