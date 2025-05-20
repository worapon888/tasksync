"use client";

import React from "react";

const segments = [
  { label: "Stagnant", color: "#92400E" },
  { label: "Burnout", color: "#DC2626" },
  { label: "Low Energy", color: "#FACC15" },
  { label: "Moderate Energy", color: "#34D399" },
  { label: "High Energy", color: "#22C55E" },
];

const cx = 100;
const cy = 120;
const outerRadius = 70;
const innerRadius = 90;
const totalAngle = -180;
const gapAngle = 2;
const segmentAngle =
  (totalAngle - gapAngle * segments.length) / segments.length;
const startAngle = -180;

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

export default function MeterArcUI({ value = 80 }: { value?: number }) {
  const angle = startAngle - (value / 100) * totalAngle;
  const labelRadius = (outerRadius + innerRadius) / 2;
  const pointerLength = innerRadius - 20;

  return (
    <svg viewBox="0 0 200 140" className="w-full h-auto max-w-md">
      {/* Glow Filters */}
      <defs>
        {segments.map((seg, i) => (
          <filter
            id={`glow-${i}`}
            key={i}
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        ))}
        <filter id="pointer-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Segments */}
      {segments.map((seg, i) => {
        const a1 = startAngle - i * (segmentAngle + gapAngle);
        const a2 = a1 - segmentAngle;

        const p1 = polarToCartesian(cx, cy, outerRadius, a1);
        const p2 = polarToCartesian(cx, cy, outerRadius, a2);
        const p3 = polarToCartesian(cx, cy, innerRadius, a2);
        const p4 = polarToCartesian(cx, cy, innerRadius, a1);
        const largeArc = Math.abs(a2 - a1) > 180 ? 1 : 0;

        const d = `
          M ${p1.x} ${p1.y}
          A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${p2.x} ${p2.y}
          L ${p3.x} ${p3.y}
          A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${p4.x} ${p4.y}
          Z
        `;

        const labelStart = polarToCartesian(cx, cy, labelRadius, a1);
        const labelEnd = polarToCartesian(cx, cy, labelRadius, a2);

        return (
          <g key={i}>
            <path
              d={d}
              fill={seg.color}
              stroke={seg.color}
              strokeWidth="1"
              filter={`url(#glow-${i})`}
            />
            <path
              id={`arcLabel-${i}`}
              d={`M ${labelStart.x} ${labelStart.y} A ${labelRadius} ${labelRadius} 0 0 1 ${labelEnd.x} ${labelEnd.y}`}
              fill="none"
            />
            <text fontSize="6" fill="#ffffff">
              <textPath
                href={`#arcLabel-${i}`}
                startOffset="50%"
                textAnchor="middle"
              >
                {seg.label}
              </textPath>
            </text>
          </g>
        );
      })}

      {/* Pointer with glow */}
      <g filter="url(#pointer-glow)">
        <line
          x1={cx}
          y1={cy}
          x2={polarToCartesian(cx, cy, pointerLength, angle).x}
          y2={polarToCartesian(cx, cy, pointerLength, angle).y}
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx={cx}
          cy={cy}
          r="6"
          fill="#0d0f1a"
          stroke="#ffffff"
          strokeWidth="3"
        />
        <circle cx={cx} cy={cy} r="3" fill="#ffffff" />
      </g>
    </svg>
  );
}
