import { Component, OnInit } from '@angular/core';
import { EpService } from '../services/ep.service';
import { Userinterface } from '../interfaces/userinterface';
import { md5 } from '../md5';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed = false;

  constructor(private epService:EpService, private router:Router) { }

  ngOnInit() {
  }

  login(form:Userinterface){
    let username = form.username;
    let password = md5(form.password);
    this.epService.login(username, password).subscribe(
      response => {
        if(response == true){
          localStorage.setItem('currentUser', JSON.stringify({ username: username, password: password }));
          this.router.navigate(['/']);
        } else if (response == false) {
          this.loginFailed = true;
          console.log("wrong username or password");
        }
      }
    );
  }

}
