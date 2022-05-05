import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { config } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { Tweet } from '../models/tweet';
import { TweetReply } from '../models/tweetreply';


@Injectable({
  providedIn: 'root'
})

export class TweetService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  constructor(private http: HttpClient) { }

  getAllTweets():Observable<any>{
    return this.http.get<any>(`${config.tweetApiUrl}/getAllTweets`)
      .pipe(
        catchError(error => {
          alert(error.error);
          return of(null);
        }));
  }

  postTweet(tweet : Tweet):Observable<any>{
        return this.http.post<any>(`${config.tweetApiUrl}/postTweet`, tweet)
        .pipe(
        catchError(error => {
          alert(error.error);
          return of(null);
        }));
  }

  replyTweet(tweetId : Number, tweetReply : TweetReply):Observable<boolean>{
    return this.http.post<any>(`${config.tweetApiUrl}/replyTweet/`+ tweetId, tweetReply)
    .pipe(
    catchError(error => {
      alert(error.error);
      return of(null);
    }));
 }

  likeTweet(tweetId : number, emailId : string):Observable<any>{
    return this.http.put<any>(`${config.tweetApiUrl}/likeTweet/`+ tweetId + `/` + emailId, null)
    .pipe(
    catchError(error => {
      alert(error.error);
      return of(null);
    }));
}

  updateTweet(tweet : Tweet):Observable<any>{
    return this.http.put<any>(`${config.tweetApiUrl}/updateTweet`, tweet)
    .pipe(
    catchError(error => {
      alert(error.error);
      return of(null);
    }));
}

  deleteTweet(tweetId : number):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
    });
    return this.http.delete<any>(`${config.tweetApiUrl}/deleteTweet/`+ tweetId)
    .pipe(
    catchError(error => {
      alert(error.error);
      return of(null);
    }));
}

//   getAllFlights():Observable<any>{
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
//     });
//     return this.http.get<any>(`${config.airlineApiUrl}/api/Airline/getAllFlights`, { headers: headers })
//       .pipe(
//         catchError(error => {
//           alert(error.error);
//           return of(null);
//         }));
//   }

//   blockAirline(airline: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
//     });
//     return this.http.post<any>(`${config.airlineApiUrl}/api/Airline/blockAirline/` + airline, null, {headers : headers})
//     .pipe(
//        catchError(error => {
//          alert(error.error);
//          return of(null);
//      }));
//   }

//   activateAirline(airline: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
//     });
//     return this.http.post<any>(`${config.airlineApiUrl}/api/Airline/activateAirline/` + airline, null, {headers : headers})
//     .pipe(
//        catchError(error => {
//          alert(error.error);
//          return of(null);
//      }));
//   }

//   addAirline(airline : Airline):Observable<any>{
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
//     });
    
//     return this.http.post(`${config.airlineApiUrl}/api/Airline/addAirline`, airline, { headers:headers, responseType :'text' })
//       .pipe(
//         catchError(error => {
//           Swal.fire({  
//             icon: 'error',  
//             title: 'Oops...',  
//             text: error.error.toString()
//           });
//           return of(null);
//         }));
//   }

//   addFlight(flight : Flight):Observable<any>{
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
//     });
//     return this.http.post(`${config.airlineApiUrl}/api/Airline/addFlightSchedule`, flight, { headers: headers, responseType :'text' })
//       .pipe(
//         catchError(error => {
//           Swal.fire({  
//             icon: 'error',  
//             title: 'Oops...',  
//             text: error.error.toString()
//           });
//           return of(null);
//         }));
//   }

//   deleteFlight(flightNo : number):Observable<any>{
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem(this.JWT_TOKEN)}`
//     });
//     return this.http.delete<any>(`${config.airlineApiUrl}/api/Airline/deleteFlight`+flightNo, { headers: headers })
//       .pipe(
//         catchError(error => {
//           alert(error.error);
//           return of(null);
//         }));
//   }




    

}
