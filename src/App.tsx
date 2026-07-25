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
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Index from "./pages/Index";
import {
  BOOK_INDEX_RETURN_KEY,
  BOOK_INTRO_RETURN_KEY,
  readBookSession,
} from "@/components/books/bookSession";
import AnalyticsConsent from "@/components/privacy/AnalyticsConsent";

const AdminPortal = lazy(() => import("@/components/admin/AdminPortal"));
const Menu = lazy(() => import("./pages/Archive"));
const Object01 = lazy(() => import("./pages/object01"));
const Message = lazy(() => import("./pages/Message"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WatchStudio = lazy(() => import("./pages/WatchStudio"));

const queryClient = new QueryClient();

const AdminRoute = () => {
  const navigate = useNavigate();
  const navigateToOceanIntro = () => {
    window.sessionStorage.setItem(BOOK_INDEX_RETURN_KEY, "true");
    window.sessionStorage.setItem(BOOK_INTRO_RETURN_KEY, "true");
    window.sessionStorage.removeItem("revealDone");
    window.sessionStorage.removeItem("returnFromExample");
    navigate("/");
  };

  return (
    <AdminPortal
      onBack={() => navigate("/")}
      onNavigate={navigateToOceanIntro}
      onLibrary={() => {
        const bookSession = readBookSession();
        navigate(
          bookSession
            ? `/book/${encodeURIComponent(bookSession.slug)}`
            : "/books"
        );
      }}
      onModels={() => navigate("/3d")}
    />
  );
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
      onNavigate={() => navigate("/")}
      onLogin={() => navigate("/login")}
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

const AppViewport = () => {
  const { pathname } = useLocation();
  const showsOceanBackground = pathname === "/";

  return (
    <div
      className={`fixed inset-0 overflow-hidden ${
        showsOceanBackground ? "bg-transparent" : "bg-white dark:bg-black"
      }`}
    >
      <Toaster />
      <Sonner />
      <AnalyticsConsent />

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
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <AppViewport />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
