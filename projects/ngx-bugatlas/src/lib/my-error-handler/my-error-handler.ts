import { ErrorHandler, inject, Provider } from "@angular/core";
import platform from 'platform';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map, catchError } from "rxjs";
import { NgxBugatlasService } from "../ngx-bugatlas.service";
// Function to retrieve or generate a unique device ID
function getDeviceId(): string {
  let deviceId = localStorage.getItem('deviceId'); // Check if device ID already exists in localStorage
  if (!deviceId) {
    deviceId = generateUUIDV4();  // If not, generate a new UUID
    localStorage.setItem('deviceId', deviceId);  // Store the new device ID in localStorage
  }
  return deviceId;  // Return the device ID (either retrieved or generated)
}

// Function to generate a UUID v4 (random UUID)
function generateUUIDV4(): string {
  const s = [];
  const hexDigits = '0123456789abcdef';
  
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }

  s[14] = '4';  // bits 12-15 of the time_hi_and_version field to 0010

  // Correct the bitwise operation on s[19] by converting it to a number
  const randValue = parseInt(s[19], 16) & 0x3;  // Convert s[19] to number (hex to int)
  s[19] = hexDigits.charAt(randValue | 0x8);  // Apply the bitwise operation correctly

  s[8] = s[13] = s[18] = s[23] = '-';  // Format the UUID with dashes

  return s.join('');  // Join the array into a string to form the UUID
}

export class MyErrorHandler implements ErrorHandler {
  bugatlasService = inject(NgxBugatlasService);
  http=inject(HttpClient)
 // Flag to track if the error is already logged
 private static isErrorLogged:boolean = false;
 private ipAddress: string | undefined;
 constructor() {
  this.getIpClient().subscribe({
    next: (ip) => {
    this.ipAddress = ip;
    },
    error: () => {
      this.ipAddress = 'Unknown IP'; // Fallback IP address if fetching fails
      
    }
  });
}
  handleError(error: any) {
    if (MyErrorHandler.isErrorLogged) {
      return;
    }
    

    // Prepare the device info (this can be extended or modified as needed)
    const deviceInfo = {
      device_id: getDeviceId(), // Replace with your actual logic to fetch device ID
      ip_address: this.ipAddress , // Replace with actual IP retrieval logic
      operating_system: platform.os?.family || "Unknown OS",
      os_version: platform.os?.version || "Unknown Version",
      browser: platform.name || "Unknown Browser",
      browser_version: platform.version || "Unknown Version",
    };

    // Prepare the error payload
    let clientErrorPayload: any = {
      ...deviceInfo,
      error_type: 0, // Client-side error type
      request_method: error instanceof HttpErrorResponse ? error.statusText : '', // We don't have request method here since it's a general JS error, not an HTTP error
      tag: "Web app",
      meta: {
        data: "Client-side error or network issue",
        page: window.location.href,
      },
    };

    if (error instanceof Error) {
      
      // Client-side JavaScript error
      clientErrorPayload = {
        ...clientErrorPayload,
        error_message: error.message,
        error_stack: error.stack, // Capture stack trace for debugging
        
      };
    } else if (error instanceof HttpErrorResponse) {
      
      // If it's an HTTP error, you can capture more details
      clientErrorPayload = {
        ...clientErrorPayload,
        error_stack: error.error,
        error_message: error.message || 'HTTP error occurred',
        request_method: error.statusText || 'Unknown Method',
        status_code: error.status,
      };
    }

        MyErrorHandler.isErrorLogged = true;
    // Log the error to BugAtlas
    this.bugatlasService.appErrorPost(clientErrorPayload).subscribe({
      next: () =>{},
      error: () => {},
    
    });

    
  }
   // Function to get client's public IP address
   private getIpClient() {
    return this.http.get<{ ip: string }>('https://api.ipify.org?format=json').pipe(
      map((response) => {
        return response.ip;  // Extract and return the IP address from the response
      }),
      catchError((err) => {
        console.error('Error fetching IP address:', err);  // Log the error
        return 'Unknown IP';  // Default IP in case of error
      })
    );
  }
}
