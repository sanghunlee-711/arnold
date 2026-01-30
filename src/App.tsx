import { useEffect, useState } from "react";
import { ArnoldState, MusclePart, PartState } from "./domain/types";
import { ArnoldAvatar } from "./ui/ArnoldAvatar";

const defaultParts: Record<MusclePart, PartState> = {
  chest: 1,
  back: 1,
  shoulder: 1,
  arms: 1,
  legs: 1,
};

type Route = "/record" | "/arnold";

const readRoute = (): Route => {
  const path = window.location.pathname as Route;
  return path === "/arnold" ? "/arnold" : "/record";
};

const updateRoute = (next: Route) => {
  window.history.pushState({}, "", next);
};

export default function App() {
  const [route, setRoute] = useState<Route>(readRoute);
  const [targetPart, setTargetPart] = useState<MusclePart>("chest");
  const [arnoldState, setArnoldState] = useState<ArnoldState>({
    mood: "neutral",
    parts: defaultParts,
  });

  useEffect(() => {
    const onPopState = () => setRoute(readRoute());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const goTo = (next: Route) => {
    updateRoute(next);
    setRoute(next);
  };

  const logWorkout = () => {
    setArnoldState((prev) => ({
      mood: "hyped",
      parts: {
        ...prev.parts,
        [targetPart]: 2,
      },
    }));
  };

  const resetState = () => {
    setArnoldState({
      mood: "neutral",
      parts: defaultParts,
    });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Arnold Mate</h1>
        <nav>
          <button
            className={route === "/record" ? "active" : ""}
            onClick={() => goTo("/record")}
            type="button"
          >
            /record
          </button>
          <button
            className={route === "/arnold" ? "active" : ""}
            onClick={() => goTo("/arnold")}
            type="button"
          >
            /arnold
          </button>
        </nav>
      </header>

      {route === "/record" ? (
        <section className="card">
          <h2>Record</h2>
          <div className="form-row">
            <label htmlFor="part-select">Target part</label>
            <select
              id="part-select"
              value={targetPart}
              onChange={(event) => setTargetPart(event.target.value as MusclePart)}
            >
              <option value="chest">chest</option>
              <option value="back">back</option>
              <option value="shoulder">shoulder</option>
              <option value="arms">arms</option>
              <option value="legs">legs</option>
            </select>
          </div>
          <div className="button-row">
            <button className="primary" onClick={logWorkout} type="button">
              Log workout
            </button>
            <button className="ghost" onClick={resetState} type="button">
              Reset
            </button>
          </div>
          <div className="avatar-preview">
            <ArnoldAvatar parts={arnoldState.parts} mood={arnoldState.mood} />
          </div>
        </section>
      ) : (
        <section className="card arnold-view">
          <h2>Arnold</h2>
          <ArnoldAvatar parts={arnoldState.parts} mood={arnoldState.mood} />
          <div className="stats">
            <p>Mood: {arnoldState.mood}</p>
            <div className="parts">
              {(Object.keys(arnoldState.parts) as MusclePart[]).map((part) => (
                <span key={part} className="chip">
                  {part}: {arnoldState.parts[part]}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
