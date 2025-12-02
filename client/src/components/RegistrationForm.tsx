import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookOpen, Upload, Plus, X, User, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/lib/contentContext";

// Schema
const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  nationalId: z.string().min(14, "National ID must be 14 characters").max(14, "National ID must be 14 characters"),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 16, {
    message: "Age must be 16 or older",
  }),
  university: z.string().min(1, "Please select a university"),
  college: z.string().min(2, "College name is required"),
  course: z.string().min(1, "Please select a course"),
  phone: z.string().min(10, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  guardianPhone: z.string().min(10, "Guardian's phone is required"),
  address: z.string().min(10, "Please enter your full address"),
  friends: z.array(
    z.object({
      name: z.string().min(2, "Friend's name is required"),
      phone: z.string().min(10, "Friend's phone is required"),
    })
  ).max(7, "Maximum 7 friends allowed"),
  photo: z.any().optional(),
});

export default function RegistrationForm() {
  const { toast } = useToast();
  const { universities, availableCourses } = useContent();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      nationalId: "",
      age: "",
      university: "",
      college: "",
      course: "",
      phone: "",
      email: "",
      guardianPhone: "",
      address: "",
      friends: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "friends",
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Registration Successful!",
      description: "Welcome to Lamp Academy. We will contact you shortly.",
    });
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto text-center p-6">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Registration Complete!</h2>
        <p className="text-slate-600 mb-8">
          Thank you for registering with Lamp Academy. Your application has been received and is being processed.
        </p>
        <Button onClick={() => setIsSubmitted(false)} className="w-full bg-primary">Register Another Student</Button>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-slate-900">Student Registration</h2>
        <p className="mt-2 text-lg text-slate-600">Join Lamp Academy and start your IT journey today</p>
      </div>

      <Card className="shadow-xl border-0">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Personal Information
                </h3>
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="nationalId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>National ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your national ID" maxLength={14} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Enter your age" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your university" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {universities.map((uni) => (
                              <SelectItem key={uni.id} value={uni.value}>{uni.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="college"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your college name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Selection</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableCourses.map((course) => (
                              <SelectItem key={course.id} value={course.value}>{course.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Contact Details</h3>
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guardianPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guardian's Phone</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter guardian's phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter your full address" className="min-h-[80px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Friends / Group Discount */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Add Friends</h3>
                    <p className="text-sm text-muted-foreground">Optional - Get Group Discount!</p>
                  </div>
                  <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {fields.length}/7 Friends
                  </span>
                </div>
                <Separator />

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-4 items-start bg-slate-50 p-4 rounded-lg">
                      <FormField
                        control={form.control}
                        name={`friends.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Friend's Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`friends.${index}.phone`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Friend's Phone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="text-destructive hover:text-destructive/90"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {fields.length < 7 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append({ name: "", phone: "" })}
                      className="w-full border-dashed"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Friend
                    </Button>
                  )}
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Photo Upload (Optional)</h3>
                <Separator />
                
                <div className="flex items-center gap-6">
                  <div className="shrink-0">
                    {photoPreview ? (
                      <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                        <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity text-white"
                        >
                          <X className="h-8 w-8" />
                        </button>
                      </div>
                    ) : (
                      <div className="h-32 w-32 rounded-full bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300 text-slate-400">
                        <User className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <FormLabel className="block mb-2">Choose a photo</FormLabel>
                    <Input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoChange}
                      className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload a recent passport-size photo. JPG or PNG, max 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold text-lg h-12 cursor-pointer">
                  Register Now
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="text-center mt-8">
         <p className="text-slate-600">Have questions?</p>
         <Button variant="link" className="text-primary font-bold">Get In Touch</Button>
      </div>
    </div>
  );
}
