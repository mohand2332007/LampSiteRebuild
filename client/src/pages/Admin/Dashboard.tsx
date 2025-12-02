import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useContent } from "@/lib/contentContext";
import { Users, GraduationCap, Eye } from "lucide-react";

export default function Dashboard() {
  const { courses } = useContent();

  const stats = [
    { label: "Total Courses", value: courses.length, icon: GraduationCap, color: "text-blue-500" },
    { label: "Active Students", value: "4,250", icon: Users, color: "text-green-500" },
    { label: "Site Visits", value: "12.5k", icon: Eye, color: "text-purple-500" },
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
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">No recent activity to display.</p>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
