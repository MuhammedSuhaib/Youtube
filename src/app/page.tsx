// src/app/page.tsx
import Navbar from "@/components/Header";
import { Minibar } from "@/components/Sidebar";
import VideoGrid from "@/components/VideoGrid";
import { getVideos } from "../lib/youtube";
import Image from "next/image";
type Video = {
  id: string;
  title: string;
  views: string;
  time: string;
  thumbnail: string;
  author: string;
  avatar: string;
  link: string;
};

export default async function HomePage() {
 
let videos: Video[] = [];
let offline = false;

  try {
    videos = await getVideos();
  } catch (e) {
    offline = true;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <Navbar />
      <div className="flex">
        <Minibar />
        <main className="flex-1 p-4">
          {offline ? (
            <div className="text-center mt-20 text-white flex gap-4 flex-col items-center">
              <Image
                src="/images/nowifi.jpg"
                width={150}
                height={150}
                alt="No WiFi Astronaut Connection "
                className="rounded-full"
              />
              <h3 className="font-normal text-2xl">Connect to the internet</h3>
              <p>You're offline. Check your connection.</p>
              <button className="text-blue-400  px-4 py-1 rounded-2xl hover:bg-[#263850] ">
                Retry
              </button>
              Or
              <span className="text-[#3fee0a] font-bold px-4 py-1 rounded-2xl hover:bg-[#263850] ">
                <a
                  href="https://www.youtube.com/feed/downloads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View your downloaded videos on YouTube 
                </a>
              </span>
            </div>
          ) : (
            <VideoGrid videos={videos} />
          )}
        </main>
      </div>
    </div>
  );
}
