// src/app/page.tsx
import Navbar from "@/components/Header";
import { Minibar } from "@/components/Sidebar";
import VideoGrid from "@/components/VideoGrid";
import { getVideos } from "../lib/youtube";

export default async function HomePage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="flex">
        <Minibar />
        <main className="flex-1 p-4">
          <VideoGrid videos={videos} />
        </main>
      </div>
    </div>
  );
}
