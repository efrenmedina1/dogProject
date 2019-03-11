import { Component, OnInit } from '@angular/core';
import { COMMENTS } from "./comment"

@Component({
  selector: 'app-fourm',
  templateUrl: './fourm.component.html',
  styleUrls: ['./fourm.component.css']
})
export class FourmComponent implements OnInit {
 
public comment = [];

  constructor() { }

  ngOnInit() {
    console.log(COMMENTS)
   this.comment = COMMENTS

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

}
