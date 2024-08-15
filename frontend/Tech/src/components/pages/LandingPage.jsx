import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Monitor, Ticket, Wrench } from "lucide-react";
import { Helmet } from "react-helmet";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Title */}
      <Helmet>
        <title>Service Informatique</title>
      </Helmet>
      {/* Title */}

      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
            Service Informatique Ceciaa
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Plateforme d'outils et d'automatisation pour simplifier nos tâches
            quotidiennes.
          </p>
          <Button size="lg">
            Découvrir nos outils
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <Card>
            <CardHeader>
              <Monitor className="h-8 w-8 mb-2" />
              <CardTitle>Teamviewer</CardTitle>
              <CardDescription>
                Assistance à distance rapide et sécurisée
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Connectez-vous aux postes distants en quelques clics pour un
                support efficace.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">
                <a href="/teamviewer">Accéder</a>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Ticket className="h-8 w-8 mb-2" />
              <CardTitle>Système de Tickets</CardTitle>
              <CardDescription>
                Gestion des demandes d'assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Centralisez et suivez toutes les demandes d'assistance de
                manière organisée.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Accéder</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Wrench className="h-8 w-8 mb-2" />
              <CardTitle>Autres Outils</CardTitle>
              <CardDescription>Suite complète d'outils IT</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Découvrez notre gamme d'outils spécialisés pour optimiser votre
                travail.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Explorer</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
            Prêt à améliorer votre productivité ?
          </h2>
          <p className="text-muted-foreground mb-8">
            Commencez dès maintenant à utiliser nos outils pour simplifier vos
            tâches quotidiennes.
          </p>
          <Button size="lg" variant="default">
            Commencer
          </Button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
