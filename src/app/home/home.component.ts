import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor(private authService:AuthService) { }

  ngOnInit() {
  }



}
