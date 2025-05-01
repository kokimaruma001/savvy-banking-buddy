
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
}

export default function BudgetCalculator() {
  const [items, setItems] = useState<BudgetItem[]>([
    { id: '1', name: 'Salary', amount: 35000, type: 'income' },
    { id: '2', name: 'Rent', amount: 12000, type: 'expense' },
    { id: '3', name: 'Groceries', amount: 5000, type: 'expense' },
    { id: '4', name: 'Utilities', amount: 2500, type: 'expense' },
  ]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');

  const addItem = () => {
    if (!name.trim() || !amount.trim() || isNaN(parseFloat(amount))) return;
    
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name: name.trim(),
      amount: parseFloat(amount),
      type
    };
    
    setItems([...items, newItem]);
    setName('');
    setAmount('');
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalIncome = items
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpenses = items
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Budget Calculator</CardTitle>
        <CardDescription>Track your income and expenses to calculate your monthly budget</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Income</div>
            <div className="text-2xl font-bold text-green-600">R{totalIncome.toFixed(2)}</div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Expenses</div>
            <div className="text-2xl font-bold text-red-600">R{totalExpenses.toFixed(2)}</div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg text-center">
            <div className="text-sm font-medium text-muted-foreground mb-1">Balance</div>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R{balance.toFixed(2)}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input 
              id="item-name" 
              placeholder="e.g., Salary, Rent, Groceries" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="amount">Amount (R)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                id="amount" 
                className="pl-10" 
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant={type === 'income' ? 'default' : 'outline'}
              onClick={() => setType('income')}
              className="flex-1"
            >
              <Plus className="mr-2 h-4 w-4" /> Income
            </Button>
            <Button 
              type="button" 
              variant={type === 'expense' ? 'default' : 'outline'} 
              onClick={() => setType('expense')}
              className="flex-1"
            >
              <Minus className="mr-2 h-4 w-4" /> Expense
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t pt-4">
        <Button onClick={addItem}>Add Item</Button>
      </CardFooter>
      
      <div className="px-6 pb-6">
        <div className="rounded-lg border overflow-hidden">
          <table className="min-w-full divide-y">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.type === 'income' ? 'Income' : 'Expense'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                    R{item.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <Button 
                      onClick={() => removeItem(item.id)} 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
