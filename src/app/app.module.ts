import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './services/login.service';
import { ViewUserComponent } from './view-user/view-user.component';
import { AuthGuard } from './guards/auth.guard';
import { ComponentGuard } from './guards/component.guard';
import { FeedComponent } from './feed/feed.component';
import { TweetService } from './services/tweet.service';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    ViewUserComponent,
    FeedComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgxEmojiPickerModule.forRoot(),
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'feed/:id', component: FeedComponent, canActivate: [ComponentGuard] },
      { path: 'profile/:id', component: ProfileComponent, canActivate: [ComponentGuard] },
      { path: 'view-user/:id', component: ViewUserComponent, canActivate: [ComponentGuard] }
 ])
  ],
  providers: [LoginService, TweetService, AuthGuard, ComponentGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
