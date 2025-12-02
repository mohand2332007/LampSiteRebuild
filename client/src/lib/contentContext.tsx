import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import codingImg from "@assets/generated_images/coding_on_screen_close_up.png";
import businessImg from "@assets/generated_images/business_meeting_professional.png";
import designImg from "@assets/generated_images/creative_design_workspace.png";
import heroImage from "@assets/generated_images/modern_bright_classroom_with_students.png";

// Types
export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: string;
}

export interface Course {
  id: string;
  image: string;
  category: string;
  title: string;
  duration: string;
  students: string;
  price: string;
}

interface ContentContextType {
  hero: HeroContent;
  updateHero: (newHero: HeroContent) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Course) => void;
  deleteCourse: (id: string) => void;
}

// Default Data
const defaultHero: HeroContent = {
  badge: "Admissions Open for 2025",
  title: "Illuminating Minds, Shaping Futures",
  subtitle: "Experience world-class education designed to empower the next generation of leaders, innovators, and thinkers.",
  ctaPrimary: "Start Your Journey",
  ctaSecondary: "View Programs",
  image: heroImage
};

const defaultCourses: Course[] = [
  {
    id: "1",
    image: codingImg,
    category: "Technology",
    title: "Full Stack Development",
    duration: "12 Weeks",
    students: "1.2k Students",
    price: "$999"
  },
  {
    id: "2",
    image: businessImg,
    category: "Business",
    title: "Digital Marketing Mastery",
    duration: "8 Weeks",
    students: "850 Students",
    price: "$799"
  },
  {
    id: "3",
    image: designImg,
    category: "Design",
    title: "UI/UX Design Fundamentals",
    duration: "10 Weeks",
    students: "2k Students",
    price: "$899"
  }
];

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  // Initialize state from localStorage or defaults
  const [hero, setHero] = useState<HeroContent>(() => {
    const saved = localStorage.getItem("lamp_hero");
    return saved ? JSON.parse(saved) : defaultHero;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem("lamp_courses");
    return saved ? JSON.parse(saved) : defaultCourses;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("lamp_hero", JSON.stringify(hero));
  }, [hero]);

  useEffect(() => {
    localStorage.setItem("lamp_courses", JSON.stringify(courses));
  }, [courses]);

  const updateHero = (newHero: HeroContent) => {
    setHero(newHero);
  };

  const addCourse = (course: Course) => {
    setCourses([...courses, course]);
  };

  const updateCourse = (id: string, updatedCourse: Course) => {
    setCourses(courses.map(c => c.id === id ? updatedCourse : c));
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  return (
    <ContentContext.Provider value={{ hero, updateHero, courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
