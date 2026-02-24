import { useState, useCallback } from "react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Sparkles, ShoppingCart, Image as ImageIcon } from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";
import { useCartStore } from "@/stores/useCartStore";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";

const PlantDecoration = () => {
  const { roomPhoto, setRoomPhoto } = useUIStore();
  const addItem = useCartStore((s) => s.addItem);
  const [room, setRoom] = useState("");
  const [style, setStyle] = useState("");
  const [preference, setPreference] = useState("");
  const [suggestions, setSuggestions] = useState<typeof products>([]);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRoomPhoto(url);
    }
  }, [setRoomPhoto]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRoomPhoto(url);
    }
  }, [setRoomPhoto]);

  const generateSuggestions = () => {
    let filtered = products.filter((p) => p.category !== "accessories");

    if (room) filtered = filtered.filter((p) => p.roomFit.includes(room));
    if (style) filtered = filtered.filter((p) => p.styleFit.includes(style));
    if (preference === "low-light") filtered = filtered.filter((p) => p.light === "low");
    if (preference === "pet-friendly") filtered = filtered.filter((p) => p.petFriendly);
    if (preference === "air-purifier") filtered = filtered.filter((p) => p.tags.includes("air-purifier"));

    if (filtered.length === 0) filtered = products.filter((p) => p.category !== "accessories").slice(0, 3);
    setSuggestions(filtered.slice(0, 4));
    toast({ title: "Suggestions generated!", description: `${filtered.slice(0, 4).length} plants recommended for your space.` });
  };

  const handleAddSuggestion = (id: string, name: string) => {
    addItem(id);
    toast({ title: "Added to cart", description: `${name} added.` });
  };

  return (
    <AppShell>
      <div className="container py-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Plant Decoration</h1>
          <p className="text-muted-foreground mt-2">Let us help you find the perfect plants for your space.</p>
        </div>

        {/* Steps */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h2 className="font-semibold mb-3">How To Do?</h2>
            <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Upload a photo of your room</li>
              <li>Select your room type, style preference, and plant needs</li>
              <li>Click "Generate AI" to get personalized plant suggestions</li>
            </ol>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center min-h-[250px] bg-muted/50 hover:bg-muted transition-colors cursor-pointer relative"
          >
            {roomPhoto ? (
              <img src={roomPhoto} alt="Room" className="w-full h-full object-cover rounded-xl absolute inset-0" />
            ) : (
              <>
                <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground text-center">Drag & drop your room photo here</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>

          {/* Options */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Room Category</label>
              <Select value={room} onValueChange={setRoom}>
                <SelectTrigger><SelectValue placeholder="Select room" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="living-room">Living Room</SelectItem>
                  <SelectItem value="bedroom">Bedroom</SelectItem>
                  <SelectItem value="office">Office</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Style</label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="boho">Boho</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Preference</label>
              <Select value={preference} onValueChange={setPreference}>
                <SelectTrigger><SelectValue placeholder="Select preference" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-light">Low Light</SelectItem>
                  <SelectItem value="pet-friendly">Pet Friendly</SelectItem>
                  <SelectItem value="air-purifier">Air Purifier</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="w-full" onClick={generateSuggestions}>
              <Sparkles className="h-4 w-4 mr-2" /> Generate AI
            </Button>
          </div>
        </div>

        {/* Results */}
        {suggestions.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Recommended Plants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {suggestions.map((p) => (
                <Card key={p.id} className="border-0 shadow-md overflow-hidden">
                  <div className="h-44 overflow-hidden bg-muted">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold text-sm">{p.name}</h3>
                    <div className="flex flex-wrap gap-1">
                      {p.tags.slice(0, 2).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
                      ))}
                    </div>
                    <p className="font-bold text-primary">Rs. {p.price.toLocaleString()}</p>
                    <Button size="sm" className="w-full" onClick={() => handleAddSuggestion(p.id, p.name)}>
                      <ShoppingCart className="h-3 w-3 mr-1" /> Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
};

export default PlantDecoration;
