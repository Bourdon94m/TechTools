// src/pages/Teamviewer.jsx

import React, { useState, useEffect } from 'react';
import { DataTable } from '../layout/DataTable';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Navbar from '../layout/Navbar';
import { Button } from '../ui/button';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Composant pour le bouton de mise à jour
const UpdateButton = ({ row }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Fonction pour gérer la modification
  const handleModify = () => {
    // TODO: Implémenter la logique de modification
    console.log("Modifier", row);
    setShowDialog(false);
  };

  // Fonction pour gérer la suppression
  const handleDelete = () => {
    setShowDeleteAlert(true);
    setShowDialog(false);
  };

  // Fonction pour confirmer la suppression
  const confirmDelete = () => {
    console.log("Suppression confirmée pour", row.getValue("firstname"), row.getValue("lastname"), row.getValue("id_teamviewer"));
    // Fonction anonyme à remplacer par votre logique de suppression
    (() => {
      // Votre logique de suppression ici
    })();
  };

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button variant="secondary">Update</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[300px]">
          <DialogHeader>
            <DialogTitle>Choisissez une action</DialogTitle>
          </DialogHeader>
          <div className="flex justify-around mt-4">
            <Button onClick={handleModify}>Modifier</Button>
            <Button onClick={handleDelete} variant="destructive">Supprimer</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ?</AlertDialogTitle>
            <AlertDialogDescription>
                Vous êtes sur le point de supprimer : {row.getValue("firstname")} {row.getValue("lastname")} (Identifiant Teamviewer : {row.getValue("id_teamviewer")})
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Confirmer la suppression</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

// Définition des colonnes pour le tableau
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
    accessorKey: "commentary",
    header: "commentaire"
  },
  {
    accessorKey: "has_teleassistance",
    header: "Abonné",
    cell: ({ row }) => (
      <div className={row.getValue("has_teleassistance") ? "text-green-600" : "text-red-600"}>
        {row.getValue("has_teleassistance") ? "Oui" : "Non"}
      </div>
    ),
  },
  {
    header: "Ouvrir",
    cell: ({ row }) => {
      return (
        <Button 
          variant='outline'
          onClick={() => {
            // Logique pour ouvrir TeamViewer avec l'ID
            const id = row.getValue("id_teamviewer");
            
            fetch('http://127.0.0.1:8000/open-teamviewer/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({"id": id})
            })
          }}
        >
          Ouvrir
        </Button>
      );
    }
  },
  {
    header: "Action ",
    cell: ({ row }) => <UpdateButton row={row} />
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