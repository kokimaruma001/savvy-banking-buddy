
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, PiggyBank, ShieldCheck, GraduationCap } from 'lucide-react';
import { AuthDialog } from '@/components/auth/AuthDialog';
import { useAuth } from '@/context/AuthContext';
import { ScheduleDialog } from '@/components/home/ScheduleDialog';

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-secondary/20 relative">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute right-[20%] bottom-[20%] w-[30%] h-[30%] rounded-full bg-blue-100/30 blur-3xl" />
          </div>
          
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Simple Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How <span className="text-gradient">Savvy</span> Works
              </h2>
              <p className="text-muted-foreground text-lg">
                Our platform makes financial management simple, secure, and effective with a streamlined approach.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <PiggyBank size={32} className="text-primary" />,
                  title: "Connect Your Accounts",
                  description: "Securely link your bank accounts and financial services to get a complete picture of your finances."
                },
                {
                  icon: <ShieldCheck size={32} className="text-primary" />,
                  title: "Get Personalized Insights",
                  description: "Our AI analyzes your financial data to provide tailored recommendations and detect patterns."
                },
                {
                  icon: <GraduationCap size={32} className="text-primary" />,
                  title: "Take Action and Learn",
                  description: "Implement recommendations, track your progress, and deepen your financial knowledge."
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center relative animate-fade-in"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-lg">
                    {index + 1}
                  </div>
                  <div className="glass p-8 rounded-xl shadow-soft pt-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2">
                      <ArrowRight size={30} className="text-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-400/10 relative">
          {/* Background Elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-[10%] top-[20%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute right-[10%] bottom-[10%] w-[20%] h-[20%] rounded-full bg-blue-100/20 blur-3xl" />
          </div>
          
          <div className="container mx-auto px-6 md:px-12">
            <div className="glass p-8 md:p-12 rounded-2xl max-w-4xl mx-auto text-center animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your <span className="text-gradient">Financial Future</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already experiencing the benefits of AI-powered financial guidance and education.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/20"
                  onClick={() => setShowAuthDialog(true)}
                >
                  <span className="absolute inset-0 bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform duration-300 ease-out"></span>
                  <span className="relative flex items-center">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full hover:bg-secondary/20 transition-all duration-300"
                  onClick={() => setShowScheduleDialog(true)}
                >
                  Schedule a Demo
                </Button>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
                {["No credit card required", "Free 30-day trial", "Cancel anytime"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Auth Dialog */}
      <AuthDialog 
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        defaultTab="signup"
      />
      
      {/* Schedule Dialog */}
      <ScheduleDialog
        isOpen={showScheduleDialog}
        onClose={() => setShowScheduleDialog(false)}
      />
    </div>
  );
};

export default Index;
