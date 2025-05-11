export default function ActionButtons({
  onCancel,
  onSubmit,
  isEditing,
}: {
  onCancel: () => void;
  onSubmit: () => void;
  isEditing: boolean;
}) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={onCancel}
        className="px-4 py-2 bg-gray-300 dark:bg-white/10 rounded cursor-pointer"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-900 cursor-pointer"
      >
        {isEditing ? "Save Changes" : "Create"}
      </button>
    </div>
  );
}
