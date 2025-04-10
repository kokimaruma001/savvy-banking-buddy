
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, LogOut, User } from 'lucide-react';
import AuthDialog from '@/components/auth/AuthDialog';
import { useAuth } from '@/context/AuthContext';
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "signup">("login");
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Education', path: '/education' },
  ];

  const handleOpenAuthDialog = (tab: "login" | "signup") => {
    setActiveAuthTab(tab);
    setAuthDialogOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate('/');
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-blue-600 to-primary flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-lg md:text-xl font-bold">
              <span className="text-gradient">Savvy</span>
            </h1>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className={`link-underline font-medium ${
                      location.pathname === link.path 
                        ? 'text-primary' 
                        : 'text-foreground/80 hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full">
                      <User className="h-4 w-4 mr-2" />
                      {user?.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <AuthDialog 
                    variant="outline" 
                    className="rounded-full"
                    asChild
                    showSignUp={false}
                    open={authDialogOpen && activeAuthTab === "login"}
                    onOpenChange={(open) => {
                      if (open) setActiveAuthTab("login");
                      setAuthDialogOpen(open);
                    }}
                  >
                    <Button variant="outline" className="rounded-full">
                      Log In
                    </Button>
                  </AuthDialog>
                  <AuthDialog 
                    className="rounded-full"
                    asChild
                    showSignUp={true}
                    open={authDialogOpen && activeAuthTab === "signup"}
                    onOpenChange={(open) => {
                      if (open) setActiveAuthTab("signup");
                      setAuthDialogOpen(open);
                    }}
                  >
                    <Button className="rounded-full">
                      Sign Up
                    </Button>
                  </AuthDialog>
                </>
              )}
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass absolute top-full left-0 right-0 shadow-md animate-fade-in">
            <div className="container mx-auto px-6 py-4">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className={`block py-2 font-medium ${
                        location.pathname === link.path 
                          ? 'text-primary' 
                          : 'text-foreground/80'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col space-y-3 mt-6">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center py-2">
                      <User className="h-4 w-4 mr-2" />
                      <span>{user?.name}</span>
                    </div>
                    <Link to="/dashboard" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                    <Link to="/profile" className="block py-2" onClick={() => setMobileMenuOpen(false)}>
                      Profile
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start rounded-full" 
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <AuthDialog 
                      variant="outline" 
                      className="w-full rounded-full"
                      asChild
                      showSignUp={false}
                      open={authDialogOpen && activeAuthTab === "login"}
                      onOpenChange={(open) => {
                        if (open) {
                          setActiveAuthTab("login");
                          setMobileMenuOpen(false);
                        }
                        setAuthDialogOpen(open);
                      }}
                    >
                      <Button variant="outline" className="w-full rounded-full">
                        Log In
                      </Button>
                    </AuthDialog>
                    <AuthDialog 
                      className="w-full rounded-full"
                      asChild
                      showSignUp={true}
                      open={authDialogOpen && activeAuthTab === "signup"}
                      onOpenChange={(open) => {
                        if (open) {
                          setActiveAuthTab("signup");
                          setMobileMenuOpen(false);
                        }
                        setAuthDialogOpen(open);
                      }}
                    >
                      <Button className="w-full rounded-full">
                        Sign Up
                      </Button>
                    </AuthDialog>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
