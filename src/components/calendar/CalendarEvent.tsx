type EventCardProps = {
  time: string;
  title: string;
  category: "PersonalDevelopment" | "PersonalAssistant" | "LeisureBalance";
  className?: string; // ✅ เพิ่ม className
};

const categoryStyles = {
  PersonalDevelopment: {
    text: "text-cyan-400",
    bar: "bg-cyan-400",
    bg: "bg-[#0b1e24]",
  },
  PersonalAssistant: {
    text: "text-red-400",
    bar: "bg-red-400",
    bg: "bg-[#240b0b]",
  },
  LeisureBalance: {
    text: "text-green-400",
    bar: "bg-green-400",
    bg: "bg-[#0b2412]",
  },
};

export default function EventCard({
  time,
  title,
  category,
  className = "", // ✅ fallback สำหรับ undefined
}: EventCardProps) {
  const { text, bar, bg } = categoryStyles[category];

  return (
    <div
      className={`relative h-full rounded-md px-4 py-3 text-white ${bg} ${className}`}
    >
      {/* Vertical bar on the left */}
      <div
        className={`absolute left-0 top-2 bottom-2 w-1 rounded-full ${bar}`}
      />

      {/* Content */}
      <p className={`text-sm font-medium ${text}`}>{time}</p>
      <p className="text-[12px] font-semibold leading-snug mt-1">{title}</p>
      <p className="text-xs text-gray-400 mt-3">{category}</p>
    </div>
  );
}
