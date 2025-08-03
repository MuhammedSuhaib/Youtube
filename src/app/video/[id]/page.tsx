// D:\VScode\GitHub\Youtube\src\app\video\[id]\page.tsx
import { getVideoData } from "@/lib/fetch";
import Navbar from "@/components/Header";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <VideoDetail id={params.id} />
    </div>
  );
}

async function VideoDetail({ id }: { id: string }) {
  const { snippet, channelAvatar } = await getVideoData(id);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-4">
          <div className="w-full p-15 aspect-video mb-4">
            <iframe
              title={snippet.title}
              src={`https://www.youtube.com/embed/${id}?rel=0`}
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
              <img
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
