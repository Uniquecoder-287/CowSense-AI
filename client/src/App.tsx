import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider, useApp } from "@/lib/appContext";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import CowList from "@/pages/CowList";
import CowDetails from "@/pages/CowDetails";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import Login from "@/pages/Login";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useApp();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/herd">
        <ProtectedRoute component={CowList} />
      </Route>
      <Route path="/cow/:id">
        <ProtectedRoute component={CowDetails} />
      </Route>
      <Route path="/notifications">
        <ProtectedRoute component={Notifications} />
      </Route>
      <Route path="/settings">
        <ProtectedRoute component={Settings} />
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Toaster />
        <Router />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
