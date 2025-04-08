import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, ChevronRight } from 'lucide-react';

const Footer = () => {
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
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-md font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Dashboard', 'Education', 'About Us', 'Contact'].map((item) => (
                <li key={item} className="flex items-center">
                  <ChevronRight size={14} className="text-primary mr-2" />
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-md font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {['Financial Coaching', 'Budgeting Tools', 'Fraud Detection', 'Investment Guidance', 'Financial Education'].map((item) => (
                <li key={item} className="flex items-center">
                  <ChevronRight size={14} className="text-primary mr-2" />
                  <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    {item}
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
                <span className="font-medium text-foreground">Email:</span> support@savvy.com
              </li>
              <li className="text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span> +27 (65) 894 5667
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
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
