
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minPayment: number;
}

type PayoffStrategy = 'avalanche' | 'snowball';

export default function DebtPayoffCalculator() {
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: '1', name: 'Credit Card', balance: 15000, interestRate: 18, minPayment: 500 },
    { id: '2', name: 'Car Loan', balance: 120000, interestRate: 9, minPayment: 3500 },
    { id: '3', name: 'Personal Loan', balance: 50000, interestRate: 15, minPayment: 2000 },
  ]);
  
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [strategy, setStrategy] = useState<PayoffStrategy>('avalanche');
  const [payoffResults, setPayoffResults] = useState<{
    totalMonths: number;
    totalInterest: number;
    payoffSchedule: Array<{month: number, remainingDebts: number, totalPaid: number}>;
  }>({
    totalMonths: 0,
    totalInterest: 0,
    payoffSchedule: []
  });

  const [newDebt, setNewDebt] = useState({
    name: '',
    balance: '',
    interestRate: '',
    minPayment: '',
  });

  const totalMinPayment = debts.reduce((sum, debt) => sum + debt.minPayment, 0);
  const totalBalance = debts.reduce((sum, debt) => sum + debt.balance, 0);

  const calculatePayoff = () => {
    // Clone debts to avoid modifying the original array
    let debtsCopy = JSON.parse(JSON.stringify(debts));
    const payment = parseFloat(monthlyPayment) || totalMinPayment;
    
    // Sort debts based on strategy
    if (strategy === 'avalanche') {
      // Sort by interest rate (highest first)
      debtsCopy.sort((a: DebtItem, b: DebtItem) => b.interestRate - a.interestRate);
    } else {
      // Sort by balance (lowest first)
      debtsCopy.sort((a: DebtItem, b: DebtItem) => a.balance - b.balance);
    }

    let month = 0;
    let totalInterestPaid = 0;
    let totalPaid = 0;
    let schedule = [];

    // Continue until all debts are paid off
    while (debtsCopy.some((debt: DebtItem) => debt.balance > 0)) {
      month++;
      let remainingPayment = payment;
      
      // Pay minimum on all debts
      for (let debt of debtsCopy) {
        if (debt.balance <= 0) continue;
        
        const interest = (debt.interestRate / 100 / 12) * debt.balance;
        totalInterestPaid += interest;
        debt.balance += interest;
        
        const minPayment = Math.min(debt.minPayment, debt.balance);
        debt.balance -= minPayment;
        remainingPayment -= minPayment;
        totalPaid += minPayment;
      }
      
      // Allocate remaining payment to highest priority debt
      for (let debt of debtsCopy) {
        if (debt.balance <= 0 || remainingPayment <= 0) continue;
        
        const extraPayment = Math.min(remainingPayment, debt.balance);
        debt.balance -= extraPayment;
        remainingPayment -= extraPayment;
        totalPaid += extraPayment;
        
        if (remainingPayment <= 0) break;
      }
      
      // Add to schedule every 6 months or for the final month
      if (month % 6 === 0 || !debtsCopy.some((debt: DebtItem) => debt.balance > 0)) {
        schedule.push({
          month,
          remainingDebts: debtsCopy.filter((debt: DebtItem) => debt.balance > 0).length,
          totalPaid
        });
      }
      
      // Safety check to prevent infinite loops
      if (month > 600) break; // 50 years max
    }

    setPayoffResults({
      totalMonths: month,
      totalInterest: totalInterestPaid,
      payoffSchedule: schedule
    });
  };

  const handleAddDebt = () => {
    const { name, balance, interestRate, minPayment } = newDebt;
    
    if (!name || !balance || !interestRate || !minPayment) return;
    
    const newDebtItem: DebtItem = {
      id: Date.now().toString(),
      name,
      balance: parseFloat(balance),
      interestRate: parseFloat(interestRate),
      minPayment: parseFloat(minPayment)
    };
    
    setDebts([...debts, newDebtItem]);
    setNewDebt({ name: '', balance: '', interestRate: '', minPayment: '' });
  };

  const handleDeleteDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  // Recalculate payoff whenever relevant inputs change
  useEffect(() => {
    if (debts.length > 0) {
      calculatePayoff();
    }
  }, [debts, monthlyPayment, strategy]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Debt Payoff Calculator
        </CardTitle>
        <CardDescription>Create a plan to pay off your debts and become debt-free</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Your Debts</h3>
              
              {debts.map((debt) => (
                <div key={debt.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{debt.name}</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeleteDebt(debt.id)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive/90"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground">Balance</div>
                      <div className="font-medium">R{debt.balance.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Interest</div>
                      <div className="font-medium">{debt.interestRate}%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Monthly</div>
                      <div className="font-medium">R{debt.minPayment.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="rounded-lg border border-dashed p-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="debt-name">Debt Name</Label>
                      <Input
                        id="debt-name"
                        placeholder="Credit Card, Car Loan, etc."
                        value={newDebt.name}
                        onChange={(e) => setNewDebt({...newDebt, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="debt-balance">Balance (R)</Label>
                      <Input
                        id="debt-balance"
                        type="number"
                        placeholder="10000"
                        value={newDebt.balance}
                        onChange={(e) => setNewDebt({...newDebt, balance: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interest-rate">Interest Rate (%)</Label>
                      <Input
                        id="interest-rate"
                        type="number"
                        placeholder="18"
                        value={newDebt.interestRate}
                        onChange={(e) => setNewDebt({...newDebt, interestRate: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="min-payment">Minimum Payment (R)</Label>
                      <Input
                        id="min-payment"
                        type="number"
                        placeholder="500"
                        value={newDebt.minPayment}
                        onChange={(e) => setNewDebt({...newDebt, minPayment: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddDebt} className="w-full">
                    <Plus className="mr-2 h-4 w-4" /> Add Debt
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-lg bg-primary/5 p-4">
              <h3 className="text-lg font-medium mb-4">Your Payoff Plan</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="monthly-payment">Monthly Payment (R)</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="monthly-payment"
                      type="number"
                      placeholder={`${totalMinPayment} (minimum)`}
                      value={monthlyPayment}
                      onChange={(e) => setMonthlyPayment(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Minimum required: R{totalMinPayment.toLocaleString()}</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="strategy">Payoff Strategy</Label>
                  <Select value={strategy} onValueChange={(value) => setStrategy(value as PayoffStrategy)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avalanche">Debt Avalanche (Highest Interest First)</SelectItem>
                      <SelectItem value="snowball">Debt Snowball (Lowest Balance First)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Debt Free In</span>
                  <span className="font-medium">
                    {Math.floor(payoffResults.totalMonths / 12)} years {payoffResults.totalMonths % 12} months
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Interest</span>
                  <span className="font-medium">
                    R{payoffResults.totalInterest.toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Payment</span>
                  <span className="font-medium">
                    R{(totalBalance + payoffResults.totalInterest).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{debts.length - payoffResults.payoffSchedule[payoffResults.payoffSchedule.length - 1]?.remainingDebts || 0} / {debts.length} debts paid</span>
                  </div>
                  <Progress 
                    value={(1 - (payoffResults.payoffSchedule[payoffResults.payoffSchedule.length - 1]?.remainingDebts || 0) / debts.length) * 100} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Note: This calculator assumes fixed interest rates and payment amounts. Actual results may vary based on changing rates and additional payments.
        </p>
      </CardFooter>
    </Card>
  );
}
