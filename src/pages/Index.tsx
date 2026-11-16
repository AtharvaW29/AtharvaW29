import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import QuickView from "@/components/quick/QuickView";

// Phaser is large, so the game only loads when it is actually shown.
const GameView = lazy(() => import("@/components/game/GameView"));

type View = "game" | "quick";

const QUICK_HASH = "#resume";
const PLAY_HASH = "#play";

function initialView(): View {
  if (window.location.hash === QUICK_HASH) return "quick";
  if (window.location.hash === PLAY_HASH) return "game";
  // Small touch screens start on the readable page; the game is one tap away.
  const smallTouch =
    window.matchMedia("(max-width: 640px)").matches &&
    window.matchMedia("(pointer: coarse)").matches;
  return smallTouch ? "quick" : "game";
}

const Index = () => {
  const [view, setView] = useState<View>(initialView);

  const go = useCallback((next: View) => {
    window.history.replaceState(null, "", next === "quick" ? QUICK_HASH : PLAY_HASH);
    window.scrollTo(0, 0);
    setView(next);
  }, []);

  // Follow manual hash edits and back/forward navigation.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === QUICK_HASH) setView("quick");
      else if (window.location.hash === PLAY_HASH) setView("game");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("px-body-game", view === "game");
    return () => document.body.classList.remove("px-body-game");
  }, [view]);

  return (
    <>
      <Helmet>
        <title>Atharva Wagh | Software Engineer</title>
        <meta
          name="description"
          content="Atharva Wagh - Software Engineer and MS CS student at USC. Explore his experience, projects and research as a 2D pixel-art town, or read the one-page version."
        />
      </Helmet>

      {view === "game" ? (
        <Suspense fallback={<div className="px-loading">Loading...</div>}>
          <GameView onQuickView={() => go("quick")} />
        </Suspense>
      ) : (
        <QuickView onPlay={() => go("game")} />
      )}
    </>
  );
};

export default Index;
