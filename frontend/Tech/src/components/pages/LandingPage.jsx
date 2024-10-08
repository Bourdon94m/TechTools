import React, { useContext } from "react";
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
import { AuthContext } from "@/context/AuthContext"; // Assurez-vous que le chemin est correct

const LandingPage = () => {
  const { user, loading } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>Service Informatique</title>
      </Helmet>

      <Navbar />
      <main className="container mx-auto px-4 py-12 font-merriweather">
        <section className="text-center mb-16">
          <h1 className="scroll-m-20 text-4xl font-MrRobot tracking-tight lg:text-5xl mb-4 text-primary">
            TechTools
          </h1>
          <p className="text-xl font-merriweather text-muted-foreground mb-8">
            Plateforme d'outils et d'automatisation pour simplifier nos tâches
            quotidiennes.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {user ? "Découvrir nos outils" : "Se connecter"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        {user && !loading && (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16 font-merriweather">
            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <Monitor className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-primary">Teamviewer</CardTitle>
                <CardDescription className="text-muted-foreground">
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
                <Button
                  variant="outline"
                  className="text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href="/teamviewer">Accéder</a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <Ticket className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-primary">
                  Système de Tickets
                </CardTitle>
                <CardDescription className="text-muted-foreground">
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
                <Button
                  variant="outline"
                  className="text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <a href="/dashboard">Accéder</a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-card text-card-foreground">
              <CardHeader>
                <Wrench className="h-8 w-8 mb-2 text-primary" />
                <CardTitle className="text-primary">Autres Outils</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Suite complète d'outils IT
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Découvrez notre gamme d'outils spécialisés pour optimiser
                  votre travail.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Explorer
                </Button>
              </CardFooter>
            </Card>
          </section>
        )}

        <section className="text-center font-merriweather">
          <h2 className="scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4 text-primary">
            Prêt à améliorer votre productivité ?
          </h2>
          <p className="text-muted-foreground mb-8">
            {user
              ? "Commencez dès maintenant à utiliser nos outils pour simplifier vos tâches quotidiennes."
              : "Connectez-vous pour accéder à nos outils et simplifier vos tâches quotidiennes."}
          </p>
          <Button
            size="lg"
            variant="default"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {user ? "Commencer" : "Se connecter"}
          </Button>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
