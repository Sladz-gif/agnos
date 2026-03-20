import { motion } from "framer-motion";
import { Sprout, ArrowLeft, Lightbulb, Tractor, CloudRain, Sun, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const agricFacts = [
  "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
  "Farming fact: One acre of corn eliminates 8 tons of carbon dioxide from the air each year.",
  "Agric insight: Apples belong to the rose family (Rosaceae), just like pears and plums.",
  "Fun fact: Cows have 'best friends' and become stressed when they are separated from them.",
  "Did you know? A single honeybee visits 50 to 100 flowers during one collection trip.",
  "Farming fact: There are more than 7,500 varieties of apples grown around the world.",
  "Agric insight: The world's tallest tree is a coast redwood in California, measuring over 379 feet tall!",
  "Fun fact: Pigs are highly intelligent and can even be trained to play video games.",
  "Did you know? Bananas are berries, but strawberries are not!",
  "Farming fact: An average ear of corn has an even number of rows, usually 16.",
  "Agric insight: Sheep have rectangular pupils that give them a 270 to 320-degree field of vision.",
  "Fun fact: Earthworms have five hearts!",
  "Did you know? Cotton has been cultivated for over 7,000 years.",
  "Farming fact: A single teaspoon of healthy soil contains more microorganisms than there are people on Earth.",
  "Agric insight: Goats were the first animals to be domesticated by humans over 10,000 years ago.",
  "Fun fact: A chicken can remember over 100 different faces of people or other animals.",
  "Did you know? Coffee is the second most traded commodity in the world, after crude oil.",
  "Farming fact: About 91% of all farms in the US are family-owned and operated.",
  "Agric insight: Tomatoes are the world's most popular fruit, with over 60 million tons produced annually.",
  "Fun fact: Horses can sleep both standing up and lying down.",
  "Market analysis: Global agricultural trade has more than doubled in real terms since 1995, reaching $1.5 trillion in 2018.",
  "Did you know? Data-driven agriculture can increase global crop yields by 67% by 2050, according to some market projections.",
  "Farming fact: Precision agriculture using GPS and sensors is estimated to become a $12 billion global market by 2025.",
  "Market insight: Africa holds about 60% of the world's remaining uncultivated arable land, making it a critical frontier for future market growth.",
  "Agric analysis: Smallholder farmers provide up to 80% of the food consumed in a large part of the developing world.",
  "Market trend: The global organic food market is projected to grow at a CAGR of over 10% through 2026.",
  "Did you know? Commodity prices for staples like maize and wheat are influenced by global weather patterns like El Niño and La Niña."
];

export default function NotFound() {
  const navigate = useNavigate();
  const [fact, setFact] = useState("");

  useEffect(() => {
    const randomFact = agricFacts[Math.floor(Math.random() * agricFacts.length)];
    setFact(randomFact);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 max-w-2xl"
      >
        <div className="relative inline-block">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-primary/10 p-6 rounded-3xl inline-block border-2 border-primary/20 shadow-2xl"
          >
            <Tractor className="h-20 w-20 text-primary" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-4 -right-4 bg-accent p-3 rounded-2xl shadow-xl"
          >
            <Sprout className="h-6 w-6 text-accent-foreground" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-foreground">
            Oops! <span className="text-primary">Under</span> Cultivation.
          </h1>
          <p className="text-xl md:text-2xl font-bold text-muted-foreground uppercase tracking-widest italic">
            This page is yet to be built
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-surface border-2 border-border p-8 rounded-[2.5rem] shadow-layered relative group"
        >
          <div className="absolute -top-4 left-8 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <Lightbulb className="h-3 w-3" /> Agric Fun Fact
          </div>
          <p className="text-lg font-medium text-foreground leading-relaxed italic">
            "{fact}"
          </p>
          <div className="flex justify-center gap-4 mt-6 opacity-30 group-hover:opacity-100 transition-opacity">
            <Leaf className="h-5 w-5 text-primary" />
            <Sun className="h-5 w-5 text-primary" />
            <CloudRain className="h-5 w-5 text-primary" />
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            size="lg" 
            className="h-14 px-8 text-lg font-black rounded-2xl bg-foreground text-background hover:bg-primary hover:text-white transition-all shadow-xl w-full sm:w-auto"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Base
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="h-14 px-8 text-lg font-black rounded-2xl border-border bg-surface/50 backdrop-blur-md text-foreground hover:bg-surface transition-all w-full sm:w-auto"
            onClick={() => window.location.reload()}
          >
            Get Another Fact
          </Button>
        </div>
      </motion.div>

      {/* Background Icons */}
      <div className="fixed bottom-10 left-10 opacity-5 hidden lg:block">
        <Leaf className="h-32 w-32" />
      </div>
      <div className="fixed top-20 right-10 opacity-5 hidden lg:block">
        <CloudRain className="h-32 w-32" />
      </div>
    </div>
  );
}
