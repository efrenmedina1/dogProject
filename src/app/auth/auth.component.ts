import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {RoleService } from "../role.service"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private router: Router, private roleService: RoleService ) { }

  ngOnInit() {
  }
  signUp(e) {
    e.preventDefault(); 
    console.log(e);
    var username = e.target.elements[0].value;
    var password = e.target.elements[1].value;
  console.log(username, password);
  fetch('http://localhost:3000/user', {
  method: 'POST',
  body: JSON.stringify({
    "user": {
    username: username,
    password: password,
    role: "user"
    }
  }),
  headers: new Headers({
    'Content-Type': 'application/json'
  })
})
  .then(res => { if(res.status == 500) {
    window.alert( "User already exist. Please choose another username to signup" );
    console.log(res);
  } else {
    window.alert(`Welcome ${username} to our dog breeding and sale site. Please login in now to use the site's features`);
    console.log(res);
  } 
  })
}


loginUser(e) {
  e.preventDefault(); 
  console.log(e);
  var username = e.target.elements[0].value;
  var password = e.target.elements[1].value;
console.log(username, password);
fetch('http://localhost:3000/user/login', {
method: 'POST',
body: JSON.stringify(
  {
  "user" : {
  username: username,
  password: password
    }
  }
),
headers: new Headers({
  'Content-Type': 'application/json'
})
})
.then(response =>  response.json() )
.then(json => {
  console.log(json)
  this.roleService.role = json.user.role
  this.roleService.token = json.sessionToken


  this.router.navigate([''])
  window.alert("Logged in");
})
.then(response =>  sessionStorage.setItem('role', this.roleService.role) )
.then(response =>  sessionStorage.setItem('token', this.roleService.token) )

.then(response =>  window.location.reload )



  

}

