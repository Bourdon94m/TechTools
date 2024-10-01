import { Button } from "@/components/ui/button"
import { ShieldAlert } from "lucide-react"


export default function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div className="flex flex-col items-center text-center">
          <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Accées Refusées</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Vous n&apos;étes pas authorisez a consulter cet page.
          </p>
          <a href="/">
            <Button variant="default">
              Retourner au menu
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}