import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private editProfile: any;
  private auth: string;
  userlist: User;
  flag = true;
  totalCount: number = 0;
  constructor(private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    this.apiService.userProfile().subscribe(res => {
      console.log(res)
      this.userlist = res;
    }, err => {
      console.log(err)
      alert('There was a problem in loading')
    });

  }

  createForm() {
    this.editProfile = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      mobileNumber: '',
      status: '',
      role: ''
    });
  }


}
