import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useContent } from "@/lib/contentContext";
import { useForm } from "react-hook-form";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Course } from "@/lib/contentContext";

// Default images for new courses (since we can't upload)
import codingImg from "@assets/generated_images/coding_on_screen_close_up.png";

export default function EditCourses() {
  const { courses, addCourse, deleteCourse, updateCourse } = useContent();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Course>();

  const openAddModal = () => {
    setEditingCourse(null);
    reset({
      id: Math.random().toString(36).substr(2, 9),
      image: codingImg, // Default image
      category: "",
      title: "",
      duration: "",
      students: "0 Students",
      price: ""
    });
    setIsDialogOpen(true);
  };

  const openEditModal = (course: Course) => {
    setEditingCourse(course);
    // Manually set values because reset() might be async or tricky with defaultValues
    setValue("id", course.id);
    setValue("image", course.image);
    setValue("category", course.category);
    setValue("title", course.title);
    setValue("duration", course.duration);
    setValue("students", course.students);
    setValue("price", course.price);
    setIsDialogOpen(true);
  };

  const onSubmit = (data: Course) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, data);
      toast({ title: "Course Updated", description: `${data.title} has been updated.` });
    } else {
      addCourse(data);
      toast({ title: "Course Added", description: `${data.title} has been added.` });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      deleteCourse(id);
      toast({ title: "Deleted", description: "Course removed successfully." });
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">Manage Courses</h1>
          <p className="text-slate-500">Add, edit, or remove courses from the catalog.</p>
        </div>
        <Button onClick={openAddModal} className="bg-primary">
          <Plus className="mr-2 h-4 w-4" /> Add New Course
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Course Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(course)}>
                      <Pencil className="h-4 w-4 text-slate-500" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input {...register("title", { required: true })} />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input {...register("category", { required: true })} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input {...register("duration", { required: true })} placeholder="e.g., 8 Weeks" />
              </div>
              <div className="space-y-2">
                <Label>Price</Label>
                <Input {...register("price", { required: true })} placeholder="$999" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Students (Display Text)</Label>
              <Input {...register("students")} placeholder="e.g., 1.2k Students" />
            </div>

            <Button type="submit" className="w-full">{editingCourse ? "Update Course" : "Create Course"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
