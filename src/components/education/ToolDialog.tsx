
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BudgetCalculator from './tools/BudgetCalculator';
import InvestmentCalculator from './tools/InvestmentCalculator';
import DebtPayoffCalculator from './tools/DebtPayoffCalculator';

interface ToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
  toolId: number | null;
}

const ToolDialog = ({ isOpen, onClose, toolId }: ToolDialogProps) => {
  const getToolTitle = () => {
    switch (toolId) {
      case 1:
        return "Budget Calculator";
      case 2:
        return "Investment Calculator";
      case 3:
        return "Debt Payoff Calculator";
      default:
        return "Financial Tool";
    }
  };

  const getToolDescription = () => {
    switch (toolId) {
      case 1:
        return "Calculate your monthly budget and track your spending";
      case 2:
        return "Estimate the potential growth of your investments";
      case 3:
        return "Plan your debt payoff strategy";
      default:
        return "";
    }
  };

  const renderTool = () => {
    switch (toolId) {
      case 1:
        return <BudgetCalculator />;
      case 2:
        return <InvestmentCalculator />;
      case 3:
        return <DebtPayoffCalculator />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>{getToolTitle()}</DialogTitle>
          <DialogDescription>{getToolDescription()}</DialogDescription>
        </DialogHeader>
        {renderTool()}
      </DialogContent>
    </Dialog>
  );
};

export default ToolDialog;
