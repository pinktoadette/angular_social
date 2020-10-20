import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  pollItems: Object[] = [
    { icon: null, text: 'Real', color: 'real', type: 'real' },
    { icon: null, text: 'Fake', color: 'fake', type: 'fake' },
    { icon: null, text: 'Unknown', color: 'neutral', type: 'neutral' },
  ]

  constructor(public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
