import { ShieldCheck, Camera, CreditCard, CheckCircle2, ArrowRight, Upload, Info, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function SellerVerification() {
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [idFile, setIdFile] = useState<string | null>(null);
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIdFile(file.name);
        setIsUploading(false);
        toast.success("ID Document Uploaded");
      }, 1500);
    }
  };

  const handleCaptureFace = () => {
    setIsUploading(true);
    setTimeout(() => {
      setFaceImage("https://api.dicebear.com/7.x/avataaars/svg?seed=verified");
      setIsUploading(false);
      toast.success("Face Biometrics Captured");
    }, 2000);
  };

  const nextStep = () => setStep(prev => prev + 1);

  const completeVerification = () => {
    toast.success("Verification Submitted!", {
      description: "Our compliance team will review your documents within 24 hours.",
    });
    navigate("/marketplace");
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={item} className="text-center space-y-2">
          <div className="h-16 w-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-black italic uppercase tracking-tight">Seller Verification</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            To maintain Earth's most trusted agricultural marketplace, we require all listers to verify their identity.
          </p>
        </motion.div>

        <motion.div variants={item} className="relative">
          <div className="flex justify-between mb-4 px-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`text-[10px] font-black uppercase tracking-widest ${step >= i ? 'text-primary' : 'text-muted-foreground'}`}>
                Step {i}: {i === 1 ? 'Details' : i === 2 ? 'Identity' : 'Biometrics'}
              </div>
            ))}
          </div>
          <Progress value={(step / 3) * 100} className="h-2 rounded-full" />
        </motion.div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Full Legal Name</Label>
                    <Input placeholder="As it appears on ID" className="bg-surface/50 border-border/30 h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Farm/Business Name</Label>
                    <Input placeholder="Registered name" className="bg-surface/50 border-border/30 h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Primary Commodity</Label>
                    <Input placeholder="e.g. Livestock, Grains" className="bg-surface/50 border-border/30 h-12 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black uppercase tracking-widest">Location</Label>
                    <Input placeholder="Country, Region" className="bg-surface/50 border-border/30 h-12 rounded-xl" />
                  </div>
                </div>
                <Button onClick={nextStep} className="w-full h-14 rounded-2xl font-bold text-lg bg-gradient-primary shadow-lg shadow-primary/20">
                  Continue to Identity Verification <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-8">
                  <Info className="h-6 w-6 text-amber-500 shrink-0" />
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                    Please upload a clear photo of your Government Issued ID (Passport, National ID, or Driver's License).
                  </p>
                </div>

                <div className="border-2 border-dashed border-border/50 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/50 transition-colors relative group overflow-hidden">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CreditCard className="h-10 w-10 text-primary" />
                  </div>
                  {idFile ? (
                    <div className="space-y-2">
                      <p className="text-lg font-bold text-primary">{idFile}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">Ready for processing</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-lg font-bold">Drop your ID photo here</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest font-black">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleIdUpload}
                    accept="image/*"
                  />
                  {isUploading && (
                    <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-4">
                      <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-xs font-bold uppercase tracking-widest">Scanning ID Document...</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-8">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-14 rounded-2xl font-bold border-border/50">Back</Button>
                  <Button onClick={nextStep} disabled={!idFile} className="flex-[2] h-14 rounded-2xl font-bold text-lg bg-gradient-primary">
                    Next: Face Recognition
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm shadow-xl text-center">
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-8">Live Face Verification</h3>
                
                <div className="relative max-w-sm mx-auto aspect-square rounded-full border-4 border-primary/30 p-2 overflow-hidden shadow-2xl bg-black/5">
                  <div className="absolute inset-0 border-[16px] border-card/80 rounded-full z-10" />
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    {faceImage ? (
                      <img src={faceImage} alt="Captured" className="w-full h-full object-cover scale-150" />
                    ) : (
                      <div className="w-full h-full bg-surface flex items-center justify-center">
                        <Camera className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                    {!faceImage && !isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-[2px] bg-primary/50 animate-[scan_2s_ease-in-out_infinite]" />
                      </div>
                    )}
                  </div>
                  {isUploading && (
                    <div className="absolute inset-0 bg-background/60 z-20 flex flex-col items-center justify-center gap-4">
                      <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-primary">Matching Face Biometrics...</p>
                    </div>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mt-8 max-w-xs mx-auto">
                  Center your face in the frame. Ensure good lighting and remove any glasses or masks.
                </p>

                <div className="flex gap-4 mt-12">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-14 rounded-2xl font-bold border-border/50">Back</Button>
                  {!faceImage ? (
                    <Button onClick={handleCaptureFace} className="flex-[2] h-14 rounded-2xl font-bold text-lg bg-gradient-primary">
                      Capture & Verify
                    </Button>
                  ) : (
                    <Button onClick={completeVerification} className="flex-[2] h-14 rounded-2xl font-bold text-lg bg-success text-white hover:bg-success/90">
                      Submit Verification <CheckCircle2 className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        @keyframes scan {
          0%, 100% { transform: translateY(-100%); opacity: 0; }
          50% { transform: translateY(100%); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
