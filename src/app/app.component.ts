import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/types/comment';
import { FilterType, FilterTypes } from 'src/types/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private _comments: Comment[] = [];
  public comments: Comment[] = [];
  public searchValue: string = '';
  public title = 'Comments';

  constructor(private http: HttpClient) {}

  // fetch Comments on init
  ngOnInit(): void {
    const start = 0;
    const limit = 100;

    this.http
      .get<Comment[]>(
        `https://jsonplaceholder.typicode.com/comments?_start=${start}&_limit=${limit}`
      )
      .subscribe((comments) => {
        this._comments = comments;
        this.comments = comments;
      });
  }

  // no Comments were found after search?
  isResultEmpty = () => this.searchValue && !this.comments.length;

  // on input value change
  onSearchChange = (value: string) => {
    this.searchValue = value;
    this.search(value);
  };

  // filter Comments by name, email and body (message)
  search = (search: string) => {
    const searchLower = search.toLowerCase();

    const filteredComments = this._comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(searchLower) ||
        comment.email.toLowerCase().includes(searchLower) ||
        comment.body.toLowerCase().includes(searchLower)
    );

    this.comments = filteredComments;
  };

  // on Remove button click
  removeComment = (commentId: number) => {
    this.comments = this.comments.filter((comment) => comment.id !== commentId);
  };

  // filters specific column in table by simple comparison
  filterBy = (field: keyof Comment, reversed?: boolean) => {
    const firstId = this.comments[0].id;

    const [num1, num2] = reversed ? [1, -1] : [-1, 1];
    this.comments.sort((a, b) => {
      const res = a[field] < b[field];
      return res ? num1 : num2;
    });

    // if list hasn't changed, fitler again with the opposite condition
    if (firstId === this.comments[0].id) {
      this.filterBy(field, true);
    }
  };

  // checks if all column values are sorted and returns type of sorting
  getFilterType = (field: keyof Comment): FilterType => {
    if (this.comments.length <= 1) {
      return FilterTypes.NONE;
    }

    let isAsc = true;
    let isDesc = true;

    for (let i = 0; i < this.comments.length - 1; i++) {
      if (this.comments[i][field] > this.comments[i + 1][field]) {
        isAsc = false;
      } else if (this.comments[i][field] < this.comments[i + 1][field]) {
        isDesc = false;
      }
    }

    return isAsc
      ? FilterTypes.ASC
      : isDesc
      ? FilterTypes.DESC
      : FilterTypes.NONE;
  };
}
