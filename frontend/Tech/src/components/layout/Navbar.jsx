import { useContext } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Utilisez le contexte d'authentification

  return (
    <header className="bg-white shadow-md font-merriweather">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-MrRobot">
              TechTools
            </Link>
          </div>

          {/* Navigation pour grand écran */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium">
                    Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[200px]">
                      <li>
                        <NavigationMenuLink className="font-medium hover:cursor-pointer hover:underline">
                          <a href="/teamviewer">Teamviewer</a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink className="font-medium hover:cursor-pointer hover:underline">
                          Ticket
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink className="font-medium hover:cursor-pointer hover:underline">
                          Outil 3
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm font-body-400">
                  Connecté en tant que {user.email}
                </span>
                <Button variant="outline" onClick={logout}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="font-merriweather">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Menu burger pour petit écran */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px]">
                <nav className="flex flex-col space-y-4 mt-4 font-merriweather">
                  <h2 className="text-lg font-semibold mb-2">Tools</h2>
                  <a href="/teamviewer" className="text-base hover:underline">
                    Teamviewer
                  </a>
                  <a href="#" className="text-base hover:underline">
                    Ticket
                  </a>
                  <a href="#" className="text-base hover:underline">
                    Outil 3
                  </a>
                  {user ? (
                    <>
                      <span className="text-sm font-merriweather">
                        Connecté en tant que {user.email}
                      </span>
                      <Button className="mt-4" onClick={logout}>
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <Button className="mt-4 font-merriweather">
                      <Link to="/login">Login</Link>
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
