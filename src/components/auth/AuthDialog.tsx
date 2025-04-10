
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showSignUp?: boolean;
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

export default function AuthDialog({
  variant = "default",
  size = "default",
  showSignUp = true,
  className,
  children,
  asChild = false,
}: AuthDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">(
    showSignUp ? "signup" : "login"
  );
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLoginSuccess = () => {
    setOpen(false);
    navigate(from);
    toast({
      title: "Welcome back!",
      description: "You have successfully logged in.",
    });
  };

  const handleSignupSuccess = () => {
    setOpen(false);
    navigate(from);
    toast({
      title: "Account created!",
      description: "Your account has been created successfully.",
    });
  };

  // Fix type error by setting proper function signature
  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      await login(formData.email, formData.password);
      handleLoginSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
    }
  };

  // Fix type error by setting proper function signature
  const handleSignup = async (formData: { name: string; email: string; password: string }) => {
    try {
      await signup(formData.name, formData.email, formData.password);
      handleSignupSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>
        <Button variant={variant} size={size} className={className}>
          {children || "Sign In / Sign Up"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs
          defaultValue={activeTab}
          className="w-full"
          onValueChange={(value) => setActiveTab(value as "login" | "signup")}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onSuccess={handleLogin} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUpForm onSuccess={handleSignup} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
