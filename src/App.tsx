import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import PublicBookLibrary from "@/components/books/PublicBookLibrary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import { readBookSession } from "@/components/books/bookSession";

const AdminPortal = lazy(() => import("@/components/admin/AdminPortal"));
const Menu = lazy(() => import("./pages/Archive"));
const Object01 = lazy(() => import("./pages/object01"));
const Message = lazy(() => import("./pages/Message"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WatchStudio = lazy(() => import("./pages/WatchStudio"));

const queryClient = new QueryClient();

const AdminRoute = () => {
  const navigate = useNavigate();

  return <AdminPortal onBack={() => navigate("/")} />;
};

const PublicBooksRoute = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();

  return (
    <PublicBookLibrary
      initialSlug={slug ?? null}
      onBack={() => navigate("/")}
      onLogin={() => navigate("/login")}
      onThreeD={() => navigate("/3d")}
      onBookChange={(nextSlug) => {
        navigate(`/book/${encodeURIComponent(nextSlug)}`, {
          replace: true,
        });
      }}
    />
  );
};

const WatchRoute = () => {
  const navigate = useNavigate();

  return (
    <WatchStudio
      onBack={() => {
        const bookSession = readBookSession();

        navigate(
          bookSession
            ? `/book/${encodeURIComponent(bookSession.slug)}`
            : "/books"
        );
      }}
    />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen overflow-scroll scrollbar-hide bg-white dark:bg-black">
          <Toaster />
          <Sonner />

          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Suspense fallback={<div className="fixed inset-0 bg-white" />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/archive" element={<Menu />} />
                <Route path="/message" element={<Message />} />
                <Route path="/object01" element={<Object01 />} />

                <Route path="/login" element={<AdminRoute />} />
                <Route path="/admin" element={<AdminRoute />} />
                <Route path="/3d" element={<WatchRoute />} />

                <Route path="/books" element={<PublicBooksRoute />} />
                <Route path="/book/:slug" element={<PublicBooksRoute />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
