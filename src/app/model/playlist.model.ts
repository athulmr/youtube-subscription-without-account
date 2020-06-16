export interface PlayList{
  snippet: {
    publishedAt: string,
    title: string,
    channelTitle: string,
    channelId: string,
    thumbnails: {
      default: {
        url: string,
        width: number,
        height: number
      },
      medium: {
        url: string
      }
    },
    resourceId: {
      videoId: string
    }
  };
  channelThumbnail: string;
}
