import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Mail, Loader2 } from 'lucide-react';
import { gsap } from 'gsap';
import heroImage from '@/assets/hero-bg.jpg';
import { addSubscriber } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) return;
    
    setIsSubmitting(true);
    try {
      const response = await addSubscriber({
        users: {
          fname: firstName,
          lname: lastName,
          email: email,
          password: 'test'
        }
      });
      
      toast({
        title: 'Success!',
        description: 'Thank you for subscribing to our newsletter.',
        variant: 'default',
      });
      
      setFirstName('');
      setLastName('');
      setEmail('');
      console.log('Subscription successful:', response);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again later.',
        variant: 'destructive',
      });
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        duration: 1,
        y: 60,
        opacity: 0,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.7")
      .from(formRef.current, {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.5");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Financial Markets Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="text-gradient">Emerging</span>
            <br />
            <span className="text-foreground">Markets</span>
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            Empowering Your Financial Future
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Dive into the world of financial insights with expert guidance. With years of experience, 
            our team delivers strategies featured in top financial publications, offering unique 
            perspectives on wealth management.
          </p>
          
          {/* Newsletter Signup */}
          <div ref={formRef} className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 rounded-xl bg-background/10 border border-border/30 backdrop-blur-sm shadow-lg">
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="First Name"
                  className="h-12 bg-background/50 border-0 rounded-lg focus-visible:ring-1 focus-visible:ring-gold/50 text-foreground placeholder:text-muted-foreground"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <Input 
                  placeholder="Last Name"
                  className="h-12 bg-background/50 border-0 rounded-lg focus-visible:ring-1 focus-visible:ring-gold/50 text-foreground placeholder:text-muted-foreground"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input 
                  placeholder="Enter your email address"
                  className="pl-12 h-12 bg-background/50 border-0 rounded-lg focus-visible:ring-1 focus-visible:ring-gold/50 text-foreground placeholder:text-muted-foreground"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full h-14 bg-gold hover:bg-gold-light text-lg font-medium"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground mt-3">
              Join 50,000+ investors getting weekly insights
            </p>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-muted-foreground animate-bounce">
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
          <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default Hero;