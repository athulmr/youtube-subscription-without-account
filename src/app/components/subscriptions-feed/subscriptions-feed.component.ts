import { Component, OnInit } from '@angular/core';
import { PlayList } from 'src/app/model/playlist.model';
import { YouTubeService } from 'src/app/service/youtube.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Channel } from 'src/app/model/channel.model';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions-feed.component.html',
  styles: [
  ]
})
export class SubscriptionsFeedComponent implements OnInit {

  items: PlayList[] = [];
  apiKey = environment.apiKey;
  updateFreq = environment.feedUpdateFreqInMin * 60000;
  upToDate = false;
  channelMap: Map<string, Channel>;
  constructor(private yt: YouTubeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.upToDate = this.recentlyUpdated();
    console.log(this.upToDate, 'uptodate');

    this.items = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    const channels: Channel[] = JSON.parse(localStorage.getItem('channels'));
    this.channelMap = new Map(channels.map(i => [i.id, i]));

    this.route.queryParams.subscribe(
      params => {
        const idList = params.ids.split(',');

        idList.forEach(res => {
          if (res) {
            if (!this.channelMap.get(res)) {
              this.upToDate = false;
            }
          }
        });

        if (params.ids && !this.upToDate) {
          this.items = [];
          this.getChannels(params.ids);
          localStorage.setItem('lastUpdated', new Date().getTime().toString());
        }
      });
  }

  recentlyUpdated(): boolean {
    const lastUpdated = localStorage.getItem('lastUpdated');
    const now = new Date();

    if (lastUpdated) {
      return (now.getTime() - parseFloat(lastUpdated)) < this.updateFreq;
    } else {
      localStorage.setItem('lastUpdated', now.getTime().toString());
    }

    return false;
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
        localStorage.setItem('items', JSON.stringify(this.items));
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
