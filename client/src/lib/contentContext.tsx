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

export interface FormOption {
  id: string;
  label: string;
  value: string;
}

interface ContentContextType {
  hero: HeroContent;
  updateHero: (newHero: HeroContent) => void;
  courses: Course[];
  addCourse: (course: Course) => void;
  updateCourse: (id: string, course: Course) => void;
  deleteCourse: (id: string) => void;
  
  // Form Options
  universities: FormOption[];
  addUniversity: (uni: FormOption) => void;
  removeUniversity: (id: string) => void;
  updateUniversity: (id: string, uni: FormOption) => void;

  availableCourses: FormOption[];
  addAvailableCourse: (course: FormOption) => void;
  removeAvailableCourse: (id: string) => void;
  updateAvailableCourse: (id: string, course: FormOption) => void;
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

const defaultUniversities: FormOption[] = [
  { id: "1", label: "Cairo University", value: "Cairo University" },
  { id: "2", label: "Ain Shams University", value: "Ain Shams University" },
  { id: "3", label: "Alexandria University", value: "Alexandria University" },
  { id: "4", label: "Mansoura University", value: "Mansoura University" },
  { id: "5", label: "Assiut University", value: "Assiut University" },
  { id: "6", label: "Helwan University", value: "Helwan University" },
  { id: "7", label: "Zagazig University", value: "Zagazig University" },
  { id: "8", label: "Other", value: "Other" }
];

const defaultAvailableCourses: FormOption[] = [
  { id: "1", label: "Full Stack Development", value: "Full Stack Development" },
  { id: "2", label: "Digital Marketing Mastery", value: "Digital Marketing Mastery" },
  { id: "3", label: "UI/UX Design Fundamentals", value: "UI/UX Design Fundamentals" },
  { id: "4", label: "Data Science Essentials", value: "Data Science Essentials" },
  { id: "5", label: "Business Management", value: "Business Management" }
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

  const [universities, setUniversities] = useState<FormOption[]>(() => {
    const saved = localStorage.getItem("lamp_universities");
    return saved ? JSON.parse(saved) : defaultUniversities;
  });

  const [availableCourses, setAvailableCourses] = useState<FormOption[]>(() => {
    const saved = localStorage.getItem("lamp_available_courses");
    return saved ? JSON.parse(saved) : defaultAvailableCourses;
  });


  // Persist to localStorage
  useEffect(() => { localStorage.setItem("lamp_hero", JSON.stringify(hero)); }, [hero]);
  useEffect(() => { localStorage.setItem("lamp_courses", JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem("lamp_universities", JSON.stringify(universities)); }, [universities]);
  useEffect(() => { localStorage.setItem("lamp_available_courses", JSON.stringify(availableCourses)); }, [availableCourses]);

  const updateHero = (newHero: HeroContent) => setHero(newHero);
  const addCourse = (course: Course) => setCourses([...courses, course]);
  const updateCourse = (id: string, updatedCourse: Course) => setCourses(courses.map(c => c.id === id ? updatedCourse : c));
  const deleteCourse = (id: string) => setCourses(courses.filter(c => c.id !== id));

  const addUniversity = (uni: FormOption) => setUniversities([...universities, uni]);
  const removeUniversity = (id: string) => setUniversities(universities.filter(u => u.id !== id));
  const updateUniversity = (id: string, uni: FormOption) => setUniversities(universities.map(u => u.id === id ? uni : u));

  const addAvailableCourse = (course: FormOption) => setAvailableCourses([...availableCourses, course]);
  const removeAvailableCourse = (id: string) => setAvailableCourses(availableCourses.filter(c => c.id !== id));
  const updateAvailableCourse = (id: string, course: FormOption) => setAvailableCourses(availableCourses.map(c => c.id === id ? course : c));

  return (
    <ContentContext.Provider value={{ 
      hero, updateHero, 
      courses, addCourse, updateCourse, deleteCourse,
      universities, addUniversity, removeUniversity, updateUniversity,
      availableCourses, addAvailableCourse, removeAvailableCourse, updateAvailableCourse
    }}>
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
