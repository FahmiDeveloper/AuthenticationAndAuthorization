import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin:boolean;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  signIn(credentials){
    console.log('hello');
    this.authService.login(credentials)
    .subscribe(result => {
      if(result){
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      this.router.navigate([returnUrl || '/'])
      }
      else
      this.invalidLogin = true;
    });
  }

}
