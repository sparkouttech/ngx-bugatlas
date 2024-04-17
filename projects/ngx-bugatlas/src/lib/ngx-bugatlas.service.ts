import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxBugatlasService {
  privateKey:string = '';

  constructor() { }

/**
 * set private key
 * @param {string} key 
 */
setPrivateKey(key:string){
  this.privateKey = key;
} 

/**
 * Gets private key
 */
getPrivateKey(){
  return this.privateKey;
}

}
