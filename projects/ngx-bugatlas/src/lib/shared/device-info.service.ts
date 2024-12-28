import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { UAParser } from 'ua-parser-js';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class DeviceInfoService {
    private ipAddress$: Observable<string>;
    private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

    constructor(private http: HttpClient) {
        this.ipAddress$ = this.initializeIpAddress();
    }

    /**
     * Initializes ip address
     * @returns ip address 
     */
    private initializeIpAddress(): Observable<string> {
        return this.http.get('https://api.ipify.org/?format=json').pipe(
            map((response: any) => response.ip),
            catchError(() => of('Unknown IP Address')),
            shareReplay(1)
        );
    }

    /**
     * Gets device id
     * @returns device id 
     */
    getDeviceId(): string {
        let deviceId = localStorage.getItem('deviceId');
        if (!deviceId) {
            deviceId = uuidv4();
            localStorage.setItem('deviceId', deviceId);
        }
        return deviceId;
    }

    /**
     * Gets ip address
     * @returns ip address 
     */
    getIpAddress(): Observable<string> {
        return this.ipAddress$;
    }

    /**
     * Gets system info
     * @returns  
     */
    getSystemInfo() {
        const parser = new UAParser(navigator.userAgent);
        const os = parser.getOS();
        const browser = parser.getBrowser();

        return {
            operating_system: os.name,
            os_version: os.version,
            browser: browser.name,
            browser_version: browser.version
        };
    }
}