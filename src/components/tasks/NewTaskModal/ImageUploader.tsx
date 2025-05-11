import Image from "next/image";

interface Props {
  onUpload: (url: string) => void;
  cover: string;
}

export default function ImageUploader({ onUpload, cover }: Props) {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "task_upload");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcdibue2e/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) onUpload(data.secure_url);
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <div>
      <label
        htmlFor="fileUpload"
        className="block text-center cursor-pointer px-4 py-2 rounded border bg-black/30 text-white hover:text-blue-300"
      >
        Upload Image
      </label>
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      {cover && (
        <div className="relative w-full h-40 mt-2 rounded-md overflow-hidden border border-white/10">
          <Image src={cover} alt="Preview" fill className="object-cover" />
        </div>
      )}
    </div>
  );
}
