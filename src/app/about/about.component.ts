import { Component, OnInit, Inject } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class AboutComponent implements OnInit {

  constructor(private leaderService: LeaderService, @Inject('baseURL') private BaseURL) { }

  leaders: Leader[];

  ngOnInit() {
    this.leaderService.getLeaders().subscribe((leaders) => this.leaders = leaders);
  }

}
