import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httpRequest } from './interface/httpRequest';

@Injectable({
  providedIn: 'root'
})
export class NgxBugatlasService {
  configKey:any;

  constructor(
    private http:HttpClient
  ) { }

/**
 * set private key
 * @param {object} key 
 */
seConfigKey(key:object){
  this.configKey = key;
  
} 


/**
 * Posts error
 * @param {httpRequest} data 
 */
postError(data:httpRequest){
  return this.http.post('https://api.bugatlas.com/v1/api/errors',data, {
    headers: {
      api_key:this.configKey.api_key,
      secret_key:this.configKey.secret_key,
    }
  });
}

}
