export interface ChannelResponse{
  contentDetails: {
    relatedPlaylists: {
      uploads: string
    }
  };
  snippet: {
    title: string,
    thumbnails: {
      default: {
        url: string
      }
    },
    customUrl: string
  };
  id: string;
  kind: string;
}
