import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-approved',
  templateUrl: './auth-approved.component.html',
  styleUrls: ['./auth-approved.component.scss']
})
export class AuthApprovedComponent implements OnInit {

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
