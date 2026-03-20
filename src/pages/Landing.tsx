import { motion } from "framer-motion";
import { 
  Sprout, ShoppingBag, BarChart3, Users, Bot, ArrowRight, 
  CheckCircle2, Globe, ShieldCheck, Zap, TrendingUp, 
  ChevronRight, Play, Star, MessageSquare, Mail, Phone, MapPin, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Landing() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-foreground uppercase italic leading-none">Agnos</h1>
              <p className="text-[10px] text-muted-foreground leading-none font-bold uppercase tracking-widest mt-0.5">Agriculture OS</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
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
              className="hidden sm:flex rounded-full px-8 font-bold shadow-lg shadow-primary/20 bg-gradient-primary hover:scale-105 transition-all"
              onClick={() => navigate("/dashboard")}
            >
              Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-foreground"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-6 flex flex-col gap-6 z-40"
          >
            <a href="#features" onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-sm font-black uppercase tracking-widest text-foreground py-2 border-b border-border/10">Features</a>
            <a href="#mission" onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-sm font-black uppercase tracking-widest text-foreground py-2 border-b border-border/10">Mission</a>
            <a href="#intelligence" onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              document.getElementById('intelligence')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-sm font-black uppercase tracking-widest text-foreground py-2 border-b border-border/10">Kiwi AI</a>
            <a href="#contact" onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }} className="text-sm font-black uppercase tracking-widest text-foreground py-2 border-b border-border/10">Contact</a>
            <Button 
              className="w-full rounded-xl py-6 font-bold bg-gradient-primary mt-4"
              onClick={() => navigate("/dashboard")}
            >
              Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-background -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary rounded-full blur-[80px] sm:blur-[120px] animate-pulse" />
          <div className="absolute bottom-20 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-accent rounded-full blur-[100px] sm:blur-[150px] animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center space-y-8 sm:space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter leading-[0.9] uppercase italic text-foreground max-w-6xl mx-auto break-words px-2">
              Empowering <span className="text-primary not-italic">Agriculture</span> with Intelligence.
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed px-4"
          >
            Agnos is an advanced, all-in-one ecosystem for farm management, global trade, and real-time market analysis. Built for the modern agronomist.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
          >
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-black rounded-xl sm:rounded-2xl bg-foreground text-background hover:bg-primary hover:text-white transition-all shadow-2xl group"
              onClick={() => navigate("/dashboard")}
            >
              Get Started Free <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-black rounded-xl sm:rounded-2xl border-border bg-surface/50 backdrop-blur-md text-foreground/60 transition-all gap-3 cursor-default"
            >
              <Play className="h-5 w-5 fill-current text-primary/60" /> Coming Soon
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="pt-12 sm:pt-20 px-2 sm:px-4"
          >
            <div className="relative rounded-[2rem] sm:rounded-[3rem] border border-border bg-surface/50 p-2 sm:p-4 backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
              <img 
                src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000" 
                alt="Agnos Interface" 
                className="rounded-[1.5rem] sm:rounded-[2.5rem] w-full shadow-2xl border border-border/50 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 sm:py-32 bg-surface text-foreground relative overflow-hidden border-y border-border/50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 sm:space-y-10 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
                <Badge className="bg-primary text-primary-foreground border-none rounded-full px-6 py-1.5 text-xs font-black uppercase tracking-[0.2em]">Our Mission</Badge>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-[0.95] break-words text-foreground">A Digital <span className="text-primary not-italic">Foundation</span> for the Next Billion Farmers.</h2>
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                We believe that technology should be as accessible as the soil. Our mission is to bridge the gap between traditional farming and high-tech efficiency, providing every agronomist with the tools to feed the world sustainably.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 pt-6">
                <div className="space-y-2 text-center sm:text-left p-6 rounded-2xl bg-background border border-border shadow-sm">
                  <h4 className="text-3xl font-black italic tracking-tighter text-primary">01.</h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground/80">Transparency in Global Trade</p>
                </div>
                <div className="space-y-2 text-center sm:text-left p-6 rounded-2xl bg-background border border-border shadow-sm">
                  <h4 className="text-3xl font-black italic tracking-tighter text-primary">02.</h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-foreground/80">Neural-Driven Sustainability</p>
                </div>
              </div>
            </div>
            <div className="relative group px-4 sm:px-0 max-w-full overflow-hidden sm:overflow-visible">
              <div className="absolute inset-0 bg-primary/10 rounded-[2rem] sm:rounded-[4rem] rotate-3 group-hover:rotate-6 transition-transform duration-700" />
              <img 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern Farming" 
                className="rounded-[2rem] sm:rounded-[4rem] relative z-10 shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 -rotate-3 group-hover:-rotate-6 w-full object-cover aspect-[4/3] lg:aspect-square border-2 border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-20 sm:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 sm:mb-24 space-y-4 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight">Everything you need to <span className="text-primary">Scale</span>.</h2>
            <p className="text-muted-foreground text-base sm:text-lg font-medium max-w-2xl mx-auto">From logistics to neural advisory, Agnos provides the full technical stack for modern agriculture.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
      <section className="py-16 sm:py-24 bg-surface/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <StatItem value="12K+" label="Active Farmers" />
          <StatItem value="₵4.2M" label="Trade Volume" />
          <StatItem value="94%" label="Average Efficiency" />
          <StatItem value="24/7" label="Neural Monitoring" />
        </div>
      </section>

      {/* Kiwi AI Section */}
      <section id="intelligence" className="py-20 sm:py-32 overflow-hidden bg-background text-foreground">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8 sm:space-y-10 text-center lg:text-left">
            <div className="space-y-4">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-2xl mx-auto lg:mx-0">
                <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tighter leading-none">Meet Kiwi. Your Neural <span className="text-primary">Advisor</span>.</h2>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              Kiwi isn't just an AI. It's a specialized agricultural brain that analyzes your farm's data to recommend route optimizations, predict market peaks, and prevent resource waste.
            </p>
            <ul className="space-y-4 max-w-xl mx-auto lg:mx-0">
              <li className="flex items-center gap-3 text-base sm:text-lg font-bold">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" /> Predictive Yield Analysis
              </li>
              <li className="flex items-center gap-3 text-base sm:text-lg font-bold">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" /> Real-time Market Sentiment
              </li>
              <li className="flex items-center gap-3 text-base sm:text-lg font-bold">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" /> Logistical Route Optimization
              </li>
            </ul>
            <div className="flex justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-black rounded-xl sm:rounded-2xl shadow-xl shadow-primary/20 bg-gradient-primary w-full sm:w-auto"
                onClick={() => navigate("/kiwi")}
              >
                Chat with Kiwi AI <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex-1 relative w-full px-4 sm:px-0 mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] sm:blur-[100px] animate-pulse" />
            <div className="bg-card border-2 border-border p-6 sm:p-8 rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative z-10">
              <div className="space-y-6">
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="bg-surface border border-border p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tl-none shadow-sm">
                    <p className="text-xs sm:text-sm font-bold italic text-foreground/90">"Based on your Plot A maize data, I recommend harvesting within 48 hours to capture the 12% price peak in Accra."</p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4 justify-end">
                  <div className="bg-primary text-primary-foreground p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tr-none shadow-lg">
                    <p className="text-xs sm:text-sm font-bold uppercase tracking-widest">Execute logistics plan.</p>
                  </div>
                </div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div className="bg-surface border border-border p-3 sm:p-4 rounded-xl sm:rounded-2xl rounded-tl-none shadow-sm">
                    <p className="text-xs sm:text-sm font-bold italic text-foreground/90">"Understood. GKCL Logistics have been notified. Transport units arriving at 06:00 AM."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4">
        <div className="max-w-5xl mx-auto bg-foreground rounded-[2.5rem] sm:rounded-[4rem] p-10 sm:p-16 md:p-24 text-center space-y-8 sm:space-y-10 relative overflow-hidden group border border-border shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-black uppercase italic tracking-tighter leading-[0.9] relative z-10 break-words text-white">
            Join the <span className="text-primary not-italic">Revolution</span> in Modern Agriculture.
          </h2>
          <p className="text-base sm:text-xl md:text-2xl font-medium text-white/80 max-w-2xl mx-auto relative z-10">
            Agnos is free to start. No complex onboarding, just powerful tools at your fingertips.
          </p>
          <div className="pt-4 sm:pt-6 relative z-10">
            <Button 
              size="lg" 
              className="w-full sm:w-auto h-16 sm:h-20 px-10 sm:px-16 text-lg sm:text-2xl font-black rounded-2xl sm:rounded-3xl bg-primary text-primary-foreground shadow-2xl hover:scale-105 active:scale-95 transition-all"
              onClick={() => navigate("/dashboard")}
            >
              Start Farming Smarter <ArrowRight className="ml-2 sm:ml-3 h-6 w-6 sm:h-8 sm:w-8" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 sm:py-20 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
          <div className="space-y-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                <Sprout className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-black tracking-tight text-foreground uppercase italic leading-none">Agnos</h1>
            </div>
            <p className="text-muted-foreground font-medium leading-relaxed max-w-xs mx-auto sm:mx-0">
              The complete operating system for modern agriculture. Powered by GKCL.
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              <SocialLink icon={Globe} />
              <SocialLink icon={MessageSquare} />
              <SocialLink icon={TrendingUp} />
            </div>
          </div>

          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Platform</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link to="/market-analysis" className="hover:text-primary transition-colors">Analysis</Link></li>
              <li><Link to="/kiwi" className="hover:text-primary transition-colors">Kiwi AI</Link></li>
            </ul>
          </div>

          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Resources</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              <li><Link to="/news" className="hover:text-primary transition-colors">Gazette</Link></li>
              <li><Link to="/lessons" className="hover:text-primary transition-colors">Learning Hub</Link></li>
              <li><Link to="/404" className="hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/404" className="hover:text-primary transition-colors">GKCL Network</Link></li>
            </ul>
          </div>

          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center justify-center sm:justify-start gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <Mail className="h-4 w-4 text-primary shrink-0" /> contact@gkcl.io
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <Phone className="h-4 w-4 text-primary shrink-0" /> +233 24 000 0000
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                <MapPin className="h-4 w-4 text-primary shrink-0" /> Accra, Ghana
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 sm:mt-20 pt-8 border-t border-border/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] sm:text-xs font-bold text-muted-foreground/50 uppercase tracking-widest">
            © 2026 GKCL – Gifts Kyortaare Company Limited. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
            <Link to="/404" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/404" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/404" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="bg-card border-2 border-foreground p-8 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] space-y-4 sm:space-y-6 hover:shadow-[12px_12px_0px_0px_rgba(var(--primary),0.1)] transition-all group">
      <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-primary/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shrink-0">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
      </div>
      <h3 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter leading-tight">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">{description}</p>
    </div>
  );
}

function StatItem({ value, label }: { value: string, label: string }) {
  return (
    <div className="space-y-2">
      <p className="text-4xl sm:text-5xl md:text-6xl font-black italic tracking-tighter text-foreground uppercase leading-none">{value}</p>
      <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-primary">{label}</p>
    </div>
  );
}

function SocialLink({ icon: Icon }: { icon: any }) {
  return (
    <button className="h-10 w-10 rounded-xl bg-surface border border-border/50 flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all shrink-0">
      <Icon className="h-5 w-5 text-muted-foreground" />
    </button>
  );
}

