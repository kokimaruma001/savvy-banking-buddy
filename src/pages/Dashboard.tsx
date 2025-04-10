
import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import DashboardComponent from '../components/dashboard/Dashboard';
import { Toaster } from "@/components/ui/toaster";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-16 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-6 md:px-12">
          <DashboardComponent />
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
};

export default Dashboard;
