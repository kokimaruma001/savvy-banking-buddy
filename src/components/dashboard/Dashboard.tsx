
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FinancialInsights from './FinancialInsights';
import BudgetTracker from './BudgetTracker';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Bell, DollarSign, TrendingUp, TrendingDown, PieChart, CreditCard, Plus } from 'lucide-react';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Unusual transaction detected in your checking account", time: "2 hours ago", isRead: false },
    { id: 2, message: "Budget limit reached for dining category", time: "Yesterday", isRead: false },
    { id: 3, message: "New financial tip available based on your spending", time: "2 days ago", isRead: true },
  ]);
  
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };
  
  const recentTransactions = [
    { id: 1, merchant: "Grocery Store", amount: -85.42, date: "Today", category: "Groceries", icon: <PieChart size={16} className="text-green-500" /> },
    { id: 2, merchant: "Netflix", amount: -14.99, date: "Yesterday", category: "Entertainment", icon: <CreditCard size={16} className="text-red-500" /> },
    { id: 3, merchant: "Salary Deposit", amount: 2750.00, date: "Jun 1", category: "Income", icon: <DollarSign size={16} className="text-blue-500" /> },
    { id: 4, merchant: "Restaurant", amount: -65.30, date: "May 29", category: "Dining", icon: <CreditCard size={16} className="text-orange-500" /> },
    { id: 5, merchant: "Electric Bill", amount: -98.45, date: "May 28", category: "Utilities", icon: <CreditCard size={16} className="text-purple-500" /> },
  ];

  return (
    <div className="w-full animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Your Financial Dashboard</h1>
      
      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: "Total Balance", value: "R16,520.42", change: "+2.5%", icon: <DollarSign className="text-primary" />, trend: "up" },
          { title: "Monthly Spending", value: "R2,340.15", change: "-4.3%", icon: <TrendingDown className="text-green-500" />, trend: "down" },
          { title: "Monthly Savings", value: "R1,200.00", change: "+10.5%", icon: <TrendingUp className="text-green-500" />, trend: "up" },
          { title: "Investment Value", value: "R8,425.87", change: "+1.8%", icon: <ArrowUpRight className="text-primary" />, trend: "up" }
        ].map((item, idx) => (
          <Card key={idx} className="glass overflow-hidden relative">
            <CardHeader className="pb-2">
              <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                {item.icon}
              </div>
              <CardTitle className="text-sm font-medium text-muted-foreground">{item.title}</CardTitle>
              <CardDescription className="text-2xl font-bold text-foreground">{item.value}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className={`text-xs font-medium ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  {item.trend === 'up' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                  {item.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Charts and Budget Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Financial Insights */}
        <Card className="lg:col-span-2 glass">
          <CardHeader>
            <CardTitle>Financial Insights</CardTitle>
            <CardDescription>Overview of your spending and income</CardDescription>
          </CardHeader>
          <CardContent>
            <FinancialInsights />
          </CardContent>
        </Card>
        
        {/* Notifications */}
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Recent alerts and updates</CardDescription>
            </div>
            <div className="relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {notifications.filter(n => !n.isRead).length}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No new notifications</p>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg border border-border ${notification.isRead ? 'bg-transparent' : 'bg-primary/5'} relative`}
                  >
                    <p className="text-sm pr-4">{notification.message}</p>
                    <span className="text-xs text-muted-foreground mt-1 block">{notification.time}</span>
                    {!notification.isRead && (
                      <button 
                        onClick={() => markAsRead(notification.id)}
                        className="absolute top-2 right-2 text-xs text-primary hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Budget and Transactions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Budget Tracker */}
        <Card className="lg:col-span-2 glass">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Budget Tracker</CardTitle>
                <CardDescription>Monitor your monthly budget by category</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                <Plus size={14} className="mr-1" /> 
                Add Budget
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <BudgetTracker />
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest financial activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{transaction.merchant}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date} • {transaction.category}</p>
                    </div>
                  </div>
                  <span className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : ''}`}>
                    {transaction.amount > 0 ? '+' : ''}R{Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </div>
              ))}
              
              <Button variant="outline" className="w-full text-xs">
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
