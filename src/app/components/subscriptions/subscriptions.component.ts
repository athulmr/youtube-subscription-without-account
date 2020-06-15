import { Component, OnInit } from '@angular/core';
import { PlayList } from 'src/app/model/playlist.model';
import { YouTubeService } from 'src/app/service/youtube.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styles: [
  ]
})
export class SubscriptionsComponent implements OnInit {

  items: PlayList[] = [];
  apiKey = environment.apiKey;
  constructor(private yt: YouTubeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.items = [];
    this.route.queryParams.subscribe(
      params => {
        console.log(params.ids);

        if (params.ids) {

          this.getChannels(params.ids);
        }
      });
  }

  getChannels(id: string) {
    if (!id) {
      throw new Error('id not present');
    }

    this.yt.getChannel(id, this.apiKey)
    .subscribe(res => {

      res.items.forEach(item => {
        const playlistId = item.contentDetails.relatedPlaylists.uploads;
        this.getPlayListItems(playlistId);
      });
    });
  }

  getPlayListItems(id: string) {
    this.yt.getPlaylistItems(id, this.apiKey)
    .subscribe(res => {
      if(this.items.length === 0) {
        this.items = res.items;
      } else {
        this.items = this.items.concat(res.items);
        this.sortPlayListByDate(this.items);
      }
    });
  }

  sortPlayListByDate(playlist: PlayList[]) {
    playlist.sort((a, b) => {
      const aDate = new Date(a.snippet.publishedAt);
      const bDate = new Date(b.snippet.publishedAt);
      return bDate.getTime() - aDate.getTime();
    });
  }
}
