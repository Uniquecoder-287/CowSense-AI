import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import CowList from "@/pages/CowList";
import CowDetails from "@/pages/CowDetails";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/herd" component={CowList} />
      <Route path="/cow/:id" component={CowDetails} />
      
      {/* Redirect placeholder routes back to home for now */}
      <Route path="/alerts">
        <Redirect to="/" />
      </Route>
      <Route path="/settings">
        <Redirect to="/" />
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
