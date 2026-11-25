import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingLogo from "@/components/LoadingLogo";
import SiteEditControl, { useInlineSiteEditing } from "@/components/SiteEditControl";
import { usePublishedFeaturedAvailability, useSiteContent } from "@/hooks/useSiteContent";
import type { MenuKey } from "@/types/siteContent";
import { BOOK_INTRO_RETURN_KEY } from "@/components/books/bookSession";
import { uploadSiteAsset } from "@/services/siteContentRepository";
import originalLogo from "@/Portrait/WolfyLight.gif";
import { activeMenuItems, moveActiveMenuItem } from "@/lib/siteMenu";
import { preloadOceanExperience, scheduleOceanPreload } from "@/lib/oceanPreload";
import "@/styles/portfolio.css";

const destinations: Record<MenuKey, string> = {
  bio: "/bio", sketches: "/notebooks", artworks: "/artworks", horlogerie: "/horlogerie",
  jewelry: "/fashionandjewelry", fashion: "/fashion", models: "/models", featured: "/featured-in", navigate: "/navigate",
};

export default function PortfolioHome() {
  const { loading } = useSiteContent();
  const { editing, settings: saved, draft, update } = useInlineSiteEditing();
  const currentEdit = useRef({ editing, draft, update });
  currentEdit.current = { editing, draft, update };
  const settings = editing ? draft : saved;
  const navigate = useNavigate();
  const [splash, setSplash] = useState(() => sessionStorage.getItem("studierzimmer:splash-seen") !== "true");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [selectedMenu, setSelectedMenu] = useState<MenuKey | null>(null);
  const menu = useRef<HTMLElement>(null);
  const completeSplash = useCallback(() => {
    sessionStorage.setItem("studierzimmer:splash-seen", "true");
    setSplash(false);
  }, []);

  const menuItems = activeMenuItems(settings.menu_items);
  const checkFeatured = !editing && menuItems.some((item) => item.id === "featured" && item.visible);
  const featuredAvailable = usePublishedFeaturedAvailability(checkFeatured);
  const items = menuItems.filter((item) => item.visible && (editing || item.id !== "featured" || featuredAvailable !== false));
  const oceanAvailable = items.some((item) => item.id === "navigate");
  useEffect(() => {
    if (splash || editing || !oceanAvailable || (checkFeatured && featuredAvailable === null)) return;
    return scheduleOceanPreload(menu.current);
  }, [splash, editing, oceanAvailable, checkFeatured, featuredAvailable]);
  const openSection = (key: MenuKey) => {
    if (editing) return;
    setSelectedMenu(key);
    if (key === "navigate") {
      void preloadOceanExperience({ intent: true }).catch(() => undefined);
      sessionStorage.setItem(BOOK_INTRO_RETURN_KEY, "true");
      sessionStorage.removeItem("revealDone");
    }
    navigate(destinations[key]);
  };

  if (splash) {
    if (loading) return <div className="portfolio-page" aria-label="Caricamento" />;
    return <LoadingLogo logoUrl={settings.splash_logo_url} onComplete={completeSplash} autoCompleteAfter={1900} showProgress={false} />;
  }

  // Resolve initial presence before mounting the menu, without delaying the
  // existing splash animation. Returning visits also avoid a disappearing item.
  if (checkFeatured && featuredAvailable === null) return <div className="portfolio-page" aria-label="Caricamento" />;

  return (
    <main className="portfolio-page portfolio-home">
      <nav ref={menu} aria-label="Studier Zimmer" className="portfolio-menu" data-selected-menu={selectedMenu ?? undefined} style={{ fontFamily: settings.menu_font_family, fontSize: `${settings.menu_font_size}px`, letterSpacing: `${settings.menu_letter_spacing}px` }}>
        {items.map((item, index) => (
          <div key={item.id} data-menu-entry={item.id} data-blossom className="portfolio-menu-piece blossom" style={{ animationDelay: `${index * 60}ms` }}>
            {editing ? <input className={`inline-menu-title ${item.id === "navigate" ? "is-ocean-title" : ""}`} aria-label={`Titolo ${item.id}`} value={item.label} onChange={(event) => update({ menu_items: draft.menu_items.map((entry) => entry.id === item.id ? { ...entry, label: event.target.value } : entry) })} /> : <button type="button" className={`portfolio-menu-item ${item.id === "navigate" ? "is-ocean-title" : ""}`} onClick={() => openSection(item.id)}>
              {item.image_url ? <img src={item.image_url} alt={item.label} className="portfolio-title-image" /> : item.id === "navigate" ? <em>{item.label}</em> : <span>{item.label}</span>}
            </button>}
            {editing && <label className="inline-title-upload">{item.image_url ? "sostituisci PNG · solo menu" : "titolo PNG · solo menu"}<input aria-label={`Immagine titolo ${item.id}`} type="file" accept="image/png,image/webp,image/jpeg" onChange={async (event) => {
              const file = event.target.files?.[0]; if (!file) return;
              try {
                const url = await uploadSiteAsset(file);
                const latest = currentEdit.current;
                // Uploading the menu drawing must not overwrite text/order
                // edits made while waiting, or revive a cancelled edit.
                if (!latest.editing) return;
                latest.update({ menu_items: latest.draft.menu_items.map((entry) => entry.id === item.id ? { ...entry, image_url: url } : entry) });
                setUploadError(null);
              }
              catch(error) { setUploadError(error instanceof Error ? error.message : "Upload non riuscito"); }
            }} /></label>}
            {editing && item.image_url && <button className="inline-title-upload" onClick={() => update({ menu_items: draft.menu_items.map((entry) => entry.id === item.id ? { ...entry, image_url: null } : entry) })}>usa testo</button>}
            {editing && <div className="inline-menu-order" aria-label={`Ordine ${item.label}`}><button type="button" aria-label={`Sposta ${item.label} prima`} disabled={menuItems[0]?.id === item.id} onClick={() => update({ menu_items: moveActiveMenuItem(draft.menu_items, item.id, menuItems.findIndex((entry) => entry.id === item.id) - 1) })}>↑</button><button type="button" aria-label={`Sposta ${item.label} dopo`} disabled={menuItems[menuItems.length - 1]?.id === item.id} onClick={() => update({ menu_items: moveActiveMenuItem(draft.menu_items, item.id, menuItems.findIndex((entry) => entry.id === item.id) + 1) })}>↓</button></div>}
          </div>
        ))}
      </nav>
      {editing && <div className="inline-logo-edit"><img src={draft.splash_logo_url || originalLogo} alt="Logo splash" /><label>cambia logo<input type="file" accept="image/*" aria-label="Cambia logo splash" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; try { update({ splash_logo_url: await uploadSiteAsset(file) }); setUploadError(null); } catch(error) { setUploadError(error instanceof Error ? error.message : "Upload non riuscito"); } }} /></label><button onClick={() => update({ splash_logo_url: null })}>originale</button></div>}
      {editing && uploadError && <p role="alert" className="inline-field-error">{uploadError}</p>}
      <SiteEditControl />
    </main>
  );
}
