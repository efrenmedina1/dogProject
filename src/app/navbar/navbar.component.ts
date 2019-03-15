import { Component, OnInit } from '@angular/core';
import {RoleService } from "../role.service"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.roleService.getToken()
  }
  

  THEWORLD(DIO) {
    DIO.preventDefault(); 
    console.log(DIO);

    var role = "admin"
    var token = "GOLDEN EXPERIENCE"
    this.roleService.adminRole = true
    this.roleService.userRole = true
    this.roleService.noRole = false
    sessionStorage.setItem('role', role)
    sessionStorage.setItem('token', token)
    
}

userRole(DIO) {
  DIO.preventDefault(); 
  console.log(DIO);

  var role = "user"
  var token = "GOLDEN EXPERIENCE"
  this.roleService.adminRole = false
  this.roleService.userRole = true
  this.roleService.noRole = false
  sessionStorage.setItem('role', role)
  sessionStorage.setItem('token', token)
  
}

logout(DIO) {
  DIO.preventDefault(); 

  sessionStorage.clear();
  this.roleService.adminRole = false
  this.roleService.userRole = false
  this.roleService.noRole = true
  window.location.reload();
}


}
