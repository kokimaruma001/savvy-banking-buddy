
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, CreditCard, Shield, BookOpen } from 'lucide-react';

interface ServicesProps {
  type?: 'coaching' | 'budgeting' | 'fraud-detection' | 'investments' | null;
}

const Services = ({ type = null }: ServicesProps) => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: 'coaching',
      title: 'Financial Coaching',
      description: 'Get personalized guidance from certified financial coaches to help you achieve your financial goals.',
      icon: <BookOpen className="h-12 w-12 text-primary" />,
      features: [
        'One-on-one coaching sessions',
        'Personalized financial plan',
        'Regular progress check-ins',
        'Goal setting and tracking',
        'Expert guidance on complex financial decisions'
      ]
    },
    {
      id: 'budgeting',
      title: 'Budgeting Tools',
      description: 'Take control of your finances with our comprehensive budgeting and expense tracking tools.',
      icon: <DollarSign className="h-12 w-12 text-primary" />,
      features: [
        'Easy expense categorization',
        'Monthly budget planning',
        'Spending insights and analysis',
        'Bill payment reminders',
        'Financial goal tracking'
      ]
    },
    {
      id: 'fraud-detection',
      title: 'Fraud Detection',
      description: 'Protect your financial accounts with our advanced fraud detection and prevention system.',
      icon: <Shield className="h-12 w-12 text-primary" />,
      features: [
        'Real-time transaction monitoring',
        'Suspicious activity alerts',
        'Identity theft protection',
        'Secure authentication methods',
        '24/7 fraud support'
      ]
    },
    {
      id: 'investments',
      title: 'Investment Guidance',
      description: 'Make informed investment decisions with guidance tailored to your goals and risk tolerance.',
      icon: <TrendingUp className="h-12 w-12 text-primary" />,
      features: [
        'Investment portfolio analysis',
        'Risk assessment',
        'Diversification strategies',
        'Market insights and research',
        'Retirement planning'
      ]
    }
  ];

  const currentService = type ? services.find(service => service.id === type) : null;

  return (
    <>
      <Helmet>
        <title>{currentService ? `${currentService.title} | Savvy` : 'Financial Services | Savvy'}</title>
      </Helmet>
      <Navbar />
      
      <main className="container mx-auto px-4 py-20">
        {currentService ? (
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/services')}
              className="mb-6"
            >
              ← Back to All Services
            </Button>
            
            <div className="flex items-center mb-8">
              {currentService.icon}
              <h1 className="text-4xl font-bold ml-4">{currentService.title}</h1>
            </div>
            
            <p className="text-xl text-muted-foreground mb-10">
              {currentService.description}
            </p>
            
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentService.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Ready to get started?</CardTitle>
                <CardDescription>Take the first step toward financial success</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our team of financial experts are ready to help you achieve your goals. 
                  Contact us today to learn more about our {currentService.title.toLowerCase()} services.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => navigate('/contact')}>Contact Us</Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div>
            <h1 className="text-4xl font-bold mb-8 text-center">Our Financial Services</h1>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Discover the comprehensive suite of financial services designed to help you achieve your financial goals and secure your future.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center mb-2">
                      {service.icon}
                      <CardTitle className="text-2xl ml-4">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-3"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => navigate(`/services/${service.id}`)}
                      className="w-full"
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </>
  );
};

export default Services;
