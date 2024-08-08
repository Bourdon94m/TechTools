import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

// TeamViewer colors
const colors = {
  primary: "#0a68ff",
  secondary: "#1a1f25",
  background: "#f0f3f5",
  text: "#2a3134",
  border: "#d9dfe3",
};

export function ConfirmationDialog({ isOpen, onClose, onConfirm, userData }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmer l'enregistrement</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir enregistrer ces informations ?
          </DialogDescription>
        </DialogHeader>
        <div>
          {Object.entries(userData).map(([key, value]) => (
            <p key={key}><strong>{key} :</strong> {value.toString()}</p>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Annuler</Button>
          <Button onClick={onConfirm}>Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


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
    <div className="space-y-4" style={{padding: '20px', borderRadius: '8px' }}>
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
              <Button style={{ backgroundColor: colors.primary, color: 'white' }}>Créer</Button>
            </DialogTrigger>
            <DialogContent style={{ backgroundColor: colors.background }}>
              <DialogHeader>
                <DialogTitle style={{ color: colors.text }}>Créer un client</DialogTitle>
                <DialogDescription style={{ color: colors.text }}>
                  Menu permettant la création d'un client TeamViewer
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="nom" className="text-right" style={{ color: colors.text }}>
                    Nom
                  </Label>
                  <Input id="nom" className="col-span-3" style={{ borderColor: colors.border }} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prenom" className="text-right" style={{ color: colors.text }}>
                    Prénom
                  </Label>
                  <Input id="prenom" className="col-span-3" style={{ borderColor: colors.border }} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="identifiant" className="text-right" style={{ color: colors.text }}>
                    Identifiant
                  </Label>
                  <Input id="identifiant" className="col-span-3" style={{ borderColor: colors.border }} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right" style={{ color: colors.text }}>
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" style={{ borderColor: colors.border }} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="commentaire" className="text-right" style={{ color: colors.text }}>
                    Commentaire
                  </Label>
                  <Textarea id="commentaire" className="col-span-3" style={{ borderColor: colors.border }} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sub" />
                  <Label htmlFor="sub" style={{ color: colors.text }}>Abonné</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" style={{ backgroundColor: colors.primary, color: 'white' }} onClick={(ConfirmationDialog)} >Enregistrer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" style={{ borderColor: colors.border, color: colors.text }}>
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
      <div className="rounded-md border" style={{ borderColor: colors.border, overflow: 'hidden' }}>
        <Table>
          <TableHeader style={{ backgroundColor: colors.secondary }}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ color: 'white', fontWeight: 'bold' }}>
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
                  style={{ backgroundColor: index % 2 === 0 ? 'white' : colors.background }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} style={{ color: colors.text }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center" style={{ color: colors.text }}>
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