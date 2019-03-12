import { Component, OnInit } from '@angular/core';
import { PROFILE } from './profile'
import {RoleService } from "../role.service"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

public profile = [];

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    console.log(PROFILE);
    this.profile = PROFILE

    this.roleService.getToken()
  }

}
