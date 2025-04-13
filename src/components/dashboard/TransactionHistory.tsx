
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  status: 'completed' | 'pending' | 'failed';
}

interface TransactionHistoryProps {
  isNewUser?: boolean;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-001",
    date: "2025-04-10",
    description: "Deposit from Salary",
    amount: 2500,
    type: "deposit",
    status: "completed"
  },
  {
    id: "tx-002",
    date: "2025-04-09",
    description: "Grocery Store",
    amount: -120.45,
    type: "withdrawal",
    status: "completed"
  },
  {
    id: "tx-003",
    date: "2025-04-07",
    description: "Transfer to Savings",
    amount: -400,
    type: "transfer",
    status: "completed"
  },
  {
    id: "tx-004",
    date: "2025-04-06",
    description: "Netflix Subscription",
    amount: -14.99,
    type: "withdrawal",
    status: "completed"
  },
  {
    id: "tx-005",
    date: "2025-04-05",
    description: "Restaurant Payment",
    amount: -85.30,
    type: "withdrawal",
    status: "completed"
  },
  {
    id: "tx-006",
    date: "2025-04-03",
    description: "Refund - Online Store",
    amount: 29.99,
    type: "deposit",
    status: "completed"
  },
  {
    id: "tx-007",
    date: "2025-04-01",
    description: "Pending Transfer",
    amount: -250,
    type: "transfer",
    status: "pending"
  }
];

export default function TransactionHistory({ isNewUser = false }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(isNewUser ? [] : MOCK_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const { toast } = useToast();

  // Fetch transactions (simulated)
  const fetchTransactions = () => {
    toast({
      title: "Refreshing transactions",
      description: "Getting your latest transaction data...",
    });
    
    // In a real app, this would be an API call
    // Simulating API call delay
    setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      toast({
        title: "Transactions updated",
        description: "Your transaction history is now up to date.",
      });
    }, 1000);
  };

  // Filter transactions based on search query and tab
  const filteredTransactions = transactions.filter(transaction => {
    return transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Sort transactions by date
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortDirection === 'desc' ? dateB - dateA : dateA - dateB;
  });

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
  };

  if (isNewUser) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Start your financial journey by making your first transaction</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-center space-y-6">
            <div className="p-6 rounded-full bg-primary/10 mx-auto">
              <PlusCircle className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-medium">No Transactions Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Your transaction history will appear here once you start making deposits, 
                withdrawals, or transfers.
              </p>
            </div>
            <div className="space-x-4">
              <Button variant="default" onClick={() => fetchTransactions()}>
                View Demo Transactions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View your recent account activity</CardDescription>
          </div>
          <Button variant="outline" onClick={fetchTransactions}>
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSortDirection}
            className="ml-2"
          >
            <ArrowUpDown className="h-4 w-4 mr-1" />
            {sortDirection === 'desc' ? 'Newest first' : 'Oldest first'}
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className={`font-medium ${transaction.amount < 0 ? 'text-destructive' : 'text-green-600'}`}>
                      {transaction.amount < 0 ? '-' : '+'}R{Math.abs(transaction.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === 'completed'
                            ? 'outline'
                            : transaction.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
