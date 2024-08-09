import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

// TeamViewer inspired color scheme
const colors = {
  primary: "#0a68ff", // Bleu vif pour les éléments principaux
  secondary: "#005ede", // Bleu plus foncé pour les éléments secondaires
  background: "#f5f8fc", // Fond très clair avec une teinte bleue
  text: "#2a3134", // Texte foncé pour un bon contraste
  border: "#bcd5f7", // Bordure bleue claire
  accent: "#00a2ff", // Bleu clair pour les accents
  hover: "#e6f0ff", // Couleur de survol légère
  buttonText: "#ffffff", // Texte blanc pour les boutons
};

export function DataTable({ columns, data }) {
  const [filtering, setFiltering] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      globalFilter: filtering,
      columnVisibility,
    },
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="space-y-4" style={{ padding: "20px", borderRadius: "8px" }}>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Filtrer tous les champs..."
          value={filtering}
          onChange={(event) => setFiltering(event.target.value)}
          className="max-w-sm"
          style={{ borderColor: colors.border }}
        />
        <div className="space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                style={{ backgroundColor: colors.primary, color: "white" }}
              >
                Créer
              </Button>
            </DialogTrigger>
            <DialogContent style={{ backgroundColor: colors.background }}>
              <DialogHeader>
                <DialogTitle style={{ color: colors.text }}>
                  Créer un client
                </DialogTitle>
                <DialogDescription style={{ color: colors.text }}>
                  Menu permettant la création d'un client TeamViewer
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="nom"
                    className="text-right"
                    style={{ color: colors.text }}
                  >
                    Nom
                  </Label>
                  <Input
                    id="nom"
                    className="col-span-3"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="prenom"
                    className="text-right"
                    style={{ color: colors.text }}
                  >
                    Prénom
                  </Label>
                  <Input
                    id="prenom"
                    className="col-span-3"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="identifiant"
                    className="text-right"
                    style={{ color: colors.text }}
                  >
                    Identifiant
                  </Label>
                  <Input
                    id="identifiant"
                    className="col-span-3"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="email"
                    className="text-right"
                    style={{ color: colors.text }}
                  >
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="col-span-3"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="commentaire"
                    className="text-right"
                    style={{ color: colors.text }}
                  >
                    Commentaire
                  </Label>
                  <Textarea
                    id="commentaire"
                    className="col-span-3"
                    style={{ borderColor: colors.border }}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sub" />
                  <Label htmlFor="sub" style={{ color: colors.text }}>
                    Abonné
                  </Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  style={{ backgroundColor: colors.primary, color: "white" }}

                  // * Handle data sended to the backend for create our user with verification
                  onClick={() => {
                    try {
                      // Fonction utilitaire pour récupérer en toute sécurité la valeur d'un élément
                      const safeGetValue = (id) => {
                        const element = document.getElementById(id);
                        return element ? element.value.trim() : '';
                      };
                  
                      // Récupération sécurisée des valeurs
                      const id_teamviewer = safeGetValue('identifiant');
                      const prenom = safeGetValue('prenom');
                      const nom = safeGetValue('nom');
                      const email = safeGetValue('email');
                      const commentaire = safeGetValue('commentaire');
                  
                      // Récupération de la valeur de la checkbox
                      const hasAssistance = document.getElementById('has_assistance')?.checked;
                  
                      console.log("Valeurs :", { id_teamviewer, prenom, nom, email, commentaire, hasAssistance });
                  
                      // Vérification des champs obligatoires
                      if (!id_teamviewer || !prenom || !nom) {
                        alert('Veuillez remplir tous les champs obligatoires !');
                      } else {
                        console.log("Formulaire valide, prêt à être soumis");
                        // Ajoutez ici le code pour traiter le formulaire
                        // Par exemple : appel à une API, mise à jour de l'état, etc.
                      }
                    }
                    catch (error) {
                      console.error("Une erreur s'est produite :", error);
                      alert("Une erreur s'est produite. Veuillez réessayer.");
                    }
                  }}
                >
                  Enregistrer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                style={{ borderColor: colors.border, color: colors.text }}
              >
                Colonnes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        className="rounded-md border"
        style={{ borderColor: colors.border, overflow: "hidden" }}
      >
        <Table>
          <TableHeader style={{ backgroundColor: colors.secondary }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ color: "white", fontWeight: "bold" }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "white" : colors.background,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ color: colors.text }}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                  style={{ color: colors.text }}
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{ color: colors.primary, borderColor: colors.primary }}
        >
          Précédent
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{ color: colors.primary, borderColor: colors.primary }}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
