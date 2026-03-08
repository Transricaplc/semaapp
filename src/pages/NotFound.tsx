import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BookOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-20 h-20 mx-auto mb-6 relative">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-destructive flex items-center justify-center">
            <X className="w-4 h-4 text-white" />
          </div>
        </div>
        <h1 className="mb-2 text-4xl font-heading font-bold text-foreground">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">Page not found</p>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-yb-yellow-deep font-bold">
          <Link to="/saka-viongozi">Back to Directory</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
