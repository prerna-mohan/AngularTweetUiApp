import { ActivatedRoute, Router } from '@angular/router';
import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Country } from '../models/Country';
import { State } from '../models/state';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterContentChecked{

  maxDate: string;
  countries: Country[];
  states: State[];
  guardianTypes = ['Father', 'Husband'];
  citizenshipTypes = ['Indian', 'Other'];
  maritalStat = ['Single', 'Married', 'Divorced', 'Widowed'];
  public citizenStatus = ['Minor', 'Normal', 'Senior'];
  invalidMessage = "";
  user = new User();
  users:User[]=[];
  public uploadResult?: any;

  constructor(private cdref: ChangeDetectorRef, private userService: LoginService, private route: ActivatedRoute, private router: Router) {
    this.userService.getAllUsers().subscribe(users => {
      if(users!=null){
        this.users = users;
      }
    });
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();

  }

  changeFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

  previewFile() {
    const preview = document.querySelector('img');
    const file = (document.querySelector('input[type=file]') as HTMLInputElement).files[0];
    const reader = new FileReader();
    const type = file.type;

  
    reader.addEventListener("load", function () {
      // convert image file to base64 string
      preview.src = reader.result as string;
    }, false);
    this.changeFile(file).then((base64: string): any => {
      const fileblob = new Blob([base64], {type: type});
      console.log(fileblob);
      this.user.emailId="ccc@gmail.com";
      this.user.profileImg = base64;
    });
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  isUsernameTaken(uname: string){
    var result = this.users.find(u => u.username == uname);
    if(result!=null){
      return true;
    }
    else{
      return false;
    }
  }


  save(isValid: boolean): void {
    if (isValid) {
      this.userService.register(this.user).subscribe(user => {
        if (user!=null) {
          alert("Register Successfull!!")
          this.router.navigate(['home']);
        }
        
      });    
    }
    }
  }

  // private GenerateUId() {
  //   return 'R-' + Math.floor(Math.random() * (999 - 100 + 1) + 100);
  // }

  // private GenerateAccountNo() {
  //   return (Math.floor(Math.random() * (9 * Math.pow(10, 16 - 1))) + Math.pow(10, 16 - 1)).toString();
  // }

  // public initialDeposit() {

  //   let deposit = null;
  //   if (this.user.accountType == 'Savings')
  //     deposit = 5000;
  //   else
  //     deposit = 0;
  //   if (this.user.accountType != null) {
  //     this.user.initDeposit = deposit;
      
  //   } 
  // }

  // public ageCalculator() {

  //   const today = new Date();
  //   const birthDate = new Date(this.user.dob);
  //   let ageYears = today.getFullYear() - birthDate.getFullYear();
  //   const m = today.getMonth() - birthDate.getMonth();

  //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
  //     ageYears--;
  //   }
  //   if (this.user.dob != null) {
  //     this.user.age = ageYears;
  //   }
  // }

  // public statusCalculator() {
  //   let status = "";
  //   let ageYears = this.user.age;
  //   if (ageYears < 18)
  //     status = this.citizenStatus[0];
  //   if (ageYears >= 18 && ageYears <= 60)
  //     status = this.citizenStatus[1];
  //   if (ageYears > 60)
  //     status = this.citizenStatus[2];

  //   if (ageYears != null) {
  //     this.user.citizenStatus = status;
  //   }
  // }

