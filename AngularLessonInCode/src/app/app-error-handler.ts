import { ErrorHandler } from '@angular/core';

/* Global Error Handler */
export class AppErrorHandler implements ErrorHandler {

    /* Overridden method */
    handleError(error: any) : any {
        alert ("Global error handler message.");
        console.log(error);
    }
}