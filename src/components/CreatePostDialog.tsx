import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";
import { useState } from "react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostDialog({ open, onOpenChange }: Props) {
  const [content, setContent] = useState("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border/50 shadow-layered sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Title (optional)" className="bg-surface border-border/50 focus:ring-primary/50" />
          <Textarea
            placeholder="What's on your mind?"
            className="bg-surface border-border/50 min-h-[120px] focus:ring-primary/50"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="text-muted-foreground gap-1.5">
              <ImagePlus className="h-4 w-4" /> Image
            </Button>
            <Button
              size="sm"
              className="bg-gradient-primary text-primary-foreground"
              onClick={() => { setContent(""); onOpenChange(false); }}
            >
              Publish
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
