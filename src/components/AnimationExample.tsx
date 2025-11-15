import { useEffect, useState } from "react";
import Lottie from "lottie-react";

type Stage = "walk" | "sit" | "work" | "loading" | "error";

const WALK_URL = "https://assets9.lottiefiles.com/packages/lf20_0yfsb3a1.json";
const SIT_URL = "https://assets1.lottiefiles.com/packages/lf20_tq9qkphn.json";
const WORK_URL = "https://assets1.lottiefiles.com/private_files/lf30_editor_jv3tuy.json";

const CharacterAnimation = () => {
  const [stage, setStage] = useState<Stage>("loading");
  const [walkData, setWalkData] = useState<any | null>(null);
  const [sitData, setSitData] = useState<any | null>(null);
  const [workData, setWorkData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch JSON from CDN once on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchAll() {
      try {
        const [r1, r2, r3] = await Promise.all([
          fetch(WALK_URL),
          fetch(SIT_URL),
          fetch(WORK_URL),
        ]);

        if (!r1.ok || !r2.ok || !r3.ok) {
          throw new Error("One of the animation fetches failed");
        }

        const [j1, j2, j3] = await Promise.all([r1.json(), r2.json(), r3.json()]);

        if (cancelled) return;

        setWalkData(j1);
        setSitData(j2);
        setWorkData(j3);

        // start playing
        setStage("walk");
      } catch (err: any) {
        console.error("Lottie fetch error:", err);
        if (!cancelled) {
          setError(err.message || "Failed to load animations");
          setStage("error");
        }
      }
    }

    fetchAll();
    return () => {
      cancelled = true;
    };
  }, []);

  // Sequence timing: walk -> sit -> work(loop)
  useEffect(() => {
    if (stage !== "walk") return;
    // walkDuration = 3000ms, sitDuration = 1800ms (tweak if animation lengths differ)
    const t1 = setTimeout(() => setStage("sit"), 3000);
    const t2 = setTimeout(() => setStage("work"), 4800); // walk(3s) + sit(1.8s) = 4.8s
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [stage]);

  // Optional: if stage changes back to walk (not used here), you can handle reverse logic.

  if (stage === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#2853ff]">
        <div className="text-white">Loading animation…</div>
      </div>
    );
  }

  if (stage === "error") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-red-50">
        <div className="text-red-700">Animation load failed: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#2853ff]">
      {/* Container gives a subtle shadow and center alignment */}
      <div className="relative w-full max-w-md p-6">
        {/* Small floating shadow under character */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-6 w-40 h-10 rounded-full bg-black/10 blur-sm" />

        {stage === "walk" && walkData && (
          <Lottie animationData={walkData} loop={false} style={{ width: "100%", height: "auto" }} />
        )}

        {stage === "sit" && sitData && (
          <Lottie animationData={sitData} loop={false} style={{ width: "100%", height: "auto" }} />
        )}

        {stage === "work" && workData && (
          <Lottie animationData={workData} loop={true} style={{ width: "100%", height: "auto" }} />
        )}
      </div>
    </div>
  );
};

export default CharacterAnimation;
