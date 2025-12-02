import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Trash2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Registration {
  id: string;
  full_name: string;
  national_id: string;
  age: number;
  university: string;
  college: string;
  course: string;
  phone: string;
  email: string;
  guardian_phone: string;
  address: string;
  friends: Array<{ name: string; phone: string }>;
  photo_url: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export default function ViewRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/registrations");
      const result = await response.json();
      if (result.success) {
        setRegistrations(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
      toast({
        title: "Error",
        description: "Failed to load registrations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/registrations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast({ title: "Success", description: "Status updated successfully" });
        fetchRegistrations();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({ title: "Success", description: "Registration deleted successfully" });
        fetchRegistrations();
      }
    } catch (error) {
      console.error("Failed to delete registration:", error);
      toast({
        title: "Error",
        description: "Failed to delete registration",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-slate-900">Student Registrations</h1>
        <p className="text-slate-500">View and manage all student registration applications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Registrations ({registrations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading...</div>
          ) : registrations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No registrations yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>University</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.full_name}</TableCell>
                      <TableCell>{reg.email}</TableCell>
                      <TableCell>{reg.course}</TableCell>
                      <TableCell>{reg.university}</TableCell>
                      <TableCell>{getStatusBadge(reg.status)}</TableCell>
                      <TableCell>{new Date(reg.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedRegistration(reg);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4 text-slate-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(reg.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {selectedRegistration.photo_url ? (
                  <img
                    src={selectedRegistration.photo_url}
                    alt={selectedRegistration.full_name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-slate-400" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold">{selectedRegistration.full_name}</h3>
                  <p className="text-muted-foreground">{selectedRegistration.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  defaultValue={selectedRegistration.status}
                  onValueChange={(value) => handleStatusChange(selectedRegistration.id, value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">National ID</label>
                  <p className="text-sm">{selectedRegistration.national_id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Age</label>
                  <p className="text-sm">{selectedRegistration.age}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-sm">{selectedRegistration.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Guardian Phone</label>
                  <p className="text-sm">{selectedRegistration.guardian_phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">University</label>
                  <p className="text-sm">{selectedRegistration.university}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">College</label>
                  <p className="text-sm">{selectedRegistration.college}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Course</label>
                  <p className="text-sm">{selectedRegistration.course}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Registered</label>
                  <p className="text-sm">{new Date(selectedRegistration.created_at).toLocaleString()}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="text-sm">{selectedRegistration.address}</p>
              </div>

              {selectedRegistration.friends && selectedRegistration.friends.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Friends ({selectedRegistration.friends.length})</label>
                  <div className="mt-2 space-y-2">
                    {selectedRegistration.friends.map((friend, index) => (
                      <div key={index} className="bg-slate-50 p-3 rounded-md">
                        <p className="text-sm font-medium">{friend.name}</p>
                        <p className="text-xs text-muted-foreground">{friend.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
