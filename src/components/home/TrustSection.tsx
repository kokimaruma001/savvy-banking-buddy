import { Shield, Brain, MapPin, Lock, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrustSection = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const trustBadges = [
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Bank-grade security",
      description: "Your data is encrypted and protected"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-powered, human-friendly",
      description: "Smart insights in plain English"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Built for South African banking",
      description: "Understands local banks and fees"
    }
  ];

  const faqs = [
    {
      question: "Do you move my money?",
      answer: "No, never. We only help you understand and track your finances. We never move, transfer, or access your funds. You're always in complete control."
    },
    {
      question: "Can you access my bank account?",
      answer: "Only with your explicit permission, and only to read transaction history. We use bank-level security and never store your login credentials."
    },
    {
      question: "Is my data safe?",
      answer: "Yes, absolutely. Your data is encrypted using the same standards banks use. We never sell your information to third parties."
    },
    {
      question: "What if I change my mind?",
      answer: "You can delete your account and all your data at any time. No questions asked, no hoops to jump through."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              Your security comes first
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Built with trust at every step
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trustBadges.map((badge, index) => (
              <div 
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 shadow-soft"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {badge.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{badge.title}</h3>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-muted-foreground mb-3">
              <HelpCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Common questions</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              We know you might be wondering...
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border/50 overflow-hidden shadow-soft"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/30 transition-colors"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Still have questions? <a href="/contact" className="text-primary hover:underline">We're here to help</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
