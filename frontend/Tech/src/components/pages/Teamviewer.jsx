import React, { useState, useEffect } from "react";
import { DataTable } from "../layout/DataTable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "../layout/Navbar";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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
} from "@/components/ui/alert-dialog";

const colors = {
  primary: "#0a68ff",
  secondary: "#005ede",
  background: "#f5f8fc",
  text: "#2a3134",
  border: "#bcd5f7",
  accent: "#00a2ff",
  hover: "#e6f0ff",
  buttonText: "#ffffff",
};

const UpdateButton = ({ row }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const { toast } = useToast();

  const safeGetValue = (key) => {
    return row && row.getValue ? row.getValue(key) : undefined;
  };

  const handleModify = () => {
    const userId = safeGetValue("id");
    if (!userId) {
      toast({
        title: "Erreur",
        description: "Impossible de récupérer l'ID de l'utilisateur",
        variant: "destructive",
      });
      return;
    }

    fetch(`http://127.0.0.1:8000/teamviewer/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setEditData(data);
        setShowEditDialog(true);
        setShowDialog(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données:", error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer les données de l'utilisateur",
          variant: "destructive",
        });
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/teamviewer/${editData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données modifiées:", data);
        setShowEditDialog(false);
        toast({
          title: "Succès",
          description: "Les modifications ont été enregistrées",
        });
        // Ici, vous devriez probablement rafraîchir la liste des clients
      })
      .catch((error) => {
        console.error("Erreur:", error);
        toast({
          title: "Erreur",
          description: "Impossible de mettre à jour les données",
          variant: "destructive",
        });
      });
  };

  const handleDelete = () => {
    setShowDeleteAlert(true);
    setShowDialog(false);
  };

  const confirmDelete = () => {
    const today = new Date();
    const id = safeGetValue("id");

    if (!id) {
      toast({
        title: "Erreur",
        description: "Informations utilisateur manquantes",
        variant: "destructive",
      });
      return;
    }

    fetch(`http://127.0.0.1:8000/teamviewer/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la request !");
        }
        return response.json();
      })
      .then(() => {
        console.log("Succès");
        toast({
          title: "Client supprimé avec succès",
          description: `Le client a été supprimé le ${today.toLocaleDateString(
            "fr-FR"
          )}`,
        });
        setShowDeleteAlert(false);
        // Ajoutez ici le code pour mettre à jour l'interface utilisateur
      })
      .catch((error) => {
        console.error("Erreur:", error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description:
            error.message ||
            "Une erreur s'est produite lors de la suppression du client",
        });
      });
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
            <Button onClick={handleDelete} variant="destructive">
              Supprimer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modifier les informations</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstname" className="text-right">
                  Prénom
                </Label>
                <Input
                  id="firstname"
                  value={editData.firstname || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, firstname: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastname" className="text-right">
                  Nom
                </Label>
                <Input
                  id="lastname"
                  value={editData.lastname || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, lastname: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="id_teamviewer" className="text-right">
                  ID Teamviewer
                </Label>
                <Input
                  id="id_teamviewer"
                  value={editData.id_teamviewer || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, id_teamviewer: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="commentary" className="text-right">
                  Commentaire
                </Label>
                <Textarea
                  id="commentary"
                  value={editData.commentary || ""}
                  onChange={(e) =>
                    setEditData({ ...editData, commentary: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="has_teleassistance"
                  checked={editData.has_teleassistance || false}
                  onCheckedChange={(checked) =>
                    setEditData({ ...editData, has_teleassistance: checked })
                  }
                />
                <Label htmlFor="has_teleassistance">Téléassistance</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Enregistrer les modifications</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Êtes-vous sûr de vouloir supprimer ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Vous êtes sur le point de supprimer : {safeGetValue("firstname")}{" "}
              {safeGetValue("lastname")} (Identifiant Teamviewer :{" "}
              {safeGetValue("id_teamviewer")})
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Confirmer la suppression
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

const columns = [
  {
    accessorKey: "id",
    header: "id",
  },
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
    header: "ID Teamviewer",
  },
  {
    accessorKey: "commentary",
    header: "commentaire",
  },
  {
    accessorKey: "has_teleassistance",
    header: "Téléassistance",
    cell: ({ row }) => (
      <div
        className={
          row.getValue("has_teleassistance") ? "text-green-600" : "text-red-600"
        }
      >
        {row.getValue("has_teleassistance") ? "Oui" : "Non"}
      </div>
    ),
  },
  {
    header: "Ouvrir",
    cell: ({ row }) => {
      return (
        <Button
          variant="outline"
          onClick={() => {
            const id = row.getValue("id_teamviewer");
            fetch("http://127.0.0.1:8000/open-teamviewer/", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: id }),
            });
          }}
        >
          Ouvrir
        </Button>
      );
    },
  },
  {
    header: "Action ",
    cell: ({ row }) => <UpdateButton row={row} />,
  },
];

const Teamviewer = () => {
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/teamviewer/all");
        if (!response.ok) {
          throw new Error("Erreur réseau");
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
      <Navbar />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl mb-4">Liste des clients</h1>
        <DataTable columns={columns} data={clients} />
      </div>
    </>
  );
};

export default Teamviewer;
