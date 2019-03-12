import { Component, OnInit } from '@angular/core';
import { COMMENTS } from "./comment"
import {RoleService } from "../role.service"

@Component({
  selector: 'app-fourm',
  templateUrl: './fourm.component.html',
  styleUrls: ['./fourm.component.css']
})
export class FourmComponent implements OnInit {
 
public comment = [];


  constructor(private roleService: RoleService) { }

  ngOnInit() {
    console.log(COMMENTS)
   this.comment = COMMENTS

   this.roleService.getToken()

  //   fetch('./comment.ts', {
  //   method: 'get',
  //   })
  //   .then(response => response.json())
  //   .then(json => {
  //   this.char = json.results
  //   })
  //   .then(json => {
  //   console.log(COMMENTS)
  //  })
  }


delete(DIO) {
  DIO.preventDefault(); 
  console.log("delete")
}

update(DIO) {
  DIO.preventDefault(); 
  console.log("update")
}

createPost(DIO) {
    DIO.preventDefault(); 
    console.log(DIO);
    var comment = DIO.target.elements[0].value;

        console.log(comment)
  

}

}
