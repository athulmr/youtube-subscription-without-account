import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayList } from '../model/playlist.model';
import { Channel } from '../model/channel.model';

@Injectable({
  providedIn: 'root'
})
export class YouTubeService {

  END_POINT = 'https://www.googleapis.com/youtube/v3';
  constructor(private http: HttpClient) { }

  getChannel(id: string, key: string) {
    return this.http.get<{items: Channel[]}>(`${this.END_POINT}/channels?part=contentDetails&part=snippet
    &id=${id}&key=${key}`);
  }

  getPlaylistItems(playlistId: string, key: string) {
    return this.http.get<{items: PlayList[]}>(`${this.END_POINT}/playlistItems?part=snippet
    &playlistId=${playlistId}&key=${key}`);
  }

}
