import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, TrendingDown, AlertTriangle, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthDialog from '../auth/AuthDialog';

const ValuePreview = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);

  const demoQuestions = [
    {
      question: "Why am I always broke by month-end?",
      insight: "Based on typical spending patterns, most people lose money to: forgotten subscriptions (R89/month average), bank fees they could avoid (R45/month), and small daily purchases that add up.",
      icon: <TrendingDown className="h-5 w-5 text-amber-500" />,
      result: "We'll help you spot these patterns in your own spending."
    },
    {
      question: "What's this 'service fee' on my statement?",
      insight: "Monthly service fees are what banks charge for maintaining your account. They typically range from R5 to R150 depending on your account type.",
      icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
      result: "We explain every fee in plain English — no more confusion."
    },
    {
      question: "Am I being charged too much?",
      insight: "Many South Africans pay for premium accounts when a basic account would save them R50-100/month. It depends on how you actually use your account.",
      icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
      result: "We'll compare your fees to what makes sense for you."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              See it in action
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Questions we help you answer
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Here's a taste of how we turn financial confusion into clarity. No jargon, just helpful answers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Demo Questions */}
            <div className="space-y-4">
              {demoQuestions.map((demo, index) => (
                <button
                  key={index}
                  onClick={() => setActiveDemo(index)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                    activeDemo === index 
                      ? 'bg-primary/10 border-primary/30 shadow-md' 
                      : 'bg-card border-border/50 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${activeDemo === index ? 'bg-primary/20' : 'bg-secondary'}`}>
                      {demo.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{demo.question}</p>
                      {activeDemo === index && (
                        <motion.p 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="text-sm text-primary mt-2"
                        >
                          Click to see the answer →
                        </motion.p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Answer Preview */}
            <motion.div 
              key={activeDemo}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl border border-border/50 p-6 shadow-soft"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Savvy's answer
              </div>
              
              <p className="text-foreground leading-relaxed mb-4">
                {demoQuestions[activeDemo].insight}
              </p>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {demoQuestions[activeDemo].result}
                  </p>
                </div>
              </div>

              <Button 
                onClick={() => setShowAuthDialog(true)}
                className="w-full rounded-xl group"
              >
                Ask your own question — it's free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Helping South Africans understand their money better every day
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">10,000+</p>
                <p className="text-xs text-muted-foreground">Questions answered</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">R150</p>
                <p className="text-xs text-muted-foreground">Avg. monthly savings found</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">4.8/5</p>
                <p className="text-xs text-muted-foreground">User satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthDialog 
        showSignUp={true}
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
      />
    </section>
  );
};

export default ValuePreview;
