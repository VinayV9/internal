import { Component, OnInit, Input } from '@angular/core';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @Input() user: SocialUser = null;
  constructor() { }

  ngOnInit() {
  }

}
