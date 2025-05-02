
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, ChevronRight } from 'lucide-react';

const Footer = () => {
  // Social media URLs
  const socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com"
  };

  // Quick links mapping with proper routes
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Education', path: '/education' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Services links mapping
  const serviceLinks = [
    { name: 'Financial Coaching', path: '/services/coaching' },
    { name: 'Budgeting Tools', path: '/services/budgeting' },
    { name: 'Fraud Detection', path: '/services/fraud-detection' },
    { name: 'Investment Guidance', path: '/services/investments' },
    { name: 'Financial Education', path: '/education' }
  ];

  // Privacy policy links
  const policyLinks = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
    { name: 'Cookie Policy', path: '/cookie-policy' }
  ];

  return (
    <footer className="bg-gradient-to-br from-background to-secondary/50 pt-16 border-t">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-primary flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <h2 className="text-xl font-bold">
                <span className="text-gradient">Savvy</span>
              </h2>
            </div>
            <p className="text-muted-foreground">
              Empowering your financial journey with personalized AI guidance, education, and tools to build a secure future.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href={socialLinks.facebook} 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href={socialLinks.twitter} 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href={socialLinks.instagram} 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={socialLinks.linkedin} 
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name} className="flex items-center">
                  <ChevronRight size={14} className="text-primary mr-2" />
                  <Link to={item.path} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-md font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.name} className="flex items-center">
                  <ChevronRight size={14} className="text-primary mr-2" />
                  <Link to={item.path} className="text-muted-foreground hover:text-foreground transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-md font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                P.O. BOX 650, Shiluvane <br />
                Limpopo, SA 0873
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span>{' '}
                <a href="mailto:support@savvy.com" className="hover:text-primary transition-colors">
                  support@savvy.com
                </a>
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span>{' '}
                <a href="tel:+27658945667" className="hover:text-primary transition-colors">
                  +27 (65) 894 5667
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Savvy. All rights reserved.
          </p>
          <div className="flex mt-4 md:mt-0 space-x-6">
            {policyLinks.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
