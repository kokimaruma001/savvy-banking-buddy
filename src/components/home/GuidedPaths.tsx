import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiggyBank, HelpCircle, Calculator, ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AuthDialog from '../auth/AuthDialog';

interface PathStep {
  title: string;
  description: string;
  tip?: string;
}

interface GuidedPath {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  steps: PathStep[];
}

const GuidedPaths = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const paths: GuidedPath[] = [
    {
      id: 'save',
      icon: <PiggyBank className="h-8 w-8" />,
      title: "I want to save money",
      subtitle: "Find out where your money goes",
      color: "bg-green-500",
      steps: [
        {
          title: "Let's see where your money goes",
          description: "We'll look at your spending patterns and find opportunities you might have missed. Most people find R200-500 they didn't know they were losing.",
          tip: "This takes under a minute"
        },
        {
          title: "Spot the easy wins",
          description: "We'll highlight subscriptions you forgot about, fees you can avoid, and smarter alternatives. No judgment — just helpful insights.",
          tip: "You can change this later"
        },
        {
          title: "Set a simple goal",
          description: "Whether it's R500 or R5,000, we'll help you get there step by step. Small changes add up to big results.",
          tip: "Nothing happens without your permission"
        }
      ]
    },
    {
      id: 'fees',
      icon: <HelpCircle className="h-8 w-8" />,
      title: "I'm confused about bank fees",
      subtitle: "Understand what you're being charged",
      color: "bg-blue-500",
      steps: [
        {
          title: "Let's decode your bank statement",
          description: "Bank fees can be confusing. We'll translate the jargon into plain English so you know exactly what you're paying for.",
          tip: "This takes under a minute"
        },
        {
          title: "See if you're overpaying",
          description: "We'll compare your fees to what others pay and show you which ones might be avoidable. No pressure — just information.",
          tip: "Many people save R50-200/month just by understanding their fees"
        },
        {
          title: "Get personalized suggestions",
          description: "Based on how you actually use your account, we'll suggest ways to reduce unnecessary charges.",
          tip: "You're always in control"
        }
      ]
    },
    {
      id: 'budget',
      icon: <Calculator className="h-8 w-8" />,
      title: "Help me budget",
      subtitle: "Create a plan that actually works",
      color: "bg-purple-500",
      steps: [
        {
          title: "Start with what you know",
          description: "Tell us about your income and must-pay expenses. We'll work with your reality, not some ideal scenario.",
          tip: "Be honest — this is just for you"
        },
        {
          title: "Find your spending style",
          description: "Everyone manages money differently. We'll suggest a budget approach that fits how you actually live, not how you 'should' live.",
          tip: "You can adjust everything later"
        },
        {
          title: "Build in some flexibility",
          description: "Life happens. We'll help you create a budget with room to breathe, so you don't give up after the first unexpected expense.",
          tip: "A flexible budget beats a perfect one"
        }
      ]
    }
  ];

  const selectedPathData = paths.find(p => p.id === selectedPath);
  const progress = selectedPathData ? ((currentStep + 1) / selectedPathData.steps.length) * 100 : 0;

  const handleNextStep = () => {
    if (selectedPathData && currentStep < selectedPathData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowAuthDialog(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setSelectedPath(null);
      setCurrentStep(0);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Start here
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              What would help you most right now?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pick the one that feels right. We'll guide you through it step by step — no overwhelm, no judgment.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!selectedPath ? (
              /* Path Selection Cards */
              <motion.div 
                key="paths"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {paths.map((path, index) => (
                  <motion.button
                    key={path.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedPath(path.id)}
                    className="group relative bg-card rounded-2xl border border-border/50 p-6 text-left hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-14 h-14 rounded-xl ${path.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      {path.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{path.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{path.subtitle}</p>
                    <div className="flex items-center text-primary text-sm font-medium">
                      Start here
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              /* Step Flow */
              <motion.div
                key="steps"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                {selectedPathData && (
                  <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-soft">
                    {/* Progress Header */}
                    <div className="flex items-center justify-between mb-2">
                      <button 
                        onClick={handleBack}
                        className="flex items-center text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back
                      </button>
                      <span className="text-sm text-muted-foreground">
                        Step {currentStep + 1} of {selectedPathData.steps.length}
                      </span>
                    </div>
                    
                    <Progress value={progress} className="h-2 mb-8" />

                    {/* Step Content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={`w-12 h-12 rounded-xl ${selectedPathData.color} text-white flex items-center justify-center mb-6`}>
                          {currentStep === selectedPathData.steps.length - 1 ? (
                            <Check className="h-6 w-6" />
                          ) : (
                            <span className="font-bold">{currentStep + 1}</span>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold text-foreground mb-3">
                          {selectedPathData.steps[currentStep].title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {selectedPathData.steps[currentStep].description}
                        </p>

                        {selectedPathData.steps[currentStep].tip && (
                          <div className="bg-secondary/50 rounded-lg px-4 py-3 mb-8">
                            <p className="text-sm text-muted-foreground flex items-center">
                              <span className="text-primary mr-2">💡</span>
                              {selectedPathData.steps[currentStep].tip}
                            </p>
                          </div>
                        )}

                        <Button 
                          onClick={handleNextStep}
                          size="lg"
                          className="w-full rounded-xl group"
                        >
                          {currentStep === selectedPathData.steps.length - 1 ? (
                            <>
                              Get started — it's free
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          ) : (
                            <>
                              Continue
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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

export default GuidedPaths;
