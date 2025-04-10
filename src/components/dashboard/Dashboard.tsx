
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BudgetTracker from './BudgetTracker';
import FinancialInsights from './FinancialInsights';
import TransactionHistory from './TransactionHistory';
import FundsTransfer from './FundsTransfer';
import BillPayment from './BillPayment';
import AccountSettings from './AccountSettings';
import CardManagement from './CardManagement';
import BankConnection from './BankConnection';
import { useAuth } from "@/context/AuthContext";
import { CreditCard, History, ArrowRightLeft, Receipt, Settings, Building, Link } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">
          Here's an overview of your finances and banking options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BudgetTracker />
        <FinancialInsights />
      </div>

      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-7 w-full mb-8">
          <TabsTrigger value="transactions" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span className="hidden md:inline">Transactions</span>
            <span className="md:hidden">History</span>
          </TabsTrigger>
          <TabsTrigger value="transfer" className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            <span className="hidden md:inline">Transfer</span>
            <span className="md:hidden">Send</span>
          </TabsTrigger>
          <TabsTrigger value="bills" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            <span className="hidden md:inline">Pay Bills</span>
            <span className="md:hidden">Bills</span>
          </TabsTrigger>
          <TabsTrigger value="cards" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Cards</span>
            <span className="md:hidden">Cards</span>
          </TabsTrigger>
          <TabsTrigger value="banks" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span className="hidden md:inline">Bank Accounts</span>
            <span className="md:hidden">Banks</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
            <span className="md:hidden">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <TransactionHistory />
        </TabsContent>
        
        <TabsContent value="transfer">
          <FundsTransfer />
        </TabsContent>
        
        <TabsContent value="bills">
          <BillPayment />
        </TabsContent>
        
        <TabsContent value="cards">
          <CardManagement />
        </TabsContent>
        
        <TabsContent value="banks">
          <BankConnection />
        </TabsContent>
        
        <TabsContent value="settings">
          <AccountSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
