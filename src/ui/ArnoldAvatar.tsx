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
  const highlight = "#f4a63b";
  const skin = "#ffffff";
  const outline = "#1a1a1a";
  const blush = "#f4a19a";

  const partFill = (state: PartState) => (state === 2 ? highlight : skin);

  return (
    <svg
      viewBox="0 0 200 300"
      width={size}
      height={size * 1.5}
      role="img"
      aria-label="Arnold Mate avatar"
    >
      <g stroke={outline} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <g id="shadow" aria-hidden="true">
          <ellipse cx="100" cy="245" rx="38" ry="8" fill="#2b2b2b" />
        </g>
        <g id="back" data-part="back">
          <path
            d="M 66 78 Q 100 64 134 78 L 122 130 Q 100 150 78 130 Z"
            fill={parts.back === 2 ? highlight : skin}
          />
        </g>
        <g id="legs" data-part="legs">
          <line x1="93" y1="152" x2="86" y2="230" strokeWidth={legStroke} />
          <line x1="107" y1="152" x2="114" y2="230" strokeWidth={legStroke} />
          <rect x="74" y="230" width="26" height="12" rx="6" />
          <rect x="100" y="230" width="26" height="12" rx="6" />
          {parts.legs === 2 ? (
            <>
              <rect x="76" y="170" width="18" height="45" rx="9" fill={highlight} />
              <rect x="106" y="170" width="18" height="45" rx="9" fill={highlight} />
            </>
          ) : null}
          <path
            d="M 78 150 Q 100 165 122 150 L 126 170 Q 100 178 74 170 Z"
            fill={parts.legs === 2 ? highlight : skin}
          />
        </g>
        <g id="torso" data-part="chest">
          <path d="M 76 82 Q 100 76 124 82 L 128 150 Q 100 165 72 150 Z" fill={skin} />
          <path
            d="M 82 96 Q 100 88 118 96 L 112 120 Q 100 128 88 120 Z"
            fill={partFill(parts.chest)}
          />
          <line x1="100" y1="104" x2="100" y2="140" />
          <line x1="92" y1="115" x2="108" y2="115" />
          <line x1="92" y1="130" x2="108" y2="130" />
        </g>
        <g id="shoulders" data-part="shoulder">
          <path d="M 62 80 Q 72 70 86 76 Q 84 92 66 92 Z" fill={partFill(parts.shoulder)} />
          <path d="M 138 80 Q 128 70 114 76 Q 116 92 134 92 Z" fill={partFill(parts.shoulder)} />
        </g>
        <g id="arms" data-part="arms">
          <line x1="74" y1="90" x2="52" y2="138" strokeWidth={armStroke} />
          <line x1="126" y1="90" x2="148" y2="138" strokeWidth={armStroke} />
          <path d="M 52 138 Q 50 164 64 172 Q 70 174 72 166" strokeWidth={armStroke} />
          <path d="M 148 138 Q 150 164 136 172 Q 130 174 128 166" strokeWidth={armStroke} />
          {parts.arms === 2 ? (
            <>
              <rect x="46" y="106" width="20" height="30" rx="10" fill={highlight} />
              <rect x="134" y="106" width="20" height="30" rx="10" fill={highlight} />
            </>
          ) : null}
        </g>
        <g id="head">
          <circle cx="100" cy="46" r="22" fill={skin} />
          <circle cx="86" cy="52" r="3.5" fill={blush} stroke="none" />
          <circle cx="114" cy="52" r="3.5" fill={blush} stroke="none" />
          <line x1="92" y1="40" x2="92" y2="46" />
          <line x1="108" y1="40" x2="108" y2="46" />
          <path d={mouthPath(mood)} />
          <line x1="100" y1="68" x2="100" y2="82" />
        </g>
      </g>
    </svg>
  );
};
