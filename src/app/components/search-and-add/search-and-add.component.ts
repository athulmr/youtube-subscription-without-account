import { Component, OnInit } from '@angular/core';
import { YouTubeService } from 'src/app/service/youtube.service';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-and-add',
  templateUrl: './search-and-add.component.html',
  styles: [
  ]
})
export class SearchAndAddComponent implements OnInit {
  apiKey = environment.apiKey;
  channels: [{
    title?: string,
    id?: string,
    img?: string
  }];

  constructor(private yt: YouTubeService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log('submitted', form.value);
    this.searchUser(form.value.query);
  }

  searchUser(q: string){
    this.channels = [{}];
    this.channels.pop();
    this.yt.getSearch(q, this.apiKey).subscribe(res => {
      console.log(res, 'search user');
      res.items.forEach(item => {
        if (item.id.kind === 'youtube#channel') {
          console.log(item.snippet.channelTitle, '<-title ', item.snippet.thumbnails.default);
          this.channels.push({
            title: item.snippet.channelTitle,
            img: item.snippet.thumbnails.default.url,
            id: item.id.channelId
          });

        }
      });
    });
  }

  onSubscribe(channel: any) {
    const subscribedChannels = JSON.parse(localStorage.getItem('channels'));
    if (subscribedChannels.filter(c => c.title === channel.title).length === 0) {
      subscribedChannels.push(channel);
      localStorage.setItem('channels', JSON.stringify(subscribedChannels));
    }
    console.log(subscribedChannels, 'sub chan');

  }

}
