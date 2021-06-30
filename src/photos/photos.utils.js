export const processHash = (caption) => {
    const extractedHashtagsArray = caption.match(/#[\w]+/g) || [];
    return extractedHashtagsArray.map(item => ({where: {hashtag: item}, create: {hashtag: item}}));
};