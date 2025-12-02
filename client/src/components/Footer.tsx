import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-serif text-2xl font-bold text-white">
              <BookOpen className="h-8 w-8 text-secondary" />
              <span>Lamp Academy</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Empowering students with knowledge and skills for a brighter future. Join our global community of learners today.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-secondary transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-secondary transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-secondary transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="hover:text-secondary transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-secondary transition-colors cursor-pointer">Home</Link></li>
              <li><a href="#" className="hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">All Courses</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Admissions</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Programs</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-secondary transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Digital Marketing</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Data Science</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Graphic Design</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">Business Management</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-serif font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-1" />
                <span>123 Education Lane, Knowledge City, ST 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span>admissions@lampacademy.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Lamp Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
