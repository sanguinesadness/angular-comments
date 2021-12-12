import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Photo } from 'src/types/photo';
import { faImage, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'img-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  public photos: Photo[] = [];
  public imgIcon = faImage;
  public authorIcon = faUserCircle;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const limit = 10;
    const page = 3;
    const url = `https://picsum.photos/v2/list?limit=${limit}&page=${page}`;

    this.http.get<Photo[]>(url).subscribe((photos) => (this.photos = photos));
  }
}
