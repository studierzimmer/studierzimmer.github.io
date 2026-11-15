import SiteEditControl, { useInlineSiteEditing } from "@/components/SiteEditControl";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import "@/styles/portfolio.css";

export default function Bio() {
  const { editing, settings: saved, draft, update } = useInlineSiteEditing();
  const settings = editing ? draft : saved;
  return (
    <main className="portfolio-page portfolio-bio">
      <SectionNavigation section="bio" />
      <article className="bio-text blossom" data-blossom style={{ fontFamily: settings.bio_font_family, fontSize: `${settings.bio_font_size}px`, lineHeight: settings.bio_line_height, textAlign: settings.bio_text_align }}>
        {editing ? <textarea aria-label="Testo BIO" className="inline-bio-text" value={draft.bio_text} onChange={(event) => update({ bio_text: event.target.value })} rows={Math.max(8, draft.bio_text.split("\n").length + 4)} /> : settings.bio_text.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      </article>
      <SiteEditControl section="bio" />
    </main>
  );
}
