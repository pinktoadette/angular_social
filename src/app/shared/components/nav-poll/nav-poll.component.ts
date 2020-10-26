import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../services/auth.service';
import { CommentComponent } from '../comment/comment.component';
import { sum, values} from 'lodash';

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
    { icon: null, text: 'Neutral', color: 'neutral', type: 'neutral' },
  ]
  voteType: string | null;
  allVoteCount: {} = {
    'real':0,
    'fake':0,
    'neutral':0
  }
  sumAll = 1

  constructor(
    public dialog: MatDialog,
    private articleService: ArticleService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.getUserId() ){
      this.getMyVotes(this.articleInfo._id)
    }
    this.getAllVoteCount()
  }

  triggerItem(eleType) {
    switch (eleType) {
      case 'comment':
        this.openDialogComment()
        break;
      case 'retweet':
        // code block
        break;
      case eleType:
        this.vote(eleType)
        break;
      default:
        break
    }
  }

  getAllVoteCount() {
    this.articleService.allVoteTally(this.articleInfo._id).subscribe(result =>{
      this.allVoteCount = result
      this.sumAll = sum(values(result));
    })
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

  private vote(type) {
    const voteType = this.voteType === type ? null : type
    this.articleService.voteArticlePoll(this.articleInfo._id, voteType).subscribe(result =>{
      this.voteType = voteType
    })
  }

  private getMyVotes(id) {
    this.articleService.getVoteArticlePoll(id).pipe(take(1)).subscribe(res=>{
      this.voteType= !!res ? res['real'] : null
    })
  }

}
