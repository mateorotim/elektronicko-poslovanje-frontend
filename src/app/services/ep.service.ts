import { Injectable } from '@angular/core';
import { Userinterface } from '../interfaces/userinterface';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class EpService {

  constructor(private http:Http) { }
  
  login(username: string, password: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('username', username);
    headers.append('password', password);
    let options = new RequestOptions({ headers: headers });

    return this.http.get('http://eposlovanje.ddns.net:3000/api/v1/login', options)
      .map(response => {
        let status = response.json();
        return (status.success === true ? true : false);
      });
  }

  list(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.get('/api/v1/read', options)
      .map(response => response.json());
  }

  listUsers(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.get('/api/v1/listUsers', options)
      .map(response => response.json());
  }

  change(relay){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/v1/control', relay, options)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(new Error(error.status));
      });
  }

  addRelay(relay){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/v1/add', relay, options)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(new Error(error.status));
      });
  }

  addUser(newUser){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/v1/addUser', newUser, options)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(new Error(error.status));
      });
  }

  removeRelay(relay){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/v1/remove', relay, options)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(new Error(error.status));
      });
  }

  removeUser(userToRemove){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/v1/removeUser', userToRemove, options)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(new Error(error.status));
      });
  }

  updateUser(userToUpdate){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/v1/updateUser', userToUpdate, options)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(new Error(error.status));
      });
  }

  listCameras(){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.get('/api/v1/listCameras', options)
      .map(response => response.json());
  }

  addCamera(newCamera){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/v1/addCamera', newCamera, options)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(new Error(error.status));
      });
  }

  removeCamera(cameraToRemove){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let user = JSON.parse(localStorage.getItem('currentUser'));
    headers.append('username', user.username);
    headers.append('password', user.password);
    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/v1/removeCamera', cameraToRemove, options)
      .map(response => response.json())
      .catch(error => {
        return Observable.throw(new Error(error.status));
      });
  }
}
