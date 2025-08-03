// src/components/Sidebar.tsx
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  Home,
  Compass,
  Youtube,
  Library,
  Bell,
  Video,
} from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Explore", icon: Compass, href: "#" },
  { label: "Shorts", icon: Video, href: "#" },
  { label: "Subscriptions", icon: Youtube, href: "#" },
  { label: "Notifications", icon: Bell, href: "#" },
  { label: "Library", icon: Library, href: "#" },
];

export default function Sidebar() {
  return (
    <>
      {/* Mobile menu trigger */}
      <Sheet>
        <SheetTrigger className="border-r p-5 hover:bg-[#423f3f]">
          <Menu className="bg-black text-white  rounded-md size-5" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-60 bg-[#0f0f0f]">
          {/* Add a visually hidden DialogTitle for accessibility */}
          <VisuallyHidden>
            <h2 id="sidebar-dialog-title">Sidebar Menu</h2>
          </VisuallyHidden>
          <aside
            className="min-h-screen border-r bg-[#0f0f0f] text-white p-4"
            aria-labelledby="sidebar-dialog-title"
          >
            <nav className="flex flex-col gap-1">
              <Link href="/" aria-label="YouTube Home">
                <Image
                  src="/images/yout.jpg"
                  alt="YouTube Logo"
                  width={100}
                  height={100}
                  className="w-25 m-2"
                />
              </Link>
              {links.map(({ label, icon: Icon, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-4 px-3 py-2 rounded hover:bg-[#423f3f]"
                >
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </nav>
            {/* Subscriptions section example */}
            <h3 className="text-xs font-semibold text-gray-400 px-2 mb-2">
              SUBSCRIPTIONS
            </h3>
            <a
              href="/"
              className="flex items-center gap-3 px-2 py-2 rounded hover:bg-[#423f3f]"
            >
              <Image
                src="/images/Jack.png"
                alt="Jack"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span>Me</span>
            </a>
            {/* Add more subscriptions */}
          </aside>
        </SheetContent>
      </Sheet>
    </>
  );
}

export function Minibar() {
  return (
    <aside
      className="min-h-screen border-r bg-[#0f0f0f] text-white p-4"
      aria-labelledby="sidebar-dialog-title"
    >
      <nav className="flex flex-col gap-1">
        {links.map(({ icon: Icon, href }) => (
          <a
            key={1 + Math.random()}
            title="Navigate"
            href={href}
            className="flex items-center gap-4 px-3 py-2 rounded hover:bg-[#423f3f]"
          >
            <Icon size={20} />
          </a>
        ))}
      </nav>
    </aside>
  );
}
