import { Link } from "wouter";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-serif text-2xl font-bold text-primary cursor-pointer hover:opacity-90">
          <BookOpen className="h-8 w-8 text-secondary" />
          <span>Lamp Academy</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#home" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Home</Link>
          <a href="/#about" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">About Us</a>
          <a href="/#courses" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Courses</a>
          <a href="/#contact" className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Contact</a>
          <Link href="/register" className={cn(buttonVariants({ variant: "default" }), "bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold cursor-pointer")}>
            Apply Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background p-4 flex flex-col gap-4 animate-in slide-in-from-top-5">
          <Link href="/#home" className="text-sm font-medium hover:text-primary cursor-pointer" onClick={() => setIsOpen(false)}>Home</Link>
          <a href="/#about" className="text-sm font-medium hover:text-primary cursor-pointer" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="/#courses" className="text-sm font-medium hover:text-primary cursor-pointer" onClick={() => setIsOpen(false)}>Courses</a>
          <a href="/#contact" className="text-sm font-medium hover:text-primary cursor-pointer" onClick={() => setIsOpen(false)}>Contact</a>
          <Link href="/register" onClick={() => setIsOpen(false)} className={cn(buttonVariants({ variant: "default" }), "w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold cursor-pointer")}>
            Apply Now
          </Link>
        </div>
      )}
    </nav>
  );
}
