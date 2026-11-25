import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  type Location,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  BOOK_INDEX_RETURN_KEY,
  BOOK_INTRO_RETURN_KEY,
  readBookSession,
} from "@/components/books/bookSession";
import AnalyticsConsent from "@/components/privacy/AnalyticsConsent";
import PortfolioHome from "@/pages/PortfolioHome";
import type { ModelCategory } from "@/types/siteContent";
import { InlineSiteEditingProvider, useInlineSiteEditing } from "@/components/SiteEditControl";
import RouteChoreography from "@/components/navigation/RouteChoreography";
import { loadPreparedOceanPage, preloadOceanExperience, setOceanPreloadEnvironment, setOceanPreloadIntent } from "@/lib/oceanPreload";
import OceanLoadingOverlay from "@/components/ocean/OceanLoadingOverlay";

const AdminPortal = lazy(() => import("@/components/admin/AdminPortal"));
const PublicBookLibrary = lazy(() => import("@/components/books/PublicBookLibrary"));
const loadOceanPage = loadPreparedOceanPage;
const Index = lazy(loadOceanPage);
const Menu = lazy(() => import("./pages/Archive"));
const Object01 = lazy(() => import("./pages/object01"));
const Message = lazy(() => import("./pages/Message"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WatchStudio = lazy(() => import("./pages/WatchStudio"));
const Bio = lazy(() => import("./pages/Bio"));
const Artworks = lazy(() => import("./pages/Artworks"));

const queryClient = new QueryClient();

const AdminRoute = () => {
  const navigate = useNavigate();
  const navigateToOceanIntro = () => {
    window.sessionStorage.setItem(BOOK_INDEX_RETURN_KEY, "true");
    window.sessionStorage.setItem(BOOK_INTRO_RETURN_KEY, "true");
    window.sessionStorage.removeItem("revealDone");
    window.sessionStorage.removeItem("returnFromExample");
    navigate("/navigate");
  };

  return (
    <AdminPortal
      onBack={() => navigate("/")}
      onNavigate={navigateToOceanIntro}
      onLibrary={() => {
        const bookSession = readBookSession();
        navigate(
          bookSession
            ? `/notebooks/${encodeURIComponent(bookSession.slug)}`
            : "/notebooks"
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
        navigate(`/notebooks/${encodeURIComponent(nextSlug)}`, {
          replace: true,
        });
      }}
    />
  );
};

const LegacyBookRoute = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/notebooks/${encodeURIComponent(slug ?? "")}`} replace />;
};

const WatchRoute = ({ category }: { category?: ModelCategory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialModelId = new URLSearchParams(location.search).get("model") ?? undefined;
  const requestedReturn = (location.state as { returnTo?: string } | null)?.returnTo;
  const returnTo = requestedReturn === "/artworks" || requestedReturn === "/fashion" || requestedReturn === "/featured-in" || requestedReturn === "/jewelry" || requestedReturn === "/fashionandjewelry" ? requestedReturn : "/";

  return (
    <WatchStudio
      key={`${category ?? "all"}-${initialModelId ?? "library"}`}
      category={category}
      initialModelId={initialModelId}
      onNavigate={() => navigate("/navigate")}
      onLogin={() => navigate("/login")}
      onBack={() => navigate(returnTo)}
    />
  );
};

const DisplayedViewport = ({ location }: { location: Location }) => {
  const { pathname } = location;
  const showsOceanBackground = pathname === "/navigate";
  const isAdministration = pathname === "/login" || pathname === "/admin";

  useLayoutEffect(() => {
    const appRoot = document.getElementById("root");
    appRoot?.toggleAttribute("data-ocean-surface", showsOceanBackground);
    const host = document.getElementById("global-sky-ocean-bg");
    if (host) {
      host.style.display = showsOceanBackground ? "block" : "none";
      host.setAttribute("data-render-active", showsOceanBackground ? "1" : "0");
      if (!showsOceanBackground) {
        host.setAttribute("data-audio-active", "0");
        host.setAttribute("data-explore", "0");
      }
    }
    // This uses the displayed route, not the requested destination: the ocean
    // keeps rendering until its reverse aperture has completely closed.
    window.dispatchEvent(new CustomEvent("skyocean-render", { detail: { active: showsOceanBackground } }));
    if (!showsOceanBackground) {
      window.dispatchEvent(new CustomEvent("skyocean-audio", { detail: { active: false } }));
      window.dispatchEvent(new CustomEvent("explore-mode", { detail: { enabled: false } }));
    }
    return () => appRoot?.removeAttribute("data-ocean-surface");
  }, [showsOceanBackground]);

  return (
    <div
      className={`fixed inset-0 overflow-hidden bg-transparent ${isAdministration ? "" : "public-display"}`}
    >
      <Toaster />
      <Sonner />
      <AnalyticsConsent />

      <Suspense fallback={<div className="fixed inset-0 bg-white" />}>
        <Routes location={location}>
          <Route path="/" element={<PortfolioHome />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/fashion" element={<Navigate to="/fashionandjewelry" replace />} />
          <Route path="/featured-in" element={<Artworks featuredOnly />} />
          <Route path="/navigate" element={<Index />} />
          <Route path="/archive" element={<Menu />} />
          <Route path="/message" element={<Message />} />
          <Route path="/object01" element={<Object01 />} />

          <Route path="/login" element={<AdminRoute />} />
          <Route path="/admin" element={<AdminRoute />} />
          <Route path="/3d" element={<WatchRoute />} />
          <Route path="/horlogerie" element={<WatchRoute category="horlogerie" />} />
          <Route path="/fashionandjewelry" element={<Artworks jewelryOnly />} />
          <Route path="/jewelry" element={<Navigate to="/fashionandjewelry" replace />} />
          <Route path="/models" element={<WatchRoute category="models" />} />

          <Route path="/notebooks" element={<PublicBooksRoute />} />
          <Route path="/notebooks/:slug" element={<PublicBooksRoute />} />
          <Route path="/sketches" element={<Navigate to="/notebooks" replace />} />
          <Route path="/books" element={<Navigate to="/notebooks" replace />} />
          <Route path="/book/:slug" element={<LegacyBookRoute />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

const AppViewport = () => {
  const destination = useLocation();
  const navigate = useNavigate();
  const inline = useInlineSiteEditing();
  useEffect(() => {
    const ocean = destination.pathname === "/navigate";
    setOceanPreloadIntent(ocean);
    if (!inline.loading) setOceanPreloadEnvironment(inline.settings.ocean_environment);
    if (ocean) void preloadOceanExperience({ intent: true }).catch(() => undefined);
  }, [destination.pathname, inline.loading, inline.settings.ocean_environment]);
  return <><RouteChoreography>{(location) => <DisplayedViewport location={location} />}</RouteChoreography><OceanLoadingOverlay active={destination.pathname === "/navigate"} onCancel={() => navigate("/")} /></>;
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
          <InlineSiteEditingProvider><AppViewport /></InlineSiteEditingProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
