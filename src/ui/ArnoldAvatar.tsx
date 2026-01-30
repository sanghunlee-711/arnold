import { MusclePart, PartState } from "../domain/types";

type ArnoldAvatarProps = {
  parts: Record<MusclePart, PartState>;
  mood: "sad" | "neutral" | "hyped";
  size?: number;
};

const mouthPath = (mood: ArnoldAvatarProps["mood"]) => {
  switch (mood) {
    case "hyped":
      return "M 88 55 Q 100 65 112 55";
    case "neutral":
      return "M 90 55 L 110 55";
    default:
      return "M 88 60 Q 100 50 112 60";
  }
};

export const ArnoldAvatar = ({ parts, mood, size = 260 }: ArnoldAvatarProps) => {
  const armStroke = parts.arms === 0 ? 2 : 4;
  const legStroke = parts.legs === 0 ? 2 : 4;
  const armStartY = parts.shoulder === 0 ? 95 : 90;

  return (
    <svg
      viewBox="0 0 200 300"
      width={size}
      height={size * 1.5}
      role="img"
      aria-label="Arnold Mate avatar"
    >
      <g stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {parts.back === 2 ? (
          <path d="M 72 78 Q 100 70 128 78 L 120 130 Q 100 145 80 130 Z" />
        ) : null}
        <line x1="95" y1="140" x2="85" y2="220" strokeWidth={legStroke} />
        <line x1="105" y1="140" x2="115" y2="220" strokeWidth={legStroke} />
        {parts.legs === 2 ? (
          <>
            <rect x="75" y="145" width="20" height="45" rx="10" />
            <rect x="105" y="145" width="20" height="45" rx="10" />
          </>
        ) : null}
        <rect x="80" y="70" width="40" height="70" rx="10" />
        {parts.chest === 0 ? <line x1="100" y1="90" x2="100" y2="115" /> : null}
        <line x1="80" y1={armStartY} x2="55" y2="135" strokeWidth={armStroke} />
        <line x1="120" y1={armStartY} x2="145" y2="135" strokeWidth={armStroke} />
        {parts.arms === 2 ? (
          <>
            <rect x="51" y="90" width="18" height="30" rx="9" />
            <rect x="131" y="90" width="18" height="30" rx="9" />
          </>
        ) : null}
        {parts.chest === 2 ? (
          <rect x="72" y="90" width="56" height="32" rx="14" />
        ) : null}
        {parts.shoulder === 2 ? (
          <>
            <rect x="60" y="72" width="30" height="20" rx="10" />
            <rect x="110" y="72" width="30" height="20" rx="10" />
          </>
        ) : null}
        <circle cx="100" cy="45" r="22" />
        <line x1="100" y1="60" x2="100" y2="70" />
        <line x1="92" y1="40" x2="92" y2="45" />
        <line x1="108" y1="40" x2="108" y2="45" />
        <path d={mouthPath(mood)} />
      </g>
    </svg>
  );
};
