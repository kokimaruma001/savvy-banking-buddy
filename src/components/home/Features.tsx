
import { Code, Wallet, Bell, BookOpen, LockKeyhole, BarChart3, TrendingUp, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Wallet className="text-blue-500" />,
      title: "Personalized Financial Coaching",
      description: "Get tailored advice from our AI assistant that learns your spending habits and financial goals to provide customized guidance."
    },
    {
      icon: <BarChart3 className="text-green-500" />,
      title: "Automated Budgeting",
      description: "Set, track, and optimize your budget with intelligent categorization and analysis of your spending patterns."
    },
    {
      icon: <Bell className="text-red-500" />,
      title: "Fraud Detection",
      description: "Stay protected with real-time monitoring and alerts for suspicious activities across all your financial accounts."
    },
    {
      icon: <BookOpen className="text-purple-500" />,
      title: "Financial Education",
      description: "Learn through our gamified courses and resources tailored to your knowledge level and financial objectives."
    },
    {
      icon: <Globe className="text-teal-500" />,
      title: "Multilingual Support",
      description: "Access financial education and assistance in multiple languages for a truly global experience."
    },
    {
      icon: <LockKeyhole className="text-gray-500" />,
      title: "Bank-Level Security",
      description: "Rest easy knowing your data is protected with the highest standards of encryption and security protocols."
    },
    {
      icon: <TrendingUp className="text-amber-500" />,
      title: "Investment Guidance",
      description: "Explore investment opportunities with risk assessments and recommendations suited to your financial profile."
    },
    {
      icon: <Code className="text-indigo-500" />,
      title: "Seamless Integration",
      description: "Connect effortlessly with thousands of financial institutions worldwide for a comprehensive financial overview."
    }
  ];

  return (
    <section className="py-24 relative bg-gradient-to-b from-background to-secondary/20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-[20%] top-[20%] w-[40%] h-[40%] rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute -right-[10%] bottom-[10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything You Need for <span className="text-gradient">Financial Success</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive suite of tools and features is designed to empower your financial journey, from everyday budgeting to long-term wealth building.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass p-6 rounded-xl hover:translate-y-[-5px] transition-all duration-300 animate-fade-in shadow-soft"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-white shadow-sm mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
