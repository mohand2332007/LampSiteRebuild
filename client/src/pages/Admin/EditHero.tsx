import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useContent } from "@/lib/contentContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EditHero() {
  const { hero, updateHero } = useContent();
  const { register, handleSubmit, reset } = useForm({ defaultValues: hero });
  const { toast } = useToast();

  useEffect(() => {
    reset(hero);
  }, [hero, reset]);

  const onSubmit = (data: any) => {
    updateHero({ ...hero, ...data });
    toast({
      title: "Success",
      description: "Hero section updated successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Edit Hero Section</h1>
        <p className="text-slate-500">Manage the main landing banner of your website.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Content Editor</CardTitle>
            <CardDescription>Update the text and imagery displayed in the hero.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="badge">Badge Text</Label>
                <Input id="badge" {...register("badge")} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Main Title</Label>
                <Input id="title" {...register("title")} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea id="subtitle" {...register("subtitle")} className="min-h-[100px]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ctaPrimary">Primary Button</Label>
                  <Input id="ctaPrimary" {...register("ctaPrimary")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaSecondary">Secondary Button</Label>
                  <Input id="ctaSecondary" {...register("ctaSecondary")} />
                </div>
              </div>

              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/5 border-dashed">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border p-4">
               <div className="aspect-video bg-slate-100 relative rounded-md overflow-hidden mb-4">
                 <img src={hero.image} className="w-full h-full object-cover opacity-50" alt="Preview" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                   <span className="text-xs font-bold bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full mb-2">{hero.badge}</span>
                   <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">{hero.title}</h3>
                   <p className="text-xs text-slate-600 mb-4 line-clamp-2">{hero.subtitle}</p>
                   <div className="flex gap-2">
                     <div className="bg-secondary h-6 w-20 rounded"></div>
                     <div className="border border-slate-300 h-6 w-20 rounded"></div>
                   </div>
                 </div>
               </div>
               <p className="text-center text-xs text-muted-foreground">Simplified preview. Check homepage for actual rendering.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
