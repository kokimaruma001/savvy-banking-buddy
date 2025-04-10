
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Bank, Link, Shield, Trash2, CheckCircle, AlertTriangle } from "lucide-react";

// Define form schema for connecting a bank account
const bankFormSchema = z.object({
  bankName: z.string().min(2, { message: "Bank name is required" }),
  accountNumber: z.string()
    .min(8, { message: "Account number must be at least 8 digits" })
    .max(17, { message: "Account number cannot exceed 17 characters" })
    .refine((val) => /^[0-9]+$/.test(val), { message: "Account number must only contain digits" }),
  routingNumber: z.string()
    .min(9, { message: "Routing number must be 9 digits" })
    .max(9, { message: "Routing number must be 9 digits" })
    .refine((val) => /^[0-9]+$/.test(val), { message: "Routing number must only contain digits" }),
  accountType: z.enum(["checking", "savings"], {
    required_error: "You need to select an account type",
  }),
});

type BankFormValues = z.infer<typeof bankFormSchema>;

type BankAccount = {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: "checking" | "savings";
  isVerified: boolean;
  isPrimary: boolean;
};

const BankConnection = () => {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankName: "Chase Bank",
      accountNumber: "****5678",
      accountType: "checking",
      isVerified: true,
      isPrimary: true,
    }
  ]);
  
  const [showBankForm, setShowBankForm] = useState(false);
  const { toast } = useToast();

  const form = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      routingNumber: "",
      accountType: "checking",
    },
  });

  const onSubmit = (data: BankFormValues) => {
    // In a real app, we would make a secure API call to verify the bank account
    // For demo purposes, we'll simulate a successful connection
    
    const lastFour = data.accountNumber.slice(-4);
    const maskedAccountNumber = `****${lastFour}`;
    
    const newBankAccount: BankAccount = {
      id: Date.now().toString(),
      bankName: data.bankName,
      accountNumber: maskedAccountNumber,
      accountType: data.accountType,
      isVerified: false, // Initially unverified
      isPrimary: bankAccounts.length === 0, // Make primary if it's the first account
    };
    
    setBankAccounts([...bankAccounts, newBankAccount]);
    setShowBankForm(false);
    form.reset();
    
    // Simulate verification process
    toast({
      title: "Bank Account Added",
      description: "We're verifying your bank account. This may take 1-2 business days.",
    });
    
    // Simulate verification completion after 3 seconds
    setTimeout(() => {
      setBankAccounts(prev => 
        prev.map(account => 
          account.id === newBankAccount.id 
            ? { ...account, isVerified: true } 
            : account
        )
      );
      
      toast({
        title: "Bank Account Verified",
        description: `Your ${data.bankName} account has been verified successfully.`,
      });
    }, 3000);
  };

  const removeBankAccount = (id: string) => {
    const accountToRemove = bankAccounts.find(account => account.id === id);
    
    if (accountToRemove?.isPrimary) {
      toast({
        title: "Cannot Remove Primary Account",
        description: "Please set another account as primary before removing this one.",
        variant: "destructive",
      });
      return;
    }
    
    const updatedAccounts = bankAccounts.filter(account => account.id !== id);
    setBankAccounts(updatedAccounts);
    
    toast({
      title: "Bank Account Removed",
      description: "Your bank account has been removed successfully.",
    });
  };

  const setPrimaryAccount = (id: string) => {
    const updatedAccounts = bankAccounts.map(account => ({
      ...account,
      isPrimary: account.id === id
    }));
    setBankAccounts(updatedAccounts);
    
    toast({
      title: "Primary Account Updated",
      description: "Your primary bank account has been updated.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Connected Bank Accounts</h2>
        <Dialog open={showBankForm} onOpenChange={setShowBankForm}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Link className="h-4 w-4" />
              Connect Bank
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect a Bank Account</DialogTitle>
              <DialogDescription>
                Enter your bank account details to connect it to your profile. This information is encrypted and secure.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-800 rounded-md mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <p className="text-sm">In a real app, we would use a secure third-party service like Plaid for bank connections.</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Chase, Bank of America, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Type</FormLabel>
                      <div className="flex gap-4">
                        <label className={`flex items-center gap-2 border rounded-md p-3 cursor-pointer transition-all ${field.value === "checking" ? 'border-primary bg-primary/5' : 'border-input'}`}>
                          <input
                            type="radio"
                            value="checking"
                            checked={field.value === "checking"}
                            onChange={() => form.setValue("accountType", "checking")}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border ${field.value === "checking" ? 'bg-primary border-primary' : 'border-input'}`}>
                            {field.value === "checking" && (
                              <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                            )}
                          </div>
                          <span>Checking</span>
                        </label>
                        <label className={`flex items-center gap-2 border rounded-md p-3 cursor-pointer transition-all ${field.value === "savings" ? 'border-primary bg-primary/5' : 'border-input'}`}>
                          <input
                            type="radio"
                            value="savings"
                            checked={field.value === "savings"}
                            onChange={() => form.setValue("accountType", "savings")}
                            className="sr-only"
                          />
                          <div className={`w-4 h-4 rounded-full border ${field.value === "savings" ? 'bg-primary border-primary' : 'border-input'}`}>
                            {field.value === "savings" && (
                              <div className="w-2 h-2 bg-white rounded-full m-1"></div>
                            )}
                          </div>
                          <span>Savings</span>
                        </label>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input placeholder="12345678" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="routingNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Routing Number</FormLabel>
                      <FormControl>
                        <Input placeholder="123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center gap-2 p-3 bg-green-50 text-green-800 rounded-md">
                  <Shield className="h-5 w-5 text-green-500" />
                  <p className="text-sm">Your information is encrypted and secure. We never store your full account details.</p>
                </div>
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => {
                    setShowBankForm(false);
                    form.reset();
                  }}>
                    Cancel
                  </Button>
                  <Button type="submit">Connect Account</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {bankAccounts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Bank className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No Bank Accounts Connected</h3>
            <p className="text-muted-foreground text-center mb-4">
              Connect your bank account to enable fund transfers and bill payments.
            </p>
            <Button onClick={() => setShowBankForm(true)}>
              <Link className="h-4 w-4 mr-2" />
              Connect Your First Bank Account
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bankAccounts.map((account) => (
            <Card key={account.id} className={`transition-all ${account.isPrimary ? 'border-primary' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bank className="h-5 w-5" />
                    {account.bankName} - {account.accountType.charAt(0).toUpperCase() + account.accountType.slice(1)}
                    {account.isPrimary && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {!account.isPrimary && account.isVerified && (
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => setPrimaryAccount(account.id)}
                      >
                        Set as Primary
                      </Button>
                    )}
                    <Button 
                      size="icon" 
                      variant="ghost"
                      onClick={() => removeBankAccount(account.id)}
                      disabled={account.isPrimary}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="flex items-center gap-2">
                  Account {account.accountNumber}
                  {account.isVerified ? (
                    <span className="flex items-center text-xs text-green-600">
                      <CheckCircle className="h-3 w-3 mr-1" /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-amber-600">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Verification Pending
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BankConnection;
