import { HttpClient, HttpErrorResponse, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { NgxBugatlasService } from "ngx-bugatlas";
import { UAParser } from 'ua-parser-js';
import { v4 as uuidv4 } from 'uuid';



/**
 * Http error interceptor helper
 */
export class HttpErrorInterceptorHelper {
    private ipAddressCache: string | null = null;;
    private ipAddressCacheExpiry: number | null = null;;
    constructor(private ngxBugatlasService: NgxBugatlasService, private router: Router, private http: HttpClient) { }

    public constructPayload(error: any, request?: HttpRequest<any>): any {
        if (error instanceof HttpErrorResponse) {
            return {
                // API error
                request_url: request?.url,
                request_method: request?.method,
                payload: request?.body,
                error_type: 0,
                error_message: error.message,
                tag: 'tag',
                meta: {
                    meta: 'data',
                }
            };
        } else {
            return {
                // Client error
                device_id: this.getDeviceId(),
                ip_address: this.getIpAddress(),
                operating_system: this.getOperatingSystem(),
                os_version: this.getOsVersion(),
                browser: this.getBrowser(),
                browser_version: this.getBrowserVersion(),
                error_type: 0,
                error_message: error.message,
                tag: 'tag',
                meta: {
                    data: 'meta data'
                }
            };
        }
    }


    /**
     * Gets device id
     * @returns device id 
     */
    public getDeviceId(): any {
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
    public getIpAddress(): string {
        const now = new Date().getTime();
        if (this.ipAddressCache && this.ipAddressCacheExpiry! > now) {
            return this.ipAddressCache;
        }
        this.http.get('https://api.ipify.org/?format=json')
            .subscribe((response: any) => {
                this.ipAddressCache = response.ip;
                this.ipAddressCacheExpiry = now + (15 * 60 * 1000); // 15 minutes
            });
        return this.ipAddressCache ?? 'Unknown IP Address'; // Return a default value if null
    }

    /**
     * Gets operating system
     * @returns operating system 
     */
    public getOperatingSystem(): any {
        const parser = new UAParser(navigator.userAgent);
        return parser.getOS().name;
    }

    /**
     * Gets os version
     * @returns os version 
     */
    public getOsVersion(): any {
        const parser = new UAParser(navigator.userAgent);
        return parser.getOS().version;
    }

    /**
     * Gets browser
     * @returns browser 
     */
    public getBrowser(): any {
        const parser = new UAParser(navigator.userAgent);
        return parser.getBrowser()?.name;
    }

    /**
     * Gets browser version
     * @returns browser version 
     */
    public getBrowserVersion(): any {
        const parser = new UAParser(navigator.userAgent);
        return parser.getBrowser().version;
    }
}