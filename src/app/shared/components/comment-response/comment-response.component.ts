import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { constants } from '../../constants';

@Component({
  selector: 'app-comment-response',
  templateUrl: './comment-response.component.html',
  styleUrls: ['./comment-response.component.scss']
})
export class CommentResponseComponent implements OnInit {
  baseUrl = constants.aws_s3
  defaultImage = constants.default_img;
  
  constructor(
    public dialogRef: MatDialogRef<CommentResponseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

}
