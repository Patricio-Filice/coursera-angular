import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private leaderService: LeaderService, @Inject('baseURL') private BaseURL) { }

  leaders: Leader[];

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leaders) => this.leaders = leaders);
  }

}
