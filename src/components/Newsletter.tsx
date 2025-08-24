import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react';
import { addSubscriber } from '@/lib/api';
import { useToast } from '@/components/ui/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        duration: 1,
        y: 60,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    "Weekly market analysis and insights",
    "Exclusive investment opportunities",
    "Risk management strategies",
    "Early access to financial reports",
    "Direct access to expert advisors"
  ];

  return (
    <section ref={sectionRef} className="py-24 hero-gradient">
      <div className="container mx-auto px-6">
        <div ref={contentRef} className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gold flex items-center justify-center glow-effect">
            <Mail className="w-10 h-10 text-background" />
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your 
            <span className="text-gradient"> Financial Future?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of successful investors who trust our insights to guide their financial decisions.
          </p>

          {/* Benefits List */}
          <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 text-left">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <span className="text-muted-foreground">{benefit}</span>
              </div>
            ))}
          </div>
          
          {/* Newsletter Signup Form */}
          <div className="max-w-lg mx-auto">
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!email || !firstName || !lastName) return;
              
              setIsSubmitting(true);
              try {
                const response = await addSubscriber({
                  users: {
                    fname: firstName,
                    lname: lastName,
                    email: email,
                    password: ''
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
            }} className="flex flex-col gap-6 p-6 rounded-xl bg-surface border border-border/30 backdrop-blur-sm card-shadow">
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
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gradient">50K+</div>
                <div className="text-sm text-muted-foreground">Subscribers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">12%</div>
                <div className="text-sm text-muted-foreground">Avg. Returns</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              No spam, unsubscribe at any time. Your data is protected and secure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;