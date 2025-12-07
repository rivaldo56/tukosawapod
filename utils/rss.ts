import { Episode } from '../types';

export const fetchEpisodes = async (rssUrl: string): Promise<Episode[]> => {
    try {
        const response = await fetch(rssUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const items = Array.from(xml.querySelectorAll("item"));

        return items.map((item) => {
            const title = item.querySelector("title")?.textContent || "Untitled Episode";
            const descriptionHtml = item.querySelector("description")?.textContent || "";
            // Strip HTML tags from description for a cleaner look, or keep them if your UI supports HTML
            const description = descriptionHtml.replace(/<[^>]*>?/gm, '').substring(0, 200) + "...";

            const guid = item.querySelector("guid")?.textContent || Math.random().toString(36).substring(7);
            const pubDate = item.querySelector("pubDate")?.textContent || "";
            // Format date to "MMM DD, YYYY"
            const formattedDate = pubDate ? new Date(pubDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            }).toUpperCase() : "";

            const enclosure = item.querySelector("enclosure");
            const audioUrl = enclosure?.getAttribute("url") || "";

            const itunesImage = item.getElementsByTagName("itunes:image")[0];
            const artworkUrl = itunesImage?.getAttribute("href") || "https://picsum.photos/600/600"; // Fallback image

            const itunesDuration = item.getElementsByTagName("itunes:duration")[0];
            const duration = itunesDuration?.textContent || "00:00";

            return {
                id: guid,
                title,
                description,
                duration,
                audioUrl,
                artworkUrl,
                publishDate: formattedDate,
                tags: ['Podcast', 'New'] // Default tags as RSS might not have them in a usable format
            };
        });
    } catch (error) {
        console.error("Error fetching episodes:", error);
        return [];
    }
};
