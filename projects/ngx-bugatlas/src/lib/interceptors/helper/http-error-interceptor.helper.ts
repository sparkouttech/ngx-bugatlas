import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorPayload } from '../../interface/error-interface';
import { DeviceInfoService } from '../../shared/device-info.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptorHelper {
    constructor(private deviceInfoService: DeviceInfoService) { }

    constructPayload(error: any, request?: HttpRequest<any>): Observable<ErrorPayload> {
        if (error instanceof HttpErrorResponse) {
            return from(Promise.resolve({
                //api error
                request_url: request?.url,
                request_method: request?.method,
                payload: request?.body,
                error_type: 0,
                error_message: error.message,
                tag: 'tag',
                meta: { meta: 'data' }
            }));
        }

        return this.deviceInfoService.getIpAddress().pipe(
            map(ipAddress => {
                const systemInfo = this.deviceInfoService.getSystemInfo();
                return {
                    //client error
                    device_id: this.deviceInfoService.getDeviceId(),
                    ip_address: ipAddress,
                    ...systemInfo,
                    error_type: 0,
                    error_message: error.message,
                    tag: 'tag',
                    meta: { data: 'meta data' }
                };
            })
        );
    }
}