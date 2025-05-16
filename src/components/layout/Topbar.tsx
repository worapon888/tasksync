import Image from "next/image";
import { ModeToggle } from "../themes/ThemeToggle";
import Link from "next/link";

export default function Topbar() {
  return (
    <nav className="relative z-50 w-full px-4 sm:px-6 py-4 flex items-center justify-between z-10">
      {/* Logo */}
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

      {/* เมนูฝั่งขวา */}
      <div className="flex items-center gap-4 sm:gap-6 font-medium text-white text-sm sm:text-base ml-auto">
        <Link href="/about-us" className="hover:underline">
          About Us
        </Link>
        <Link href="/how-it-works" className="hover:underline">
          How it works
        </Link>
        <div className="hidden sm:block">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
