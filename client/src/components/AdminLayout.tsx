import { Link, useLocation } from "wouter";
import { BookOpen, LayoutDashboard, Image as ImageIcon, GraduationCap, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview" },
    { href: "/admin/hero", icon: ImageIcon, label: "Hero Section" },
    { href: "/admin/courses", icon: GraduationCap, label: "Courses" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <Link href="/admin" className="flex items-center gap-2 font-serif text-xl font-bold text-primary hover:opacity-80">
            <BookOpen className="h-6 w-6 text-secondary" />
            <span>Lamp Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <Link href="/">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              View Website
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-serif font-bold text-primary">
            <BookOpen className="h-6 w-6 text-secondary" />
            <span>Lamp Admin</span>
          </div>
          <Link href="/">
             <Button size="sm" variant="ghost">Exit</Button>
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
