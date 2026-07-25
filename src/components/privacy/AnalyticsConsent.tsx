import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ANALYTICS_CONSENT_EVENT,
  readAnalyticsConsent,
  saveAnalyticsConsent,
  trackAnalyticsEvent,
  type AnalyticsConsentChoice,
  type AnalyticsEventName,
  type AnalyticsTargetType,
} from "@/services/analyticsTracker";

const consentStyles = `
.privacy-consent-panel,
.privacy-consent-control {
  font-weight: 400;
}

.privacy-consent-panel {
  left: max(12px, env(safe-area-inset-left));
  right: max(12px, env(safe-area-inset-right));
  bottom: max(12px, env(safe-area-inset-bottom));
  max-width: 760px;
  margin-inline: auto;
  border: 1px solid rgb(0 0 0 / 0.2);
  background: rgb(230 230 230 / 0.98);
  box-shadow: 0 18px 55px rgb(0 0 0 / 0.14);
  opacity: 0;
  transform: translate3d(0, 24px, 0) scale(0.97);
  animation: privacy-consent-enter 620ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both;
}

.privacy-consent-action {
  min-height: 38px;
  border: 1px solid rgb(0 0 0 / 0.38);
  padding: 8px 13px;
  background: transparent;
  color: black;
  font-size: 11px;
  letter-spacing: 0.06em;
  transition:
    color 220ms ease,
    background-color 220ms ease,
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.privacy-consent-action:hover,
.privacy-consent-action:focus-visible,
.privacy-consent-action.is-selected {
  background: black;
  color: white;
}

.privacy-consent-action:active {
  transform: scale(0.98);
}

.privacy-consent-control {
  right: max(12px, env(safe-area-inset-right));
  bottom: max(10px, env(safe-area-inset-bottom));
  border: 0;
  outline: none;
  background: transparent;
  color: rgb(0 0 0 / 0.58);
  font-size: 10px;
  letter-spacing: 0.08em;
}

.privacy-consent-control:hover,
.privacy-consent-control:focus-visible {
  color: black;
  text-decoration: underline;
  text-underline-offset: 4px;
}

@keyframes privacy-consent-enter {
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (max-width: 560px) {
  .privacy-consent-panel {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .privacy-consent-panel {
    animation-duration: 1ms;
    animation-delay: 0ms;
  }
}
`;

type ConsentState = AnalyticsConsentChoice | null;

function isAnalyticsEventName(value: string | undefined): value is AnalyticsEventName {
  return (
    value === "navigation_click" ||
    value === "book_open" ||
    value === "book_page_view" ||
    value === "model_open" ||
    value === "model_interaction" ||
    value === "archive_filter" ||
    value === "outbound_click"
  );
}

function isAnalyticsTargetType(
  value: string | undefined
): value is AnalyticsTargetType {
  return (
    value === "navigation" ||
    value === "book" ||
    value === "book_page" ||
    value === "model" ||
    value === "archive" ||
    value === "external" ||
    value === "interface"
  );
}

export default function AnalyticsConsent() {
  const location = useLocation();
  const [consent, setConsent] = useState<ConsentState>(() =>
    readAnalyticsConsent()
  );
  const [settingsOpen, setSettingsOpen] = useState(consent === null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const choose = useCallback((choice: AnalyticsConsentChoice) => {
    saveAnalyticsConsent(choice);
    setConsent(choice);
    setSettingsOpen(false);
    setDetailsOpen(false);
  }, []);

  useEffect(() => {
    const handleConsentChange = (event: Event) => {
      const choice = (event as CustomEvent<ConsentState>).detail;
      setConsent(choice);
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsentChange);
    return () =>
      window.removeEventListener(
        ANALYTICS_CONSENT_EVENT,
        handleConsentChange
      );
  }, []);

  useEffect(() => {
    if (consent !== "analytics") return;
    void trackAnalyticsEvent({
      eventName: "page_view",
      path: location.pathname,
    });
  }, [consent, location.pathname]);

  useEffect(() => {
    const trackNamedClick = (event: MouseEvent) => {
      if (readAnalyticsConsent() !== "analytics") return;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-analytics-event]")
          : null;
      if (!target) return;

      const eventName = target.dataset.analyticsEvent;
      const targetType = target.dataset.analyticsType;
      const targetId = target.dataset.analyticsId;

      if (
        !isAnalyticsEventName(eventName) ||
        !isAnalyticsTargetType(targetType) ||
        !targetId
      ) {
        return;
      }

      void trackAnalyticsEvent({
        eventName,
        targetType,
        targetId,
      });
    };

    document.addEventListener("click", trackNamedClick, true);
    return () => document.removeEventListener("click", trackNamedClick, true);
  }, []);

  return (
    <>
      <style>{consentStyles}</style>

      {settingsOpen ? (
        <aside
          className="privacy-consent-panel fixed z-[400] p-5"
          role="dialog"
          aria-modal="false"
          aria-labelledby="privacy-consent-title"
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2
                id="privacy-consent-title"
                className="text-[15px] tracking-[0.06em]"
              >
                PRIVACY SETTINGS
              </h2>
              <p className="mt-3 max-w-[66ch] text-[12px] leading-relaxed text-black/62">
                Optional first-party analytics help understand visits, page
                views and named interface clicks. The analytics table stores a
                random session ID, page path, device category and referring
                host—never email, full URLs, free text or a persistent visitor
                profile.
              </p>
            </div>

            {consent !== null && (
              <button
                type="button"
                className="border-0 bg-transparent px-1 text-[16px]"
                onClick={() => setSettingsOpen(false)}
                aria-label="Close privacy settings"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="button"
            className="mt-3 border-0 bg-transparent p-0 text-[11px] underline underline-offset-4"
            onClick={() => setDetailsOpen((open) => !open)}
            aria-expanded={detailsOpen}
          >
            {detailsOpen ? "HIDE DETAILS" : "COOKIE & ANALYTICS DETAILS"}
          </button>

          {detailsOpen && (
            <div className="mt-3 grid gap-3 text-[11px] leading-relaxed text-black/58 sm:grid-cols-2">
              <p>
                NECESSARY: remembers this privacy choice locally for 180 days.
                It does not collect usage statistics.
              </p>
              <p>
                ANALYTICS: creates a new random ID for this browser session and
                sends only the limited first-party events described above.
              </p>
            </div>
          )}

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              className={`privacy-consent-action ${
                consent === "necessary" ? "is-selected" : ""
              }`}
              onClick={() => choose("necessary")}
            >
              NECESSARY ONLY
            </button>
            <button
              type="button"
              className={`privacy-consent-action ${
                consent === "analytics" ? "is-selected" : ""
              }`}
              onClick={() => choose("analytics")}
            >
              ALLOW ANALYTICS
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
