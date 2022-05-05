import { TweetReply } from "./tweetreply";

export class Tweet {

    tweetId: number;
    tweetMessage: string;
    tweetTime: Date;
    emailId: string;
    likedUsers: string[];
    tweetReplies: TweetReply[];
  }
  