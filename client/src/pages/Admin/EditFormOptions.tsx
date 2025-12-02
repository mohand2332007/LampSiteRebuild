import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useContent, FormOption } from "@/lib/contentContext";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function EditFormOptions() {
  const { 
    universities, addUniversity, removeUniversity, updateUniversity,
    availableCourses, addAvailableCourse, removeAvailableCourse, updateAvailableCourse
  } = useContent();
  
  const { toast } = useToast();
  const [isUniDialogOpen, setIsUniDialogOpen] = useState(false);
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FormOption | null>(null);

  // University Form
  const UniForm = () => {
    const { register, handleSubmit, reset, setValue } = useForm<FormOption>({
      defaultValues: editingItem || { id: "", label: "", value: "" }
    });

    const onSubmit = (data: FormOption) => {
      if (editingItem) {
        updateUniversity(editingItem.id, { ...data, id: editingItem.id });
        toast({ title: "Updated", description: "University updated successfully" });
      } else {
        addUniversity({ ...data, id: Math.random().toString(36).substr(2, 9) });
        toast({ title: "Added", description: "University added successfully" });
      }
      setIsUniDialogOpen(false);
      setEditingItem(null);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>University Name (Label)</Label>
          <Input {...register("label", { required: true })} placeholder="e.g. Cairo University" />
        </div>
        <div className="space-y-2">
          <Label>Value (Internal)</Label>
          <Input {...register("value", { required: true })} placeholder="e.g. Cairo University" />
        </div>
        <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"}</Button>
      </form>
    );
  };

  // Course Form
  const CourseForm = () => {
    const { register, handleSubmit, reset } = useForm<FormOption>({
      defaultValues: editingItem || { id: "", label: "", value: "" }
    });

    const onSubmit = (data: FormOption) => {
      if (editingItem) {
        updateAvailableCourse(editingItem.id, { ...data, id: editingItem.id });
        toast({ title: "Updated", description: "Course option updated successfully" });
      } else {
        addAvailableCourse({ ...data, id: Math.random().toString(36).substr(2, 9) });
        toast({ title: "Added", description: "Course option added successfully" });
      }
      setIsCourseDialogOpen(false);
      setEditingItem(null);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Course Name (Label)</Label>
          <Input {...register("label", { required: true })} placeholder="e.g. Full Stack Development" />
        </div>
        <div className="space-y-2">
          <Label>Value (Internal)</Label>
          <Input {...register("value", { required: true })} placeholder="e.g. Full Stack Development" />
        </div>
        <Button type="submit" className="w-full">{editingItem ? "Update" : "Add"}</Button>
      </form>
    );
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Form Options</h1>
        <p className="text-slate-500">Manage the dropdown options for the Student Registration form.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Universities Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Universities</CardTitle>
              <CardDescription>Manage university dropdown options</CardDescription>
            </div>
            <Button size="sm" onClick={() => { setEditingItem(null); setIsUniDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {universities.map((uni) => (
                  <TableRow key={uni.id}>
                    <TableCell>{uni.label}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setEditingItem(uni); setIsUniDialogOpen(true); }}>
                        <Pencil className="h-4 w-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeUniversity(uni.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Course Selection Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Course Selection</CardTitle>
              <CardDescription>Manage course dropdown options in form</CardDescription>
            </div>
            <Button size="sm" onClick={() => { setEditingItem(null); setIsCourseDialogOpen(true); }}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Label</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>{course.label}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => { setEditingItem(course); setIsCourseDialogOpen(true); }}>
                        <Pencil className="h-4 w-4 text-slate-500" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => removeAvailableCourse(course.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <Dialog open={isUniDialogOpen} onOpenChange={setIsUniDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit University" : "Add University"}</DialogTitle>
          </DialogHeader>
          <UniForm />
        </DialogContent>
      </Dialog>

      <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit Course Option" : "Add Course Option"}</DialogTitle>
          </DialogHeader>
          <CourseForm />
        </DialogContent>
      </Dialog>

    </AdminLayout>
  );
}
