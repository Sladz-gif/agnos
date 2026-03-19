import { ShoppingCart, CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      toast.success("Order Placed Successfully!");
    }, 2500);
  };

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-6">
          <div className="h-24 w-24 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tight">Order Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Thank you for your purchase. Your order #AG-{Math.floor(Math.random() * 1000000)} is being processed.
          </p>
          <div className="pt-8">
            <Button onClick={() => navigate("/marketplace")} className="rounded-2xl h-14 px-10 font-bold text-lg">
              Return to Marketplace
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-8 rounded-xl text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Product
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary" /> Shipping Information
              </h2>
              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase">First Name</Label>
                    <Input placeholder="John" className="bg-surface/50 border-border/30 h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase">Last Name</Label>
                    <Input placeholder="Doe" className="bg-surface/50 border-border/30 h-12 rounded-xl" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase">Address</Label>
                  <Input placeholder="123 Farm Road, Kumasi" className="bg-surface/50 border-border/30 h-12 rounded-xl" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-[10px] font-black uppercase">City</Label>
                    <Input placeholder="Kumasi" className="bg-surface/50 border-border/30 h-12 rounded-xl" required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase">Postal Code</Label>
                    <Input placeholder="AK-123" className="bg-surface/50 border-border/30 h-12 rounded-xl" required />
                  </div>
                </div>
              </Card>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-primary" /> Payment Method
              </h2>
              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl space-y-6">
                <RadioGroup defaultValue="mobile-money">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl border border-border/30 bg-surface/30 hover:border-primary/50 transition-colors cursor-pointer">
                    <RadioGroupItem value="mobile-money" id="momo" />
                    <Label htmlFor="momo" className="flex-1 font-bold cursor-pointer">Mobile Money (MTN, Telecel, AT)</Label>
                    <div className="flex gap-2">
                      <div className="h-6 w-10 bg-amber-400 rounded-md" />
                      <div className="h-6 w-10 bg-red-500 rounded-md" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-2xl border border-border/30 bg-surface/30 hover:border-primary/50 transition-colors cursor-pointer mt-3">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 font-bold cursor-pointer">Credit / Debit Card</Label>
                    <div className="flex gap-2 text-muted-foreground">
                      <CreditCard className="h-6 w-6" />
                    </div>
                  </div>
                </RadioGroup>

                <div className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase">Mobile Number</Label>
                    <Input placeholder="024 000 0000" className="bg-surface/50 border-border/30 h-12 rounded-xl" />
                  </div>
                </div>
              </Card>
            </section>
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <section className="sticky top-24">
            <h2 className="text-2xl font-black uppercase italic tracking-tight mb-6">Order Summary</h2>
            <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl space-y-6">
              {product ? (
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-xl overflow-hidden shrink-0 border border-border/30">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-black mt-1">Qty: 1</p>
                    <p className="font-black text-primary mt-1">₵{product.price.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground italic">No items in summary</p>
              )}

              <Separator className="bg-border/30" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-bold">₵{product?.price.toLocaleString() || "0.00"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-bold text-success">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (VAT 12.5%)</span>
                  <span className="font-bold">₵{( (product?.price || 0) * 0.125 ).toLocaleString()}</span>
                </div>
                <Separator className="bg-border/30" />
                <div className="flex justify-between text-xl font-black italic uppercase tracking-tight pt-2">
                  <span>Total</span>
                  <span className="text-primary">₵{( (product?.price || 0) * 1.125 ).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || !product}
                  className="w-full h-14 rounded-2xl font-bold text-lg bg-gradient-primary shadow-lg shadow-primary/20 relative overflow-hidden"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Processing Payment...</span>
                    </div>
                  ) : (
                    "Confirm Order"
                  )}
                </Button>
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <ShieldCheck className="h-4 w-4" /> Secure SSL Encrypted Checkout
                </div>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
