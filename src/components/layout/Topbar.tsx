import Image from "next/image";
import { ModeToggle } from "../themes/ThemeToggle";
import Link from "next/link";

export default function Topbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between z-10">
      <div className="flex items-center space-x-2  text-lg">
        <div>
          <Image
            src="/logo_tasksync_light.png"
            width={180}
            height={180}
            alt="logo"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6 font-medium  text-white text-lg">
        <Link href="#" className="hover:underline">
          About Us
        </Link>
        <Link href="#" className="hover:underline">
          How it works
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
