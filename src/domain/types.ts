export type MusclePart = "chest" | "back" | "shoulder" | "arms" | "legs";

export type PartState = 0 | 1 | 2;

export type ArnoldState = {
  mood: "sad" | "neutral" | "hyped";
  parts: Record<MusclePart, PartState>;
};
