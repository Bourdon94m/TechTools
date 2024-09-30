import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldAlert } from "lucide-react"

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">Non autorisé</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Désolé, vous n&apos;avez pas l&apos;autorisation d&apos;accéder à cette page. Veuillez contacter l&apos;administrateur si vous pensez qu&apos;il s&apos;agit d&apos;une erreur.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <a href="/">Retour à l&apos;accueil</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}