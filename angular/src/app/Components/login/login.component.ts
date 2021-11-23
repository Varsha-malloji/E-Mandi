import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private loginForm: any;
  error = false;
  submitted = false;
  notFoundError = false;
  showPassword = false;

  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  get f() { return this.loginForm.controls; }

  login(): void {
    this.submitted = true;
    this.apiService.login(this.loginForm.value).
      subscribe(res => {
        console.log(res)
        this.apiService.storeUserId(res.userId)
        console.log(this.apiService.getUserId())
        if (res.status === "200" && res.userType == "CUSTOMER") {
          this.apiService.storeToken(res.authToken, "CUSTOMER");
          this.router.navigate(['/home']);
          this.error = false;
        } else if (res.status === "200" && res.userType == "ADMIN") {
          this.apiService.storeToken(res.authToken, "ADMIN");
          this.router.navigate(['/admin']);
          this.error = false;
        } else if (res.status === "500") {
          this.router.navigate(['/login']);
          this.notFoundError = true;
        } else {
          this.error = true;
        }
        console.log(res.status)
      },
        err => {
          console.log(err)
          this.router.navigate(['/login']);
          this.error = true;
      });
  }

  toggleFieldTextType() {
    this.showPassword = !this.showPassword;
  }
}
