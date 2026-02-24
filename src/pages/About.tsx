import { AppShell } from "@/components/AppShell";
import { Leaf, Eye, Target, BookOpen } from "lucide-react";

const sections = [
  {
    title: "Who We Are",
    icon: Leaf,
    text: "GreenNest is Sri Lanka's premier indoor plants marketplace, curating the finest botanical specimens for homes and offices. We believe every space deserves the transformative power of nature.",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=400&fit=crop",
  },
  {
    title: "Our Vision",
    icon: Eye,
    text: "To make urban Sri Lanka greener, one room at a time. We envision a future where every indoor space thrives with life and every person experiences the joy of nurturing plants.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop",
  },
  {
    title: "Our Mission",
    icon: Target,
    text: "To provide premium, healthy plants with expert care guidance, making plant parenthood accessible and delightful for everyone — from beginners to seasoned enthusiasts.",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
  },
  {
    title: "Our History",
    icon: BookOpen,
    text: "Founded in 2020 amidst the indoor plant revolution, GreenNest grew from a small balcony nursery in Colombo to the island's most trusted online plant store, serving thousands of happy customers.",
    image: "https://images.unsplash.com/photo-1604762512526-b7ce049b5764?w=600&h=400&fit=crop",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1593482892580-e32e47e0edde?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=300&h=300&fit=crop",
];

const About = () => (
  <AppShell>
    {/* Hero */}
    <section className="relative h-64 md:h-80 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&h=400&fit=crop"
        alt="About GreenNest"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white">About Us</h1>
      </div>
    </section>

    {/* Sections */}
    <div className="container py-16 space-y-20">
      {sections.map((s, i) => (
        <div key={s.title} className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
          <div className={`space-y-4 ${i % 2 === 1 ? "md:order-2" : ""}`}>
            <div className="flex items-center gap-2 text-primary">
              <s.icon className="h-5 w-5" />
              <h2 className="text-2xl font-bold">{s.title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{s.text}</p>
          </div>
          <div className={i % 2 === 1 ? "md:order-1" : ""}>
            <img src={s.image} alt={s.title} className="rounded-2xl shadow-lg w-full h-64 object-cover" />
          </div>
        </div>
      ))}
    </div>

    {/* Gallery */}
    <section className="bg-accent/30 py-16">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-8">The GreenNest Journey</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((img, i) => (
            <img key={i} src={img} alt={`Journey ${i + 1}`} className="rounded-xl w-full h-48 object-cover shadow-md" />
          ))}
        </div>
      </div>
    </section>
  </AppShell>
);

export default About;
