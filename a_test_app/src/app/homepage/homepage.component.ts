import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Parser from 'rss-parser';
import { inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Feed, Data, FeedSource } from '../dtos/feeds';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [ FormsModule ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {
  // variables
  private http = inject(HttpClient);
  feed: Feed[] = [];
  inputFeedName: String = '';
  inputFeedType: String = '';
  headers = {
    "Access-Control-Allow-Origin": "*"
  };


  // function definitions
  async getFeed() {
    await this.http.get("http://localhost:5000/rss/custom/6866a4ca0dc1b0ec46129bcb", { headers: this.headers }).subscribe((data: Partial<Data>) => {
      try {
        if (data.entries) {
          data.entries.forEach((eachElement: FeedSource) => {
            eachElement.feeds.forEach((eachFeed: Feed) => {
              eachFeed.feedType = eachElement.feedSource;
              this.feed.push(eachFeed);
            });
          });
        }
      } catch(error) {
        console.error(error);
      } finally {
        console.log("pushed");
      };
    });
  }

  async buttonClicked() {
    if (this.inputFeedType.length > 2) {
      await this.http.get(`http://localhost:5000/rss/${this.inputFeedName}/${this.inputFeedType}`, { headers: this.headers }).subscribe((data: Partial<Data>) => {
        try {
        if (data.entries) {
          this.feed = [];
          data.entries.forEach((eachEntry) => {
            console.log(eachEntry);
          });
        };
      } catch(error) {
        console.error(error);
      }
      });
    } else {
      await this.http.get(`http://localhost:5000/rss/${this.inputFeedName}`, { headers: this.headers }).subscribe((data: Partial<Data>) => {
        try {
        if (data.entries) {
          this.feed = [];
          data.entries.forEach((eachEntry) => {
            console.log(eachEntry);
          });
        };
      } catch(error) {
        console.error(error);
      }
      });
    }
  }

  constructor() {}

  async ngOnInit() {
    await this.getFeed();
  }
}
