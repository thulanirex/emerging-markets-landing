import { Mail, Twitter, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-bold text-gradient mb-4">
              Emerging Markets
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering your financial future with expert insights and strategies 
              featured in top financial publications.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-smooth">
                <Twitter className="w-5 h-5 text-gold" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-smooth">
                <Linkedin className="w-5 h-5 text-gold" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-smooth">
                <Youtube className="w-5 h-5 text-gold" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center hover:bg-gold/20 transition-smooth">
                <Mail className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-gold transition-smooth">Market Analysis</a></li>
              <li><a href="#" className="hover:text-gold transition-smooth">Investment Guide</a></li>
              <li><a href="#" className="hover:text-gold transition-smooth">Risk Management</a></li>
              <li><a href="#" className="hover:text-gold transition-smooth">Portfolio Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#" className="hover:text-gold transition-smooth">About Us</a></li>
              <li><a href="#" className="hover:text-gold transition-smooth">Contact</a></li>
              <li><a href="#" className="hover:text-gold transition-smooth">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gold transition-smooth">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/30 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2025 Emerging Markets. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Trusted by 50,000+ investors worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;