import React from "react";
import Sidebar from "../../layout/Dashboard/Sidebar";
import {
  BarChartCard,
  LineChartCard,
  AreaChartCard,
} from "@/components/layout/Dashboard/ChartCards";
import RecentTicket from "@/components/layout/Dashboard/RecentTicket";

function getFormattedDateToday() {
  const today = new Date();
  const jour = String(today.getDate()).padStart(2, "0");
  const mois = String(today.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const annee = today.getFullYear();

  return `${jour}/${mois}/${annee}`; // dd/mm/yy format
}
const LandingDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar className="w-full md:w-64 flex-shrink-0" />

      {/* Main content */}
      <div className="flex-1 p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BarChartCard
            className="rounded-lg p-4 h-full"
            classContainerName="h-48 md:h-64"
            title="Tickets Ouverts"
          />
          <LineChartCard
            className="rounded-lg p-4 h-full"
            classContainerName="h-48 md:h-64"
            title="Tickets En Cours"
          />
          <AreaChartCard
            className="rounded-lg p-4 h-full"
            classContainerName="h-48 md:h-64"
            title="Tickets Fermées"
          />
        </div>
        <div className="h-[30rem] flex-col justify-between w-full  space-y-4 mt-4 bg-">
          <h1 className="text-2xl md:text-3l">Tickets Recents :</h1>
          <RecentTicket
            title={"Création de compte Pacca"}
            author={"Martine"}
            date={getFormattedDateToday()}
            isOpen={true}
            avatarUrl={
              "https://cdn.pixabay.com/photo/2023/11/01/11/15/cable-car-8357178_640.jpg"
            }
          />
          <RecentTicket
            title={"Support Jaws nécéssaire"}
            author={"Florian"}
            date={getFormattedDateToday()}
            isOpen={false}
            avatarUrl={
              "https://cdn.pixabay.com/photo/2024/08/05/21/19/lion-8947711_640.jpg"
            }
          />
          <RecentTicket
            title={"ZoomText Crash démarrage"}
            author={"Hamza"}
            date={getFormattedDateToday()}
            isOpen={true}
            avatarUrl={
              "https://cdn.pixabay.com/photo/2024/02/17/13/38/cabin-8579310_640.jpg"
            }
          />
          <RecentTicket
            title={"Nouvelle config : Michel ... "}
            author={"Bastien"}
            date={getFormattedDateToday()}
            isOpen={true}
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
