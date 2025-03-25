
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-16 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[80%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[50%] -left-[5%] w-[40%] h-[60%] rounded-full bg-blue-300/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Hero Text Content */}
          <div className="max-w-lg">
            <span className="inline-block animate-fade-in px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              AI-Powered Financial Freedom
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Your Intelligent
              <span className="text-gradient"> Financial </span>
              Assistant
            </h1>
            <p className="text-muted-foreground text-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Personalized financial coaching, automated budgeting, fraud detection, and gamified learning - all in one elegant platform designed for your success.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button size="lg" className="rounded-full group">
                Get Started
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                How It Works
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <p className="text-sm text-muted-foreground mb-4">Trusted by thousands of users worldwide</p>
              <div className="flex items-center space-x-6">
                <img src="https://via.placeholder.com/80x30?text=Logo1" alt="Partner logo" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/80x30?text=Logo2" alt="Partner logo" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://via.placeholder.com/80x30?text=Logo3" alt="Partner logo" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          
          {/* Hero Image/Illustration */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-400/20 rounded-full blur-3xl opacity-70"></div>
              <div className="relative glass rounded-2xl overflow-hidden shadow-soft border border-white/20 h-full w-full animate-float">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-blue-600"></div>
                
                {/* Mock dashboard UI */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold">Financial Overview</h3>
                    <p className="text-sm text-muted-foreground">Your accounts are performing well</p>
                  </div>
                  
                  {/* Balance Card */}
                  <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-primary to-blue-600 text-white">
                    <p className="text-sm font-medium opacity-80">Total Balance</p>
                    <h4 className="text-2xl font-bold my-2">$12,345.67</h4>
                    <div className="flex justify-between text-xs opacity-80">
                      <span>+2.4% from last month</span>
                      <span>Updated just now</span>
                    </div>
                  </div>
                  
                  {/* Account Cards */}
                  <div className="space-y-3">
                    {[
                      { name: 'Checking Account', balance: '$4,250.00', color: 'bg-blue-100' },
                      { name: 'Savings Account', balance: '$8,095.67', color: 'bg-green-100' },
                      { name: 'Investment Account', balance: '$5,621.33', color: 'bg-purple-100' }
                    ].map((account, idx) => (
                      <div key={idx} className={`p-3 rounded-lg flex justify-between items-center ${account.color}`}>
                        <div>
                          <p className="font-medium text-sm">{account.name}</p>
                          <p className="text-xs text-muted-foreground">**** 4567</p>
                        </div>
                        <span className="font-semibold">{account.balance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-10 -right-10 glass p-4 rounded-lg shadow-soft animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Fraud Protection</p>
                  <p className="text-xs text-muted-foreground">Always active</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-5 -left-5 glass p-4 rounded-lg shadow-soft animate-float" style={{ animationDelay: '0.7s' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                <div>
                  <p className="text-sm font-medium">Smart Insights</p>
                  <p className="text-xs text-muted-foreground">AI-powered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
