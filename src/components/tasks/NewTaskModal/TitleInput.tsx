export default function TitleInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder="Title"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 rounded border bg-transparent text-black dark:text-white dark:border-white/10"
    />
  );
}
