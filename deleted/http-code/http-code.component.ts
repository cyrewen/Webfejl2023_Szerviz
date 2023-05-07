import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-http-code',
  templateUrl: './http-code.component.html',
  styleUrls: ['./http-code.component.scss']
})
export class HttpCodeComponent implements OnInit {
  httpErrorCode: string = '';

  constructor(private actRoute: ActivatedRoute, private router: Router){

  }

  ngOnInit(): void {
    this.actRoute.params.subscribe(param => {
      this.httpErrorCode = param['httpErrorCode'];
    }); 
  }
}
