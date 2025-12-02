import { GraduationCap, Users, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: GraduationCap,
    title: "Expert Faculty",
    description: "Learn from industry leaders and distinguished professors who are dedicated to your success."
  },
  {
    icon: Users,
    title: "Community Focus",
    description: "Join a vibrant community of scholars and peers from diverse backgrounds and cultures."
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Access course materials anytime, anywhere with our state-of-the-art digital learning platform."
  },
  {
    icon: Award,
    title: "Recognized Degrees",
    description: "Earn accredited qualifications that are respected and valued by employers worldwide."
  }
];

export default function FeatureSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Why Choose Lamp Academy?</h2>
          <p className="text-muted-foreground text-lg">We provide an environment that fosters intellectual growth and professional development.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
