import Image from "next/image";
import { ModeToggle } from "../themes/ThemeToggle";
import Link from "next/link";

export default function Topbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between z-10">
      <div className="flex items-center space-x-2  text-lg">
        <div>
          <Link href="/">
            <Image
              src="/logo_tasksync_light.png"
              alt="TaskSync Logo"
              width={120}
              height={40}
              style={{ height: "auto" }}
              priority
            />
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-6 font-medium  text-white ttext-lg">
        <Link href="/about-us" className="hover:underline">
          About Us
        </Link>
        <Link href="/how-it-works" className="hover:underline">
          How it works
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
}
