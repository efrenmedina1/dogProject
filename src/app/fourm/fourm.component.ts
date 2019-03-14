import { Component, OnInit } from '@angular/core';
import { COMMENTS } from "./comment"
import {RoleService } from "../role.service"
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fourm',
  templateUrl: './fourm.component.html',
  styleUrls: ['./fourm.component.css']
})
export class FourmComponent implements OnInit {

public comment = [];


  constructor(private roleService: RoleService, private http: HttpClient) { }

  ngOnInit() {

  //   console.log(COMMENTS)
  //  this.comment = COMMENTS
  this.roleService.getToken()
  
   this.getComments()
      .subscribe(data => 
        // console.log(data)
        this.comment = data.reverse()
        // console.log(this.products)
        );
   
   

 
  }
  getComments() : any {
    return this.http.get('http://localhost:3000/commentslist/');
}

delete(DIO) {
  DIO.preventDefault(); 
  console.log("delete")
}

update(DIO) {
  DIO.preventDefault(); 
  console.log("update")
}

createPost(e) {
    e.preventDefault(); 
    
    let comment = e.target.elements[0].value;
    console.log(comment);
    console.log(this.roleService.token);

    fetch('http://localhost:3000/comments/', {
      method: 'POST',
      body: JSON.stringify(
        {
          "description": comment,
          "userId": 5
          
          }
      ),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': this.roleService.token
      })
    })
    .then((res) => this.ngOnInit() )
  }
  

}

