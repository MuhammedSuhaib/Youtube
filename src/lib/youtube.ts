import { sources } from "./channels";


// Function to fetch avatars from allowed channels

const key = process.env.YOUTUBE_API_KEY;
async function getChannelAvatars(channelIds: string[]) {
    const uniqueIds = [...new Set(channelIds)];

    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${uniqueIds.join(",")}&key=${key}`;
    const res = await fetch(url);
    const data = await res.json();

    const avatarMap: Record<string, string> = {};
    data.items?.forEach((item: any) => {
        avatarMap[item.id] =
            item.snippet?.thumbnails?.default?.url || "/images/pfp.jpeg";
    });

    return avatarMap;
}

// Function to fetch videos from allowed channels

async function getVideos() {

    const allVideos: any[] = [];
    for (const source of sources) {
        let url = "";

        if (source.type === "channel") {
            url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${source.id}&maxResults=6&type=video&key=${key}`;
        } else if (source.type === "playlist") {
            url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${source.id}&maxResults=6&key=${key}`;
        } else if (source.type === "video") {
            url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${source.id}&key=${key}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        if (!data.items) {
            console.warn(`No data for ${source.id}`, data);
            continue;
        }

        allVideos.push(
            ...data.items.map((item: any) => ({
                ...item,
                snippet: {
                    ...item.snippet,
                    channelId: item.snippet.channelId || item.snippet.videoOwnerChannelId,
                },
            }))
        );
    }


    const channelIds = allVideos.map((v) => v.snippet.channelId);
    const avatars = await getChannelAvatars(channelIds);

    return allVideos.map((item: any) => {
        let videoId = item.id?.videoId || item.id;
        if (item.snippet?.resourceId?.videoId) {
            videoId = item.snippet.resourceId.videoId;
        }
        return {
            id: videoId,
            title: item.snippet.title,
            views: "N/A",
            time: item.snippet.publishedAt,
            thumbnail: item.snippet.thumbnails.medium.url,
            author: item.snippet.channelTitle,
            avatar: avatars[item.snippet.channelId],
            link: `/video/${videoId}`,
        };
    });

}

export { getVideos };