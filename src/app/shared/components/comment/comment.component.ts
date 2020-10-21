import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  reply: String;
  real: String;
  loading: boolean=false;
  pollItems: Object[] = [
    { icon: null, text: 'Real', color: 'real', type: 'real' },
    { icon: null, text: 'Fake', color: 'fake', type: 'fake' },
    { icon: null, text: 'Unknown', color: 'neutral', type: 'neutral' },
  ]
  message: String;

  constructor(
    private articleService: ArticleService,
    public dialogRef: MatDialogRef<CommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  triggerItem(ele){
    this.real = ele === this.real ? null : ele;
  }

  submit(){
    this.loading = true;
    const submit = {
      reply: this.reply,
      real: this.real,
      articleId: this.data.article['_id']
    }

    const isFilled = Object.values(submit).some(v => v);
    if (!isFilled) {
      this.message = 'Fill response or select option'
      
    } else {
      this.articleService.submitComment(submit).pipe(take(1)).subscribe(response=>{
        if (response['success']) {
          this.message = "Response published."

          setTimeout(()=>{
            this.dialogRef.close();
          }, 1500)
        }
      })
    }
    this.loading = false;
  }

}
