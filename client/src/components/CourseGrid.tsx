import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import codingImg from "@assets/generated_images/coding_on_screen_close_up.png";
import businessImg from "@assets/generated_images/business_meeting_professional.png";
import designImg from "@assets/generated_images/creative_design_workspace.png";

const courses = [
  {
    image: codingImg,
    category: "Technology",
    title: "Full Stack Development",
    duration: "12 Weeks",
    students: "1.2k Students",
    price: "$999"
  },
  {
    image: businessImg,
    category: "Business",
    title: "Digital Marketing Mastery",
    duration: "8 Weeks",
    students: "850 Students",
    price: "$799"
  },
  {
    image: designImg,
    category: "Design",
    title: "UI/UX Design Fundamentals",
    duration: "10 Weeks",
    students: "2k Students",
    price: "$899"
  }
];

export default function CourseGrid() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Popular Courses</h2>
            <p className="text-muted-foreground text-lg">Explore our most sought-after programs designed for modern careers.</p>
          </div>
          <Button variant="outline" className="hidden md:flex">View All Courses</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card key={index} className="group overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute top-4 right-4 bg-white/90 text-foreground hover:bg-white shadow-sm backdrop-blur-sm">
                  {course.category}
                </Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>{course.duration}</span>
                  <span>{course.students}</span>
                </div>
                <CardTitle className="font-serif text-2xl group-hover:text-primary transition-colors">
                  {course.title}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex justify-between items-center border-t pt-6">
                <span className="text-2xl font-bold text-primary">{course.price}</span>
                <Button variant="ghost" className="text-foreground hover:text-primary font-medium p-0 hover:bg-transparent">
                  Learn More →
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <Button variant="outline" className="w-full">View All Courses</Button>
        </div>
      </div>
    </section>
  );
}
