import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/lib/contentContext";
import { Link } from "wouter";

export default function Hero() {
  const { hero } = useContent();

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.image} 
          alt="University Classroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto text-center text-white max-w-4xl">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/20 text-secondary border border-secondary/50 text-sm font-bold mb-6 backdrop-blur-sm">
            {hero.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg h-14 px-8 cursor-pointer">
                {hero.ctaPrimary}
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10 text-lg h-14 px-8">
              {hero.ctaSecondary} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
