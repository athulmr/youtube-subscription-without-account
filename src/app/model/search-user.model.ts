export interface SearchUser {
  id: {
    kind: string,
    channelId: string
  };
  snippet: {
    channelTitle: string,
    thumbnails: {
      default: {
        url: string
      }
    }
  };
}
