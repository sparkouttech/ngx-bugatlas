import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { errorHttpRequest } from './interface/httpRequest';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NgxBugatlasService {
  configKey: any;
  private lastRoute: string = '';
  private startTime: number = 0;
  private routeTimings: { [key: string]: number[] } = {};


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        // Check if there is a last route to mark its end time
        if (this.lastRoute) {
          this.stopTimer(this.lastRoute);
        }
        this.lastRoute = event.url; // Update last route to the new route
        this.startTimer(this.lastRoute); // Start new timer
      }
    });

  }

  /**
   * set private key
   * @param {object} key 
   */
  seConfigKey(key: object) {
    this.configKey = key;

  }


  /**
   * Posts error
   * @param {errorHttpRequest} data 
   */
  postError(data: errorHttpRequest) {
    return this.http.post('https://api.bugatlas.com/v1/api/errors', data, {
      headers: {
        api_key: this.configKey.api_key,
        secret_key: this.configKey.secret_key,
      }
    });
  }


  /**
   * Posts navigation track
   * @param {any} data 
   * @returns  
   */
  postNavigationTrack(data: any) {
    return this.http.post('https://api.bugatlas.com/v1/analytics/client', data, {
      headers: {
        api_key: this.configKey.api_key,
        secret_key: this.configKey.secret_key,
      }
    });
  }


  /**
   * Starts timer
   * @param {string} route 
   */
  private startTimer(route: string): void {
    this.startTime = performance.now();
    if (!this.routeTimings[route]) {
      this.routeTimings[route] = [];
    }
    this.routeTimings[route].push(this.startTime);
  }

  /**
   * Stops timer
   * @param {string} route 
   */
  private stopTimer(route: string): void {
    const endTime = performance.now();
    const duration = endTime - this.startTime;
    const data = {
      page: route,
      meta: {
        'spend_time': duration,
      }
    }

    this.postNavigationTrack(data).subscribe((response) => { })
  }

}
