import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { RouterModule } from '@angular/router';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { AuthService } from './services/auth.service';
import { fackeBackendProvider } from './helpers/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { OrderService } from './services/order.service';

import { FormsModule }   from '@angular/forms';
import { AuthGuard } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    NoAccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      { 
        path:'login', 
        component:LoginComponent
      },
      { 
        path:'admin', 
        component:AdminComponent,
        canActivate:[AuthGuard]
      }, 
      { 
        path:'no-access', 
        component:NoAccessComponent
      }
    ])
  ],
  providers: [
    OrderService,
    AuthService,
    AuthGuard,
    fackeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
