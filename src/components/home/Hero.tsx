import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Shield, Clock, ChevronDown } from 'lucide-react';
import AuthDialog from '../auth/AuthDialog';

const Hero = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const scrollToGuidedPaths = () => {
    const section = document.getElementById('guided-paths');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <section className="min-h-[90vh] pt-28 pb-16 overflow-hidden relative flex items-center">
      {/* Softer Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-[50%] -left-[5%] w-[35%] h-[50%] rounded-full bg-blue-200/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trust Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-8"
          >
            <Shield className="h-4 w-4" />
            Your money stays in your control — always
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
          >
            Understand your money.
            <span className="block text-gradient mt-2">In plain English.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
          >
            Stop wondering where your money goes. Get friendly, jargon-free advice 
            that actually makes sense — whether you're saving, budgeting, or just trying to understand your bank fees.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <AuthDialog 
              showSignUp={true}
              asChild
              open={showAuthDialog}
              onOpenChange={setShowAuthDialog}
            >
              <Button 
                size="lg" 
                className="rounded-full group text-base px-8 py-6 shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Ask a Money Question
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </AuthDialog>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full text-base px-8 py-6"
              onClick={scrollToHowItWorks}
            >
              How it works
            </Button>
          </motion.div>

          {/* Reassurance Microcopy */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground mb-12"
          >
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Takes under a minute
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              No bank login required
            </span>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={scrollToGuidedPaths}
            className="inline-flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-sm mb-2">Not sure where to start?</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
