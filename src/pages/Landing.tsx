import { motion } from "framer-motion";
import { 
  Sprout, ShoppingBag, BarChart3, Users, Bot, ArrowRight, 
  CheckCircle2, Globe, ShieldCheck, Zap, TrendingUp, 
  ChevronRight, Play, Star, MessageSquare, Mail, Phone, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-foreground uppercase italic">Agnos</h1>
              <p className="text-[10px] text-muted-foreground leading-none font-bold uppercase tracking-widest">Agriculture OS</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#mission" onClick={(e) => {
              e.preventDefault();
              document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Mission</a>
            <a href="#intelligence" onClick={(e) => {
              e.preventDefault();
              document.getElementById('intelligence')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Kiwi AI</a>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-xs font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <Button 
              className="rounded-full px-8 font-bold shadow-lg shadow-primary/20 bg-gradient-primary hover:scale-105 transition-all"
              onClick={() => navigate("/dashboard")}
            >
              Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#0f0f12] -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full blur-[150px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-primary/10 text-primary border-primary/20 rounded-full px-6 py-1.5 text-xs font-black uppercase tracking-[0.2em] mb-6">
              The Future of Modern Farming is Here
            </Badge>
            <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85] uppercase italic text-white max-w-5xl mx-auto">
              Empowering <span className="text-primary not-italic">Agriculture</span> with Intelligence.
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto font-medium leading-relaxed"
          >
            Agnos is an advanced, all-in-one ecosystem for farm management, global trade, and real-time market analysis. Built for the modern agronomist.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button 
              size="lg" 
              className="h-16 px-10 text-lg font-black rounded-2xl bg-white text-black hover:bg-primary hover:text-white transition-all shadow-2xl group"
              onClick={() => navigate("/dashboard")}
            >
              Get Started Free <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="h-16 px-10 text-lg font-black rounded-2xl border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition-all gap-3"
              onClick={() => navigate("/lessons")}
            >
              <Play className="h-5 w-5 fill-current text-primary" /> Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-20"
          >
            <div className="relative rounded-[3rem] border border-white/10 bg-white/5 p-4 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000" 
                alt="Agnos Interface" 
                className="rounded-[2.5rem] w-full shadow-2xl border border-white/5 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 grayscale" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <Badge className="bg-primary text-primary-foreground border-none rounded-full px-6 py-1.5 text-xs font-black uppercase tracking-[0.2em]">Our Mission</Badge>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">A Digital <span className="text-primary not-italic">Foundation</span> for the Next Billion Farmers.</h2>
              <p className="text-xl md:text-2xl font-medium opacity-70 leading-relaxed">
                We believe that technology should be as accessible as the soil. Our mission is to bridge the gap between traditional farming and high-tech efficiency, providing every agronomist with the tools to feed the world sustainably.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="space-y-2">
                  <h4 className="text-3xl font-black italic tracking-tighter text-primary">01.</h4>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-60">Transparency in Global Trade</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-black italic tracking-tighter text-primary">02.</h4>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-60">Neural-Driven Sustainability</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-3 group-hover:rotate-6 transition-transform duration-700" />
              <img 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Farming" 
                className="rounded-[4rem] relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 -rotate-3 group-hover:-rotate-6"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Everything you need to <span className="text-primary">Scale</span>.</h2>
            <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">From logistics to neural advisory, Agnos provides the full technical stack for modern agriculture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BarChart3}
              title="Market Intelligence"
              description="Real-time commodity exchange tracking with live charts and regional demand analysis."
            />
            <FeatureCard 
              icon={ShoppingBag}
              title="Global Marketplace"
              description="Buy and sell farm produce, seeds, and bio-energy with verified secure transactions."
            />
            <FeatureCard 
              icon={Sprout}
              title="Farm Operations"
              description="Full ERP suite for plot tracking, task scheduling, and automated resource monitoring."
            />
            <FeatureCard 
              icon={Bot}
              title="Kiwi Neural AI"
              description="Your specialized intelligence partner for predictive analytics and logistical optimization."
            />
            <FeatureCard 
              icon={Users}
              title="Community Hub"
              description="Connect with agronomists globally through specialized channels and social feeds."
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Growth Analytics"
              description="Deep-dive into yield projections and financial health with high-impact visualizations."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <StatItem value="12K+" label="Active Farmers" />
          <StatItem value="₵4.2M" label="Trade Volume" />
          <StatItem value="94%" label="Average Efficiency" />
          <StatItem value="24/7" label="Neural Monitoring" />
        </div>
      </section>

      {/* Kiwi AI Section */}
      <section id="intelligence" className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10">
            <div className="space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-2xl">
                <Bot className="h-10 w-10 text-primary-foreground" />
              </div>
              <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">Meet Kiwi. Your Neural <span className="text-primary">Advisor</span>.</h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              Kiwi isn't just an AI. It's a specialized agricultural brain that analyzes your farm's data to recommend route optimizations, predict market peaks, and prevent resource waste.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-lg font-bold">
                <CheckCircle2 className="h-6 w-6 text-primary" /> Predictive Yield Analysis
              </li>
              <li className="flex items-center gap-3 text-lg font-bold">
                <CheckCircle2 className="h-6 w-6 text-primary" /> Real-time Market Sentiment
              </li>
              <li className="flex items-center gap-3 text-lg font-bold">
                <CheckCircle2 className="h-6 w-6 text-primary" /> Logistical Route Optimization
              </li>
            </ul>
            <Button 
              size="lg" 
              className="h-16 px-10 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 bg-gradient-primary"
              onClick={() => navigate("/kiwi")}
            >
              Chat with Kiwi AI <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="bg-card border-2 border-foreground p-8 rounded-[3rem] shadow-[24px_24px_0px_0px_rgba(var(--primary),0.1)] relative z-10">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="bg-surface/50 border border-border/30 p-4 rounded-2xl rounded-tl-none">
                    <p className="text-sm font-bold italic">"Based on your Plot A maize data, I recommend harvesting within 48 hours to capture the 12% price peak in Kumasi."</p>
                  </div>
                </div>
                <div className="flex gap-4 justify-end">
                  <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none shadow-lg">
                    <p className="text-sm font-bold uppercase tracking-widest">Execute logistics plan.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="bg-surface/50 border border-border/30 p-4 rounded-2xl rounded-tl-none">
                    <p className="text-sm font-bold italic">"Understood. GKCL Logistics have been notified. Transport units arriving at 06:00 AM."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto bg-foreground text-background rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <h2 className="text-5xl md:text-[5.5rem] font-black uppercase italic tracking-tighter leading-[0.85] relative z-10">
            Join the <span className="text-primary not-italic">Revolution</span> in Modern Agriculture.
          </h2>
          <p className="text-xl md:text-2xl font-medium opacity-60 max-w-2xl mx-auto relative z-10">
            Agnos is free to start. No complex onboarding, just powerful tools at your fingertips.
          </p>
          <div className="pt-6 relative z-10">
            <Button 
              size="lg" 
              className="h-20 px-16 text-2xl font-black rounded-3xl bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all"
              onClick={() => navigate("/dashboard")}
            >
              Start Farming Smarter <ArrowRight className="ml-3 h-8 w-8" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Sprout className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-black tracking-tight text-foreground uppercase italic">Agnos</h1>
            </div>
            <p className="text-muted-foreground font-medium leading-relaxed">
              The complete operating system for modern agriculture. Powered by GKCL.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={Globe} />
              <SocialLink icon={MessageSquare} />
              <SocialLink icon={TrendingUp} />
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Platform</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link to="/market-analysis" className="hover:text-primary transition-colors">Analysis</Link></li>
              <li><Link to="/kiwi" className="hover:text-primary transition-colors">Kiwi AI</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Resources</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <li><Link to="/news" className="hover:text-primary transition-colors">Gazette</Link></li>
              <li><Link to="/lessons" className="hover:text-primary transition-colors">Learning Hub</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="#" className="hover:text-primary transition-colors">GKCL Network</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <Mail className="h-4 w-4 text-primary" /> contact@gkcl.io
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <Phone className="h-4 w-4 text-primary" /> +233 24 000 0000
              </li>
              <li className="flex items-center gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <MapPin className="h-4 w-4 text-primary" /> Kumasi, Ghana
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">
            © 2026 GKCL – Gifts Kyortaare Company Limited. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-card border-2 border-foreground p-10 rounded-[2.5rem] space-y-6 hover:shadow-[12px_12px_0px_0px_rgba(var(--primary),0.1)] transition-all group">
      <div className="h-14 w-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-black uppercase italic tracking-tighter">{title}</h3>
      <p className="text-muted-foreground font-medium leading-relaxed">{description}</p>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-5xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase">{value}</p>
      <p className="text-xs font-black uppercase tracking-[0.3em] text-primary">{label}</p>
    </div>
  );
}

function SocialLink({ icon: Icon }: { icon: any }) {
  return (
    <button className="h-10 w-10 rounded-xl bg-surface border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all">
      <Icon className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}

