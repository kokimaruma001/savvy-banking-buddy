
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { ArrowRightLeft, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MOCK_ACCOUNTS = [
  { id: "acc-001", name: "Checking Account", balance: 4582.21 },
  { id: "acc-002", name: "Savings Account", balance: 12750.55 },
  { id: "acc-003", name: "Investment Account", balance: 8455.98 },
];

export default function FundsTransfer() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  // Validate the transfer form
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!fromAccount) {
      newErrors.fromAccount = "Please select a source account";
    }
    
    if (!toAccount) {
      newErrors.toAccount = "Please select a destination account";
    } else if (fromAccount === toAccount) {
      newErrors.toAccount = "Cannot transfer to the same account";
    }
    
    if (!amount) {
      newErrors.amount = "Please enter an amount";
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        newErrors.amount = "Please enter a valid amount";
      } else if (numAmount <= 0) {
        newErrors.amount = "Amount must be greater than zero";
      } else {
        // Check if there are sufficient funds
        const sourceAccount = MOCK_ACCOUNTS.find(acc => acc.id === fromAccount);
        if (sourceAccount && numAmount > sourceAccount.balance) {
          newErrors.amount = "Insufficient funds";
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Get account details by ID
  const getAccountById = (id: string) => {
    return MOCK_ACCOUNTS.find(acc => acc.id === id);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Open confirmation dialog
      setShowConfirmation(true);
    }
  };

  // Process the transfer
  const processTransfer = () => {
    setIsProcessing(true);
    
    // In a real app, this would be an API call
    // Simulating API call delay
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmation(false);
      
      // Show success notification
      toast({
        title: "Transfer successful",
        description: `$${amount} has been transferred successfully.`,
      });
      
      // Reset form
      setFromAccount("");
      setToAccount("");
      setAmount("");
      setNote("");
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transfer Funds</CardTitle>
        <CardDescription>Move money between your accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fromAccount">From Account</Label>
            <Select 
              value={fromAccount} 
              onValueChange={setFromAccount}
            >
              <SelectTrigger id="fromAccount" className={errors.fromAccount ? "border-destructive" : ""}>
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_ACCOUNTS.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex justify-between w-full">
                      <span>{account.name}</span>
                      <span className="text-muted-foreground">${account.balance.toFixed(2)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.fromAccount && <p className="text-sm text-destructive">{errors.fromAccount}</p>}
          </div>
          
          <div className="flex justify-center">
            <ArrowRightLeft className="text-primary" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="toAccount">To Account</Label>
            <Select 
              value={toAccount} 
              onValueChange={setToAccount}
            >
              <SelectTrigger id="toAccount" className={errors.toAccount ? "border-destructive" : ""}>
                <SelectValue placeholder="Select destination account" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_ACCOUNTS.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    <div className="flex justify-between w-full">
                      <span>{account.name}</span>
                      <span className="text-muted-foreground">${account.balance.toFixed(2)}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.toAccount && <p className="text-sm text-destructive">{errors.toAccount}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5">$</span>
              <Input
                id="amount"
                type="text"
                placeholder="0.00"
                className={`pl-7 ${errors.amount ? "border-destructive" : ""}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="Add a note for this transfer"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">Continue</Button>
        </form>
      </CardContent>
      
      {/* Transfer Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              Please review the transfer details below
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4 py-2 border-b">
              <div className="text-muted-foreground">From</div>
              <div className="font-medium">
                {getAccountById(fromAccount)?.name}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-2 border-b">
              <div className="text-muted-foreground">To</div>
              <div className="font-medium">
                {getAccountById(toAccount)?.name}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-2 border-b">
              <div className="text-muted-foreground">Amount</div>
              <div className="font-medium">${parseFloat(amount || "0").toFixed(2)}</div>
            </div>
            
            {note && (
              <div className="grid grid-cols-2 gap-4 py-2 border-b">
                <div className="text-muted-foreground">Note</div>
                <div className="font-medium">{note}</div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={processTransfer}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Confirm Transfer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
