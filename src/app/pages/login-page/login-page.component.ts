import { HttpResponse } from '@angular/common/http';
import { AuthService } from './../../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private service : AuthService) { }

  ngOnInit(): void {
  }

  onLoginButtonClicked(email : string, password: string){
    
    this.service.login(email,password).subscribe((res: HttpResponse<any>)=>{
      console.log(res);
    });
  }
}
