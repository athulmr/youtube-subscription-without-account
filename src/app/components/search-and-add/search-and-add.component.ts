import { Component, OnInit } from '@angular/core';
import { YouTubeService } from 'src/app/service/youtube.service';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
import { Channel } from 'src/app/model/channel.model';

@Component({
  selector: 'app-search-and-add',
  templateUrl: './search-and-add.component.html',
  styles: [
  ]
})
export class SearchAndAddComponent implements OnInit {
  apiKey = environment.apiKey;
  channels: [Channel];
  subscribedChannels: Channel[];
  ids = '';

  constructor(private yt: YouTubeService) { }

  ngOnInit(): void {
    this.subscribedChannels = JSON.parse(localStorage.getItem('channels'));
    if (this.subscribedChannels) {
      this.subscribedChannels.forEach(channel => {
        this.ids += channel.id + ',';
      });
    }
  }

  onSubmit(form: NgForm) {
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

  onSubscribe(channel: Channel) {

    let alreadyExist = false;
    console.log(this.subscribedChannels, 'sub chn');

    if (!this.subscribedChannels) {
      console.log(this.subscribedChannels, 'sub chn nn');
      this.subscribedChannels = [{title: channel.title, id: channel.id, img: channel.img}];
      alreadyExist = true;
    } else if (this.subscribedChannels.filter(c => c.title === channel.title).length > 0) {
      alreadyExist = true;
    }

    if (!alreadyExist) {
      this.subscribedChannels.push(channel);
      this.ids += channel.id;
      localStorage.setItem('channels', JSON.stringify(this.subscribedChannels));
    }
  }

}
