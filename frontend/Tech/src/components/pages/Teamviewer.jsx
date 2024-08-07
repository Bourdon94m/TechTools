// src/pages/Teamviewer.jsx

import React, { useState, useEffect } from 'react';
import { DataTable } from '../layout/DataTable';
import Navbar from '../layout/Navbar';
const columns = [
  {
    accessorKey: "firstname",
    header: "Prénom",
  },
  {
    accessorKey: "lastname",
    header: "Nom",
  },
  {
    accessorKey: "id_teamviewer",
    header: "ID Teamviewer"
  },
  {
    accessorKey: "has_assistance",
    header: "Sub"
  }
];

const Teamviewer = () => {
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/teamviewer/all');
                if (!response.ok) {
                    throw new Error('Erreur réseau');
                }
                const data = await response.json();
                setClients(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchClients();
    }, []);

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    return (
        <>
        <Navbar/>
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-4">Liste des clients</h1>
            <DataTable columns={columns} data={clients} />
        </div>
        </>
    );
};

export default Teamviewer;