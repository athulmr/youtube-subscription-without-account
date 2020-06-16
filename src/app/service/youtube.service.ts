import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayList } from '../model/playlist.model';
import { ChannelResponse } from '../model/channel-response.model';
import { SearchUser } from '../model/search-user.model';

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  END_POINT = 'https://www.googleapis.com/youtube/v3';
  constructor(private http: HttpClient) { }

  getChannel(id: string, key: string, type = 'channel') {
    let searchBy = 'id';
    if (type === 'user') {
      searchBy = 'forUsername';
    } else if (type !== 'channel') {
      throw new Error('getChannel() : Unknown channel search type');
    }

    return this.http.get<{items: ChannelResponse[]}>(`${this.END_POINT}/channels?part=contentDetails&part=snippet
    &${searchBy}=${id}&key=${key}`);
  }

  getPlaylistItems(playlistId: string, key: string) {
    return this.http.get<{items: PlayList[]}>(`${this.END_POINT}/playlistItems?part=snippet
    &playlistId=${playlistId}&key=${key}`);
  }

  getSearch(query: string, key: string) {
    return this.http.get<{items: SearchUser[]}>(`${this.END_POINT}/channels?part=snippet
    &q=${query}&key=${key}`);
  }

}
