import Navbar from "@/components/Header";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  const key = process.env.YOUTUBE_API_KEY;
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${params.id}&key=${key}`
  );
  const data = await res.json();
  const video = data.items?.[0];

  if (!video) return notFound(); 

  const snippet = video.snippet;
  const channelId = snippet.channelId;

  // Fetch channel details to get avatar
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${key}`
  );
  const channelData = await channelRes.json();
  const channelAvatar = channelData.items?.[0]?.snippet?.thumbnails?.high?.url;
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-4">
          <div className="w-full p-15 aspect-video mb-4">
            <iframe
              title={snippet.title}
              src={`https://www.youtube.com/embed/${params.id}?rel=0`}
              className="w-full h-full p-4 rounded-2xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>

          <h1 className="text-xl font-bold mb-2">{snippet.title}</h1>
          <div className="text-sm text-gray-500 mb-4">
            {new Date(snippet.publishedAt).toDateString()}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3 items-center">
              <Image
                src={channelAvatar || "/default-avatar.png"}
                alt="Channel Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />

              <div>
                <p className="font-semibold">{snippet.channelTitle}</p>
                <p className="text-xs text-gray-400">1.2M subscribers</p>
              </div>
            </div>
            <button className="bg-red-600 text-white px-4 py-1 rounded">
              Subscribe
            </button>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
            {snippet.description}
          </p>
        </main>
      </div>
    </div>
  );
}
