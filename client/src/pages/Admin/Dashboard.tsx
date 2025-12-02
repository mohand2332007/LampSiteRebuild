import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContent } from "@/lib/contentContext";
import { Users, GraduationCap, ClipboardList, CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { courses } = useContent();
  const [registrationCount, setRegistrationCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    fetch("/api/registrations")
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setRegistrationCount(result.data.length);
          setPendingCount(result.data.filter((r: any) => r.status === "pending").length);
        }
      })
      .catch(console.error);
  }, []);

  const stats = [
    { label: "Total Courses", value: courses.length, icon: GraduationCap, color: "text-blue-500" },
    { label: "Total Registrations", value: registrationCount, icon: ClipboardList, color: "text-green-500" },
    { label: "Pending Review", value: pendingCount, icon: Users, color: "text-orange-500" },
  ];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back to the Lamp Academy CMS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/registrations">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              View All Registrations
            </Button>
          </Link>
          <Link href="/admin/courses">
            <Button variant="outline" className="w-full justify-start gap-2">
              <GraduationCap className="h-4 w-4" />
              Manage Courses
            </Button>
          </Link>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
