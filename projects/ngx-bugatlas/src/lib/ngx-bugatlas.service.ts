import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NgxBugatlasService {
  projectId:string = '';

  constructor() { }

/**
 * set private key
 * @param {string} key 
 */
setProjectId(key:string){
  this.projectId = key;
} 

/**
 * Gets private key
 */
getProjectId(){
  return this.projectId;
}

}
