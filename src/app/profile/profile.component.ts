import { Component, OnInit } from '@angular/core';
import { PROFILE } from './profile'
import { DOGS } from '../dog-list/dog'
import {RoleService } from "../role.service"
import { HttpClient } from '@angular/common/http';
import { profile } from './profileModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

public profile = [];
public dogs = [];
public profileTrue = true;
public profileFalse = false;



  constructor(private roleService: RoleService, private http: HttpClient) { }


  ngOnInit() {
    
    this.roleService.getToken()

    this.getProfile()
    // .subscribe(data => 
    //   // console.log(data)
    //   this.profile = data
    //   // console.log(this.products)
    //   );
      // this.getProfilelength()

      this.getDogs()

    
  }


//   getProfile() : any {
//     return this.http.get('http://localhost:3000/profilelist/');
// }
getProfile = () => {
  fetch('http://localhost:3000/profile/',{
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })

  .then(response =>{  response.json()
  .then(data => {
    this.profile = data;
    console.log(data)
    console.log(this.roleService.token)
    console.log(this.profile)
    
  })
  .then(data => {
    console.log(data)
    if(this.profile.length == 1  ){
      console.log(this.profile.length)
      this.profileTrue = false
      this.profileFalse = true
    } else {
      this.profileTrue = true
      console.log(this.profile.length)
      this.profileFalse = false
    }
    
    
  })
  
})
}

getDogs = () => {
  fetch('http://localhost:3000/dogs/',{
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })

  .then(response =>{  response.json()
  .then(data => {
    this.dogs = data;
    console.log(data)
    console.log(this.roleService.token)
    console.log(this.profile)
    this.roleService.getToken()
  });
})
}

// getProfilelength() {
//   if(this.profile.length == 1  ){
//     console.log(this.profile.length)
//     this.profileTrue = true
//     // this.profileFalse = true
//   } else {
//     this.profileTrue = false
//     console.log(this.profile.length)
//     // this.profileFalse = false
//   }
// }





createProfile(e) {
  e.preventDefault(); 
  
  let name = e.target.elements[0].value;
  let age = e.target.elements[1].value;
  let about = e.target.elements[6].value;
  let picture = e.target.elements[2].value;
  let email = e.target.elements[3].value;
  let phone = e.target.elements[4].value;
  let address = e.target.elements[5].value;
  console.log(e.target.elements.value);
  console.log(this.roleService.token);
  console.log(age);

  fetch('http://localhost:3000/profile/', {
    method: 'POST',
    body: JSON.stringify(
      {
        "name": name,
        "age": age,
        "about": about,
        "picture": picture,
        "email": email,
        "phone": phone,
        "address": address,
        "userId": "1"
        
        }
    ),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })
  .then((res) => this.ngOnInit() )
}

deleteProfile(e) {
  e.preventDefault();
  console.log('delete');
  var delID = e.target.elements[0].id;
  var delUrl = `http://localhost:3000/profile/${delID}`;
  var token = this.roleService.token;
  console.log(token);

  fetch(delUrl, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: token
    })
  }).then(response => response.json())
    .then(json => { console.log(json)})

    .then(refresh =>
      this.ngOnInit()
    
      ) 
}

}

