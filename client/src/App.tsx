import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ContentProvider } from "@/lib/contentContext";

import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Admin/Dashboard";
import EditHero from "@/pages/Admin/EditHero";
import EditCourses from "@/pages/Admin/EditCourses";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/register" component={Register} />
      
      {/* Admin Routes */}
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/hero" component={EditHero} />
      <Route path="/admin/courses" component={EditCourses} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContentProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ContentProvider>
    </QueryClientProvider>
  );
}

export default App;
