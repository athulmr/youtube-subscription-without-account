import { Component, OnInit } from '@angular/core';
import { YouTubeService } from 'src/app/service/youtube.service';
import { environment } from '../../../environments/environment';
import { NgForm } from '@angular/forms';
import { Channel } from 'src/app/model/channel.model';

@Component({
  selector: 'app-search-and-add',
  templateUrl: './subscriptions-add.component.html',
  styles: [
  ]
})
export class SubscriptionsAddComponent implements OnInit {
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
    const str = form.value.query;
    form.reset();
    const result = str.match(/(youtube.com\/user\/.[\w-]*|youtube.com\/channel\/.[\w-]*)/);
    if (result) {
      const details = result[0].split('/');
      console.log(str, result[0], details);
      this.searchUser(details);

      } else {
        console.error('Invalid URL provided');
      }
  }

  searchUser(details: string[]){
    this.channels = [{}];
    this.channels.pop();
    this.yt.getChannel(details[2], this.apiKey, details[1]).subscribe(res => {
      console.log(res, 'search user');
      res.items.forEach(item => {
        if (item.kind === 'youtube#channel') {
          console.log(item.snippet.title, '<-title ', item.snippet.thumbnails.default);
          this.channels.push({
            title: item.snippet.title,
            img: item.snippet.thumbnails.default.url,
            id: item.id,
            uploads: item.contentDetails.relatedPlaylists.uploads
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
      this.ids += channel.id + ',';

    } else if (this.subscribedChannels.filter(c => c.title === channel.title).length > 0) {
      alreadyExist = true;
    }

    if (!alreadyExist) {
      this.subscribedChannels.push(channel);
      this.ids += channel.id + ',';
    }

    localStorage.setItem('channels', JSON.stringify(this.subscribedChannels));
  }

}
