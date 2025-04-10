
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Receipt, Calendar, CreditCard, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Bill {
  id: string;
  payee: string;
  amount: number;
  dueDate: string;
  autoPay: boolean;
  status: 'pending' | 'paid' | 'overdue';
}

const MOCK_BILLS: Bill[] = [
  {
    id: "bill-001",
    payee: "Electric Company",
    amount: 124.56,
    dueDate: "2025-04-15",
    autoPay: false,
    status: 'pending'
  },
  {
    id: "bill-002",
    payee: "Internet Service",
    amount: 79.99,
    dueDate: "2025-04-18",
    autoPay: true,
    status: 'pending'
  },
  {
    id: "bill-003",
    payee: "Water Utility",
    amount: 45.30,
    dueDate: "2025-04-20",
    autoPay: false,
    status: 'pending'
  },
  {
    id: "bill-004",
    payee: "Cell Phone",
    amount: 95.00,
    dueDate: "2025-04-25",
    autoPay: true,
    status: 'pending'
  },
];

const MOCK_ACCOUNTS = [
  { id: "acc-001", name: "Checking Account", balance: 4582.21 },
  { id: "acc-002", name: "Savings Account", balance: 12750.55 },
];

export default function BillPayment() {
  const [bills, setBills] = useState<Bill[]>(MOCK_BILLS);
  const [selectedBills, setSelectedBills] = useState<string[]>([]);
  const [paymentAccount, setPaymentAccount] = useState("acc-001");
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  // Toggle bill selection
  const toggleBill = (billId: string) => {
    setSelectedBills(prev =>
      prev.includes(billId)
        ? prev.filter(id => id !== billId)
        : [...prev, billId]
    );
  };

  // Calculate total amount for selected bills
  const calculateTotalAmount = () => {
    return bills
      .filter(bill => selectedBills.includes(bill.id))
      .reduce((total, bill) => total + bill.amount, 0);
  };

  // Process bill payment
  const payBills = () => {
    if (selectedBills.length === 0) {
      toast({
        title: "No bills selected",
        description: "Please select at least one bill to pay",
        variant: "destructive"
      });
      return;
    }

    setProcessing(true);

    // In a real app, this would be an API call
    setTimeout(() => {
      // Update bills status
      const updatedBills = bills.map(bill =>
        selectedBills.includes(bill.id)
          ? { ...bill, status: 'paid' as const }
          : bill
      );
      setBills(updatedBills);
      
      // Show success message
      toast({
        title: "Payment successful",
        description: `${selectedBills.length} bill${selectedBills.length > 1 ? 's' : ''} paid successfully.`,
      });
      
      // Reset selection
      setSelectedBills([]);
      setProcessing(false);
    }, 1500);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };

  // Check if due date is approaching (within 3 days)
  const isDueSoon = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Bill Payment
        </CardTitle>
        <CardDescription>Manage and pay your bills</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <Label htmlFor="paymentAccount">Pay From</Label>
          <Select value={paymentAccount} onValueChange={setPaymentAccount}>
            <SelectTrigger id="paymentAccount">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_ACCOUNTS.map(account => (
                <SelectItem key={account.id} value={account.id}>
                  <div className="flex justify-between w-full">
                    <span>{account.name}</span>
                    <span className="text-muted-foreground">${account.balance.toFixed(2)}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border">
          <div className="p-4 bg-muted/50">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium">
              <div className="col-span-1"></div>
              <div className="col-span-4">Payee</div>
              <div className="col-span-3">Due Date</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">Status</div>
            </div>
          </div>

          <Separator />

          {bills.map(bill => (
            <div key={bill.id}>
              <div className={`p-4 grid grid-cols-12 gap-4 items-center ${
                bill.status === 'paid' 
                  ? 'bg-muted/20 text-muted-foreground'
                  : isDueSoon(bill.dueDate) && bill.status === 'pending'
                  ? 'bg-amber-50'
                  : ''
              }`}>
                <div className="col-span-1">
                  <Checkbox
                    checked={selectedBills.includes(bill.id)}
                    onCheckedChange={() => {
                      if (bill.status !== 'paid') {
                        toggleBill(bill.id);
                      }
                    }}
                    disabled={bill.status === 'paid'}
                  />
                </div>
                <div className="col-span-4">
                  <div className="font-medium">{bill.payee}</div>
                  {bill.autoPay && (
                    <div className="text-xs text-muted-foreground">
                      Auto-pay enabled
                    </div>
                  )}
                </div>
                <div className="col-span-3 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className={
                    isDueSoon(bill.dueDate) && bill.status === 'pending'
                      ? 'text-amber-600 font-medium'
                      : ''
                  }>
                    {formatDate(bill.dueDate)}
                    {isDueSoon(bill.dueDate) && bill.status === 'pending' && (
                      <span className="ml-1 text-xs font-semibold">Due soon</span>
                    )}
                  </span>
                </div>
                <div className="col-span-2 font-medium">
                  ${bill.amount.toFixed(2)}
                </div>
                <div className="col-span-2">
                  {bill.status === 'paid' ? (
                    <span className="inline-flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Paid
                    </span>
                  ) : bill.status === 'overdue' ? (
                    <span className="inline-flex items-center gap-1 text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Overdue
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Pending</span>
                  )}
                </div>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
        <div className="font-medium">
          Total Selected: ${calculateTotalAmount().toFixed(2)}
        </div>
        <Button 
          onClick={payBills}
          disabled={selectedBills.length === 0 || processing}
          className="gap-2"
        >
          <CreditCard className="h-4 w-4" />
          {processing ? "Processing..." : "Pay Selected Bills"}
        </Button>
      </CardFooter>
    </Card>
  );
}
