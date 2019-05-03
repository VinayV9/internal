import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { SharedServiceService } from 'src/app/services/shared-service/shared-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user: SocialUser;
  isLoggedIn: boolean =false;
  constructor(
    private authService: AuthService,
    private sharedServiceService: SharedServiceService
    ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.isLoggedIn = (user != null);
     });
  }
  
  signInWithGoogle(): void{
    console.log("sign in with google");
    this.authService
    .signIn(GoogleLoginProvider.PROVIDER_ID);
    // .then(
    //   (user) => {
    //     this.user = user;
    //     //this.sendGoogleAuthToken(user.idToken);
    //   },
    //   (error) => { console.log("ERROR: error with sign in"); }
    // )
  }

  signOut(): void {
    this.authService.signOut();
  }

  sendGoogleAuthToken(token: string){
    this.sharedServiceService
    .sendGoogleAuthToken(token)
    .subscribe(
      (data) => {},
      (error) => { console.log("ERROR: error with sign in")}
    );
  }
  
}
