// src/app/about/about.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://tenor.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
  }

}
