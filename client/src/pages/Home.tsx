import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import CourseGrid from "@/components/CourseGrid";
import Footer from "@/components/Footer";

import RegistrationForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <FeatureSection />
        </div>
        <div id="courses">
          <CourseGrid />
        </div>
        <div id="register" className="py-24 bg-slate-50">
          <div className="container mx-auto px-4">
            <RegistrationForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
