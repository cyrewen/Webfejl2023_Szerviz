import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService implements ErrorHandler {

  constructor(private router: Router) { }

  handleError(error: any): void {
    console.log('error');
    console.log(error);
    

    if(error instanceof HttpErrorResponse){
      localStorage.setItem('httpError', 'true');
      
      this.router.navigateByUrl('/http-error/' + error.status);
    }
    // throw error;
  }
}
