export interface ParsedTitle {
    epPrefix: string;
    firstHalf: string;
    secondHalf: string;
}

/**
 * Parses an episode title into three parts for multi-line display:
 * 1. EP prefix (e.g., "EP 6:")
 * 2. First half of the episode name
 * 3. Second half of the episode name
 */
export const parseEpisodeTitle = (title: string): ParsedTitle => {
    // Match "EP X:" or "EP XX:" pattern (case insensitive)
    const epMatch = title.match(/^(EP\s+\d+:)/i);

    let epPrefix = '';
    let remainingTitle = title;

    if (epMatch) {
        epPrefix = epMatch[1].toUpperCase();
        remainingTitle = title.substring(epMatch[1].length).trim();
    }

    // Split remaining title into words
    const words = remainingTitle.split(' ').filter(w => w.length > 0);

    // Find the middle point
    const midPoint = Math.ceil(words.length / 2);

    // Split into two halves
    const firstHalf = words.slice(0, midPoint).join(' ');
    const secondHalf = words.slice(midPoint).join(' ');

    return {
        epPrefix,
        firstHalf,
        secondHalf
    };
};
