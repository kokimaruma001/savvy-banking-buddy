
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from "lucide-react";

export default function InvestmentCalculator() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000);
  const [years, setYears] = useState<number>(10);
  const [interestRate, setInterestRate] = useState<number>(10);
  const [chartData, setChartData] = useState<Array<{year: number, amount: number}>>([]);

  // Calculate investment growth
  useEffect(() => {
    const data = [];
    let totalAmount = principal;
    
    for (let year = 0; year <= years; year++) {
      data.push({
        year,
        amount: parseFloat(totalAmount.toFixed(2))
      });
      
      // Calculate growth for next year
      const yearlyContribution = monthlyContribution * 12;
      const interestAmount = (totalAmount + yearlyContribution / 2) * (interestRate / 100);
      totalAmount = totalAmount + yearlyContribution + interestAmount;
    }
    
    setChartData(data);
  }, [principal, monthlyContribution, years, interestRate]);

  // Calculate final amounts
  const finalAmount = chartData.length > 0 ? chartData[chartData.length - 1].amount : 0;
  const totalInvested = principal + (monthlyContribution * 12 * years);
  const interestEarned = finalAmount - totalInvested;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Investment Calculator
        </CardTitle>
        <CardDescription>Calculate the potential growth of your investments over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="initial-investment">Initial Investment</Label>
                <span className="text-sm text-muted-foreground">R{principal.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="initial-investment"
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  min={0}
                  step={1000}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                <span className="text-sm text-muted-foreground">R{monthlyContribution.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  id="monthly-contribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  min={0}
                  step={100}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="interest-rate">Annual Interest Rate (%)</Label>
                <span className="text-sm text-muted-foreground">{interestRate}%</span>
              </div>
              <Slider
                id="interest-rate"
                min={1}
                max={20}
                step={0.1}
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="time-period">Time Period (Years)</Label>
                <span className="text-sm text-muted-foreground">{years} years</span>
              </div>
              <Slider
                id="time-period"
                min={1}
                max={40}
                step={1}
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Card className="bg-primary/5">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Invested</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">R{totalInvested.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Interest Earned</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold text-green-600">R{interestEarned.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                </CardContent>
              </Card>
              
              <Card className="bg-primary/5">
                <CardHeader className="p-4">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Final Amount</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="text-2xl font-bold">R{finalAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="h-80 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} />
                <YAxis 
                  tickFormatter={(value) => `R${value.toLocaleString(undefined, {notation: 'compact', compactDisplay: 'short'})}`} 
                  label={{ value: 'Amount (R)', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip 
                  formatter={(value) => [`R${Number(value).toLocaleString()}`, 'Amount']} 
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  name="Investment Value" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          Note: This calculator provides estimations based on a constant interest rate and does not account for inflation or taxes.
        </p>
      </CardFooter>
    </Card>
  );
}
