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
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-background text-foreground shadow-md font-merriweather">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-MrRobot text-primary">
              TechTools
            </Link>
          </div>

          {/* Navigation pour grand écran */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-base font-medium bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground">
                    Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-background border border-border">
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[200px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="/teamviewer" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Teamviewer
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Ticket
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            Outil 3
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Connecté en tant que {user.email}
                </span>
                <Button variant="outline" onClick={logout} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Button variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Menu burger pour petit écran */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:bg-accent hover:text-accent-foreground">
                  <MenuIcon className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[200px] bg-background text-foreground">
                <nav className="flex flex-col space-y-4 mt-4 font-merriweather">
                  <h2 className="text-lg font-semibold mb-2">Tools</h2>
                  <a href="/teamviewer" className="text-base hover:text-primary">
                    Teamviewer
                  </a>
                  <a href="#" className="text-base hover:text-primary">
                    Ticket
                  </a>
                  <a href="#" className="text-base hover:text-primary">
                    Outil 3
                  </a>
                  {user ? (
                    <>
                      <span className="text-sm">
                        Connecté en tant que {user.email}
                      </span>
                      <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90" onClick={logout}>
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <Button className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
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