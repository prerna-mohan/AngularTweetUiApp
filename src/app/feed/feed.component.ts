import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tweet } from '../models/tweet';
import { TweetReply } from '../models/tweetreply';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { TweetService } from '../services/tweet.service';
import  {  NgxEmojiPickerModule  }  from  'ngx-emoji-picker';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, AfterViewChecked {
    id: string;
    tweet : Tweet = new Tweet();
    tweetReply : TweetReply = new TweetReply();
    tweets : Tweet[] = [];
    newtweets : Tweet[] = [];
    showAdd:boolean = false;
    user: User= new User();
    users:User[]=[];
    isNoTweet: boolean = false;
    
    
  constructor(private route: ActivatedRoute, private router: Router, private tweetService: TweetService, private userService: LoginService) {
    this.userService.getAllUsers().subscribe(users => {
      if(users!=null){
        this.users = users;
      }
    });
   }

  toggled: boolean = false;
  handleSelection(event) {
    console.log(event.char);
    (document.getElementById("newpost") as HTMLTextAreaElement).value += event.char;
  }

  ngAfterViewChecked(): void {
    this.checkLiked();
  }

  ngOnInit() {
    this.tweetService.getAllTweets().subscribe(tweets => {
      if(tweets!=null){
        this.tweets = tweets;
        this.tweets.sort((a, b) => (a.tweetTime > b.tweetTime) ? -1 : 1);     
      }
      else{
        this.isNoTweet = true;
      }
    });
    this.id = this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(user => {
      if(user!=null){
        this.user = user;
      }
    });
  }

  PostTweet(){
      this.tweet.emailId = this.user.emailId;
      this.tweet.tweetTime = new Date();
      this.tweet.likedUsers = [];
      this.tweet.tweetReplies = [];
      this.tweetService.postTweet(this.tweet).subscribe(tweet => {
          if(tweet!=null){
              this.tweets.unshift(tweet);
              (<HTMLInputElement>document.getElementById("newpost")).value = null;
              this.tweet = new Tweet();
          }
      });
  }

  LikeTweet(tweetId : number){
      this.tweetService.likeTweet(tweetId, this.user.emailId).subscribe(tweet => {
          if(tweet!=null){
              document.getElementById("like_btn"+tweetId).style.color="red";
              document.getElementById("like_btn"+tweetId).style.fill="red";
              this.tweets.find(t => t.tweetId == tweetId).likedUsers.push(this.user.emailId);
              this.likeCount(tweetId);
          }
      });
  }

  checkLiked(){
    this.tweets.forEach((t)  => {
      if(t.likedUsers.includes(this.user.emailId, 0)){
        document.getElementById("like_btn"+t.tweetId).style.color="red";
        document.getElementById("like_btn"+t.tweetId).style.fill="red";
      }
    }); 
  }

  createNewReply(tweetId : number){
    this.tweetReply.username = this.user.username;
    this.tweetReply.replyTime = new Date();
    this.tweetReply.replyMessage = (<HTMLInputElement>document.getElementById("comment"+tweetId.toString())).value;
    this.tweetService.replyTweet(tweetId, this.tweetReply).subscribe(result => {
      if(result){
          this.tweets.find(t => t.tweetId == tweetId).tweetReplies.push(this.tweetReply);
          (<HTMLInputElement>document.getElementById("comment"+tweetId.toString())).value = null;
          this.tweetReply = new TweetReply();
      }
      else{
        alert("Network Error...");
      }
  });
  }

  onShowComments(tweetId: number){
    (<HTMLInputElement>document.getElementById("comments"+tweetId.toString())).style.display = "block";
  }

  onEditPost(){
    (<HTMLInputElement>document.getElementById("tweetmsg")).style.display = "none";
    (<HTMLInputElement>document.getElementById("editpost")).style.display = "block";
  }

  updatePost(post:string, tweet : Tweet){
    tweet.tweetMessage = post;
    this.tweetService.updateTweet(tweet).subscribe(tweet => {
      if(tweet!=null){
        var tweetItem = this.tweets.find(t => t.tweetId == tweet.tweetId);
        var index = this.tweets.indexOf(tweetItem, 0);
        this.tweets[index]=tweet;
      }
      else{
        alert("Network error...");
      }
    });
  }

  onDeletePost(tweetId: number){
    this.tweetService.deleteTweet(tweetId).subscribe(tweet => {
      if(tweet!=null){
        var tweetItem = this.tweets.find(t => t.tweetId == tweetId);
        var index = this.tweets.indexOf(tweetItem, 0);
        if (index > -1) {
           this.tweets.splice(index, 1);
        }
      }
      else{
        alert("Network error...");
      }
  });
  }

  firstName(email: string){
    return this.users.find(u => u.emailId == email).firstName;
  }

  lastName(email: string){
    return this.users.find(u => u.emailId == email).lastName;
  }

  username(email: string){
    return this.users.find(u => u.emailId == email).username;
  }

  likeCount(tweetId: number){
    return this.tweets.find(t => t.tweetId == tweetId).likedUsers.length;
  }

  replyCount(tweetId: number){
    return this.tweets.find(t => t.tweetId == tweetId).tweetReplies.length;
  }

  getTweetUserImage(emailId : string){
    var img = this.users.find(u => u.emailId == emailId).profileImg;
    if(img==null){
      return "https://www.visitgck.com/wp-content/uploads/2017/01/default-profile-pic.jpg"
    }
    else{
      return img;
    }
  }

  getProfileImg(){
    var img = this.user.profileImg;
    if(img==null){
      return "https://www.visitgck.com/wp-content/uploads/2017/01/default-profile-pic.jpg"
    }
    else{
      return img;
    }
  }

  showTime(tweetTime: Date) {
    var fullDate:string="";
    var format;
    var month = tweetTime.toLocaleString().slice(5,7);
    var monthName;
    var date = tweetTime.toLocaleString().slice(8,10);
    var year = tweetTime.toLocaleString().slice(0,4);
    var strHour:string = tweetTime.toLocaleString().slice(11,13);
    var hour = parseInt(strHour);
    if(hour>12){
      hour=hour-12;
      if(hour<10){
        fullDate = fullDate+"0"+hour;
      }
      else{
        fullDate = fullDate+hour;
      }
    }
    else{
      fullDate = fullDate+strHour;
    }
    if(hour>=12){
      format="PM"
    }
    else{
      format="AM"
    }
    switch(month){
      case "01": monthName = "Jan";
                 break;
      case "02": monthName = "Feb";
                 break; 
      case "03": monthName = "Mar";
                 break;
      case "04": monthName = "Apr";
                 break;
      case "05": monthName = "May";
                 break;
      case "06": monthName = "Jun";
                 break;  
      case "07": monthName = "Jul";
                 break;
      case "08": monthName = "Aug";
                 break; 
      case "09": monthName = "Sep";
                 break;
      case "10": monthName = "Oct";
                 break;
      case "11": monthName = "Nov";
                 break;
      case "12": monthName = "Dec";
                 break;                    
    }
    fullDate = fullDate+tweetTime.toLocaleString().slice(13,16)+" "+format+" "+monthName+" "+date+", "+year;
    return fullDate;
  }



}
