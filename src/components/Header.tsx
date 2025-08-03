import Image from "next/image";
import Sidebar from "./Sidebar";
import { Upload, MoreVertical, Bell, Search, User } from "lucide-react";
import Link from "next/link";

// src/components/Header.tsx
export default function Header() {
  return (
    <header className="flex justify-between items-center px-4 py-2 shadow sticky top-0 z-50 bg-[#0f0f0fc9]">
      {/* Left: Menu & Logo */}
      <div className="flex gap-4 items-center">
        <Sidebar />
        <Link href="/" aria-label="YouTube Home">
          <Image
            src="/images/yout.jpg"
            alt="YouTube Logo"
            width={100}
            height={100}
            className="w-25 "
          />
        </Link>
      </div>
      {/* Center: Search */}
      <div className="flex items-center max-w-xl flex-1 mx-4">
        <form className="flex flex-1 border rounded-full overflow-hidden ">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-4 py-2 bg-transparent outline-none"
            aria-label="Search"
          />
          <button
            type="submit"
            aria-label="Search"
            className="px-4 hover:bg-[#423f3f]"
          >
            <Search />{" "}
          </button>
        </form>
      </div>
      {/* Right: Icons */}
      <div className="flex gap-4 items-center">
        <button
          aria-label="Upload"
          className="p-2 hover:bg-[#423f3f] rounded-full"
        >
          <Upload className="w-5 h-5" />
        </button>
        <button
          aria-label="More options"
          className="p-2 hover:bg-[#423f3f] rounded-full"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
        <button
          aria-label="Notifications"
          className="p-2 hover:bg-[#423f3f] rounded-full"
        >
          <Bell className="w-5 h-5" />
        </button>
        <User />
      </div>
    </header>
  );
}
