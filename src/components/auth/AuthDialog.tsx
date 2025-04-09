
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { useAuth } from '@/context/AuthContext';
import { toast } from "sonner";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "signup";
}

export function AuthDialog({ 
  isOpen, 
  onClose,
  defaultTab = "login" 
}: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const { isAuthenticated, login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Handle successful authentication and redirect user
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      const from = location.state?.from?.pathname || "/dashboard";
      toast.success("Authentication successful", {
        description: "You are now logged in"
      });
      
      // Close dialog and navigate
      onClose();
      navigate(from);
    }
  }, [isAuthenticated, isOpen, navigate, onClose, location]);

  const handleLoginSuccess = async (formData: { email: string, password: string }) => {
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignupSuccess = async (formData: { name: string, email: string, password: string }) => {
    try {
      await signup(formData.name, formData.email, formData.password);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {activeTab === "login" ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login" 
              ? "Enter your credentials to access your account"
              : "Fill in the details below to create your account"}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-4">
            <LoginForm onSuccess={handleLoginSuccess} />
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <SignUpForm onSuccess={handleSignupSuccess} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
