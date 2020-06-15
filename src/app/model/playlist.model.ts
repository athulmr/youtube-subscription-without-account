export interface PlayList{
  snippet: {
    publishedAt: string,
    title: string,
    thumbnails: {
      default: {
        url: string,
        width: number,
        height: number
      }
    },
    resourceId: {
      videoId: string
    }

  }
}
