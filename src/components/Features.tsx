import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Users, Award, Globe } from 'lucide-react';
import insightsIcon from '@/assets/insights-icon.png';
import wealthIcon from '@/assets/wealth-icon.png';
import newsletterIcon from '@/assets/newsletter-icon.png';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const featuresRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          duration: 0.8,
          y: 60,
          opacity: 0,
          ease: "power3.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, featuresRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: insightsIcon,
      title: "LUSE Market Insights",
      description: "In-depth analysis of the Lusaka Securities Exchange with actionable insights from seasoned financial experts.",
      stats: "27 listed companies"
    },
    {
      icon: wealthIcon,
      title: "Zambian Investment Strategies",
      description: "Proven strategies for portfolio diversification and risk management in the Zambian market.",
      stats: "K38.5B market cap"
    },
    {
      icon: newsletterIcon,
      title: "LUSE Weekly Newsletter",
      description: "Exclusive content featuring LUSE trends, investment opportunities, and economic forecasts for Zambia.",
      stats: "Weekly updates"
    }
  ];

  const stats = [
    { icon: TrendingUp, value: "15.2%", label: "LUSE All Share Index Growth" },
    { icon: Users, value: "27", label: "Listed Companies" },
    { icon: Award, value: "K38.5B", label: "Total Market Capitalization" },
    { icon: Globe, value: "1994", label: "LUSE Established" }
  ];

  return (
    <section ref={featuresRef} className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Lusaka Securities <span className="text-gradient">Exchange Insights</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expert analysis and guidance for investors in the Zambian stock market
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group p-8 rounded-2xl card-gradient border border-border/50 hover:border-primary/30 transition-smooth card-shadow hover:elevated-shadow"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-spring">
                <img src={feature.icon} alt={feature.title} className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
              <div className="text-sm font-medium text-primary">{feature.stats}</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[features.length + index] = el}
              className="text-center p-6 rounded-xl card-gradient border border-border/30"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default Features;