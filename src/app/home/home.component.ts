import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  // @TODO move this somewhere
  logout(): void {
    localStorage.removeItem('jwt-token');
    this.router.navigateByUrl('entry');
  }

}
