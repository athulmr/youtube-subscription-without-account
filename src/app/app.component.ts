import { Component, OnInit } from '@angular/core';
import { YouTubeService } from './service/youtube.service';
import { PlayList } from './model/playlist.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youtube-subscription-without-account';
}
