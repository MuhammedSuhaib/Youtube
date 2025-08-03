// src/components/VideoCard.tsx
interface VideoProps {
  title: string;
  views: string;
  time: string;
  thumbnail: string;
  author: string;
  avatar: string;
  link: string;
}

export default function VideoCard({ title, views, time, thumbnail, author, avatar, link }: VideoProps) {
  return (
    <div className="w-full sm:w-64 mb-6">
      <a href={link} className="block group">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-video object-cover rounded-lg group-hover:scale-105 transition-transform"
        />
      </a>
      <div className="flex mt-3 gap-3">
        <img src={avatar} alt={author} className="w-10 h-10 rounded-full" />
        <div className="flex flex-col">
          <a href={link} className="font-semibold text-sm line-clamp-2 hover:underline">{title}</a>
          <p className="text-xs text-gray-600">{author}</p>
          <p className="text-xs text-gray-500">{views} views • {time}</p>
        </div>
      </div>
    </div>
  );
}