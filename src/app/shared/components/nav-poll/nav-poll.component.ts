import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-nav-poll',
  templateUrl: './nav-poll.component.html',
  styleUrls: ['./nav-poll.component.scss']
})
export class NavPollComponent implements OnInit {
  @Input() articleInfo;
  pollItems: Object[] = [
    { icon: 'far fa-comment', text: '', color: '', type: 'comment' },
    { icon: 'fas fa-retweet', text: '', color: '', type: 'retweet' },
    { icon: null, text: 'Real', color: 'real', type: 'real' },
    { icon: null, text: 'Fake', color: 'fake', type: 'fake' },
    { icon: null, text: 'Unknown', color: 'neutral', type: 'neutral' },
  ]

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  triggerItem(eleType) {
    switch (eleType) {
      case 'comment':
        this.openDialogComment()
        break;
      case 'retweet':
        // code block
        break;
      case 'real':
        // code block
        break;
      case 'fake':
        // code block
        break;
      case 'neutral':
        // code block
        break;
      default:
        break
    }
  }

  openDialogComment() {
    const dialogRef = this.dialog.open(CommentComponent, {
      width: '500px',
      panelClass: 'no-padding',
      data: { article: this.articleInfo }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
