// D:\VScode\GitHub\Youtube\src\lib\fetch.ts
export async function getVideoData(id: string) {
  const key = process.env.YOUTUBE_API_KEY;
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${key}`
  );
  const data = await res.json();
  const video = data.items?.[0];
  if (!video) throw new Error('Not found');

  const snippet = video.snippet;
  const channelId = snippet.channelId;

  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${key}`
  );
  const channelData = await channelRes.json();
  const channelAvatar = channelData.items?.[0]?.snippet?.thumbnails?.high?.url;

  return { snippet, channelAvatar };
}
