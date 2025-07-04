import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { FetchApi } from '../../fetch-api';
@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, TagModule],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.scss'
})
export class MovieDetail {

}
