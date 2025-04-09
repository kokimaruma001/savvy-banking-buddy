
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Edit2, AlertCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const BudgetTracker = () => {
  const [budgetCategories, setBudgetCategories] = useState([
    { 
      id: 1, 
      name: "Housing", 
      current: 1200, 
      limit: 1500, 
      percentage: (1200 / 1500) * 100,
      color: "bg-blue-500" 
    },
    { 
      id: 2, 
      name: "Food & Groceries", 
      current: 650, 
      limit: 700, 
      percentage: (650 / 700) * 100,
      color: "bg-green-500" 
    },
    { 
      id: 3, 
      name: "Transportation", 
      current: 310, 
      limit: 400, 
      percentage: (310 / 400) * 100,
      color: "bg-yellow-500" 
    },
    { 
      id: 4, 
      name: "Entertainment", 
      current: 280, 
      limit: 250, 
      percentage: (280 / 250) * 100,
      color: "bg-purple-500" 
    },
    { 
      id: 5, 
      name: "Utilities", 
      current: 190, 
      limit: 300, 
      percentage: (190 / 300) * 100,
      color: "bg-pink-500" 
    },
    { 
      id: 6, 
      name: "Shopping", 
      current: 410, 
      limit: 350, 
      percentage: (410 / 350) * 100,
      color: "bg-red-500" 
    }
  ]);

  const handleEditBudget = (id: number) => {
    toast.info("Edit budget", { 
      description: `Editing budget for ${budgetCategories.find(cat => cat.id === id)?.name}` 
    });
  };

  const handleAddBudget = () => {
    toast.info("Add new budget category", { 
      description: "Feature coming soon" 
    });
  };

  return (
    <div className="space-y-5">
      {budgetCategories.map((category) => (
        <div key={category.id} className="space-y-2 hover:bg-secondary/5 p-2 rounded-lg transition-colors duration-150">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${category.color} mr-2`}></div>
              <span className="font-medium text-sm">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className={`text-sm font-medium ${category.current > category.limit ? 'text-red-500' : 'text-foreground'}`}>
                  R{category.current.toLocaleString()} 
                  <span className="text-muted-foreground"> / R{category.limit.toLocaleString()}</span>
                </span>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleEditBudget(category.id)}
                    >
                      <Edit2 size={12} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit budget</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="relative">
            <Progress 
              value={Math.min(category.percentage, 100)} 
              className={`h-2 ${category.current > category.limit ? 'bg-red-200' : 'bg-gray-200'}`}
            />
            <div 
              className={`absolute top-0 h-2 rounded-full ${category.color}`} 
              style={{ 
                width: `${Math.min(category.percentage, 100)}%`,
                opacity: category.current > category.limit ? '0.7' : '1'
              }}
            ></div>
          </div>
          
          {category.current > category.limit && (
            <div className="flex items-center gap-1 text-xs text-red-500">
              <AlertCircle size={12} />
              <p>You've exceeded your budget by R{(category.current - category.limit).toLocaleString()}</p>
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold flex items-center gap-1">
            Total Budget
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info size={14} className="text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">Total budget shows your overall spending across all categories compared to your total monthly budget limit.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <div>
            <span className="text-foreground font-medium">R3,040</span>
            <span className="text-muted-foreground"> / R3,500</span>
          </div>
        </div>
        <Progress value={(3040 / 3500) * 100} className="h-2 bg-gray-200" />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>87% of monthly budget used</span>
          <span>R460 remaining</span>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button variant="outline" size="sm" className="text-xs" onClick={handleAddBudget}>
            Add New Category
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
