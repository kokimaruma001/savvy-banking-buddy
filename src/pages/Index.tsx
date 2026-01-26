import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import GuidedPaths from '../components/home/GuidedPaths';
import TrustSection from '../components/home/TrustSection';
import ValuePreview from '../components/home/ValuePreview';
import Testimonials from '../components/home/Testimonials';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, PiggyBank, ShieldCheck, GraduationCap } from 'lucide-react';
import AuthDialog from '@/components/auth/AuthDialog';
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
        {/* Hero Section - Clear, trustworthy messaging */}
        <Hero />
        
        {/* Guided Paths - 3 clear starting options */}
        <div id="guided-paths">
          <GuidedPaths />
        </div>
        
        {/* Trust Section - Security and FAQ */}
        <TrustSection />
        
        {/* Value Preview - Demo questions and answers */}
        <ValuePreview />
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gradient-to-b from-background to-secondary/10 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Simple as 1-2-3
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Here's how Savvy helps you
              </h2>
              <p className="text-muted-foreground">
                No complicated setup. No bank login required. Just answers that make sense.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: <PiggyBank className="h-7 w-7 text-primary" />,
                  title: "Tell us what's on your mind",
                  description: "Ask any money question in plain English. Confused about a fee? Wondering where your money goes? Just ask."
                },
                {
                  icon: <ShieldCheck className="h-7 w-7 text-primary" />,
                  title: "Get a helpful answer",
                  description: "We explain things simply, without jargon. You'll understand what's happening with your money and why."
                },
                {
                  icon: <GraduationCap className="h-7 w-7 text-primary" />,
                  title: "Take action with confidence",
                  description: "Get personalized suggestions you can act on. Nothing happens without your say-so."
                }
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center relative"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm shadow-md">
                    {index + 1}
                  </div>
                  <div className="bg-card p-8 rounded-2xl border border-border/50 pt-10 h-full shadow-soft">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Final CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary/5 to-blue-400/10 relative">
          <div className="container mx-auto px-6 md:px-12">
            <div className="bg-card p-8 md:p-12 rounded-3xl max-w-3xl mx-auto text-center border border-border/50 shadow-soft">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to understand your money better?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of South Africans who've stopped guessing and started understanding. 
                It's free to get started.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <AuthDialog 
                  showSignUp={true}
                  asChild
                  open={showAuthDialog}
                  onOpenChange={setShowAuthDialog}
                >
                  <Button 
                    size="lg" 
                    className="rounded-full group px-8"
                  >
                    Get Started — It's Free
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </AuthDialog>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full"
                  onClick={() => setShowScheduleDialog(true)}
                >
                  Talk to a Human
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                {["No credit card needed", "Cancel anytime", "Your data stays private"].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Schedule Dialog */}
      <ScheduleDialog
        isOpen={showScheduleDialog}
        onClose={() => setShowScheduleDialog(false)}
      />
    </div>
  );
};

export default Index;
