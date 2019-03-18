import { Component, OnInit } from '@angular/core';
import { PROFILE } from './profile'
import { DOGS } from '../dog-list/dog'
import {RoleService } from "../role.service"
import { HttpClient } from '@angular/common/http';
import { profile } from './profileModel';
import { APIURL } from '../../environments/environment.prod';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

public profile = [];
public dog = [];
public comment = [];
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
      this.getComments()

    
  }

//   getProfile() : any {
//     return this.http.get('http://localhost:3000/profilelist/');
// }
getProfile = () => {
  fetch(`${APIURL}/profile/`,{
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })

  .then(response =>{  response.json()
  .then(data => {
    this.profile = data;
    // console.log(data)
    // console.log(this.roleService.token)
    // console.log(this.profile)
    
  })
  .then(data => {
    if(this.profile.length == 1  ){
      // console.log(this.profile.length)
      this.profileTrue = false
      this.profileFalse = true
    } else {
      this.profileTrue = true
      // console.log(this.profile.length)
      this.profileFalse = false
    }
    
    
  })
  
})
}

getDogs = () => {
  fetch(`${APIURL}/dogs/`,{
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })

  .then(response =>{  response.json()
  .then(data => {
    this.dog = data;
    // console.log(data)
    // console.log(this.roleService.token)
    // console.log(this.profile)
    this.roleService.getToken() 
  });
})
}

getComments = () => {
  fetch(`${APIURL}/comments/`,{
    method: 'GET',
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })

  .then(response =>{  response.json()
  .then(data => {
    this.comment = data;
    // console.log(data)
    // console.log(this.roleService.token)
    // console.log(this.comment)
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
  let picture = e.target.elements[2].value;
  let email = e.target.elements[3].value;
  let phone = e.target.elements[4].value;
  let address = e.target.elements[5].value;
  let about = e.target.elements[6].value;
  
  console.log(e.target.elements.value);
  console.log(this.roleService.token);
  console.log(age);

  fetch(`${APIURL}/profile/`, {
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

profileUpdate = (e) => {
  let name = e.target.elements[0].value;
  let age = e.target.elements[1].value;
  let picture = e.target.elements[2].value;
  let email = e.target.elements[3].value;
  let phone = e.target.elements[4].value;
  let address = e.target.elements[5].value;
  let about = e.target.elements[6].value;
  let profileID = e.target.elements[7].id;

  console.log(profileID)

  fetch(`${APIURL}/profile/${profileID}`, {
    method: 'PUT',
    body: JSON.stringify(
      {
        "name": name,
        "age": age,
        "about": about,
        "picture": picture,
        "email": email,
        "phone": phone,
        "address": address,
        

        
        }
    ),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })
  .then(response => console.log(response))
  .then((res) => this.ngOnInit() )
  .then((res) => window.alert("Updated Profile") )
  
  
}


createDog(e) {
  e.preventDefault(); 
  
  let breed = e.target.elements[0].value;
  let name = e.target.elements[1].value;
  let age = e.target.elements[2].value;
  let picture = e.target.elements[3].value;
  let description = e.target.elements[4].value;
 
  
  // console.log(this.roleService.token);
  // console.log(age);

  fetch(`${APIURL}/dogs/`, {
    method: 'POST',
    body: JSON.stringify(
      {
        "breed": breed,
        "name": name,
        "age": age,
        "picture": picture,
        "description": description,
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

dogUpdate = (e) => {
  let breed = e.target.elements[0].value;
  let name = e.target.elements[1].value;
  let age = e.target.elements[2].value;
  let picture = e.target.elements[3].value;
  let description = e.target.elements[4].value;
  let dogID = e.target.elements[5].id;

  console.log(dogID)

  fetch(`${APIURL}/dogs/${dogID}`, {
    method: 'PUT',
    body: JSON.stringify(
       {
        "breed": breed,
        "name": name,
        "age": age,
        "picture": picture,
        "description": description,
        
      }
    ),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.roleService.token
    })
  })
  .then(response => console.log(response))
  .then((res) => this.ngOnInit() )
  
}


deleteProfile(e) {
  e.preventDefault();
  console.log('delete');
  var delID = e.target.elements[0].id;
  var token = this.roleService.token;
  console.log(token);
  console.log(delID);

  fetch(`${APIURL}/profile/${delID}`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: token
    })
  })
    .then(json => { window.location.reload();})

    
}


deleteDog(e) {
  e.preventDefault();
  console.log('delete');
  var delID = e.target.elements[0].id;
  var token = this.roleService.token;
  console.log(token);
  console.log(delID);

  fetch(`${APIURL}/dogs/${delID}`, {
    method: 'DELETE',
    headers: new Headers({
      Authorization: token
    })
  })
    .then((res) => this.ngOnInit() )

    
}

}
