import { Component, OnInit } from '@angular/core';
import { EpService } from '../../services/ep.service';
import { md5 } from '../../md5';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private relays = [];
  private users = [];
  private cameras = [];

  private relayAddMessage = "";
  private relayAddError = false;

  private userAddMessage = "";
  private userAddError = false;

  private cameraAddMessage = "";
  private cameraAddError = false;

  constructor(private epService: EpService, private router: Router) { }

  addRelay(form) {
    let name = form.value.name;
    let pin = form.value.pin;
    let relay = {
      name: name,
      pin: pin,
      state: false
    }
    this.epService.addRelay(relay).subscribe(
      response => {
        if (response.added == true) {
          this.relayAddError = false;
          this.relays.push(relay);
          form.reset();
        } else {
          this.relayAddMessage = response.reason;
          this.relayAddError = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  addUser(userForm) {
    let username = userForm.value.username;
    let password = md5(userForm.value.password);
    let newUser = {
      username: username,
      password: password
    }
    this.epService.addUser(newUser).subscribe(
      response => {
        if (response.added == true) {
          this.userAddError = false;
          this.users.push(newUser);
          userForm.reset();
        } else {
          this.userAddMessage = response.reason;
          this.userAddError = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  addCamera(cameraForm) {
    let name = cameraForm.value.cameraName;
    let username = cameraForm.value.username;
    let password = cameraForm.value.password;
    let ip = '';
    if (username.length < 1 || password.length < 1) {
      ip = cameraForm.value.cameraIp;
    } else {
      ip = cameraForm.value.cameraIp;
      let pIndex = ip.indexOf('://');
      let prefix = ip.substr(0, pIndex + 3);
      ip = ip.slice(pIndex + 3, ip.length);
      ip = prefix + username + ':' + password + '@' + ip;
      ip = ip.replace(/\s/g, '');
    }
    let newCamera = {
      name: name,
      ip: ip,
      username: username,
      password: password
    }
    this.epService.addCamera(newCamera).subscribe(
      response => {
        if (response.added == true) {
          this.cameraAddError = false;
          this.cameras.push(newCamera);
          cameraForm.reset();
        } else {
          this.cameraAddMessage = response.reason;
          this.cameraAddError = true;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  removeRelay(index) {
    let relay = this.relays[index];
    this.epService.removeRelay(relay).subscribe(
      response => {
        console.log('success', response);
        if (response.success == true) {
          this.relays.splice(index, 1);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  removeUser(index) {
    let user = this.users[index];
    this.epService.removeUser(user).subscribe(
      response => {
        console.log('success', response);
        if (response.removed == true) {
          this.users.splice(index, 1);
        }
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (user.username == currentUser.username) {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  removeCamera(index) {
    let camera = this.cameras[index];
    this.epService.removeCamera(camera).subscribe(
      response => {
        console.log('success', response);
        if (response.removed == true) {
          this.cameras.splice(index, 1);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  editUser(index, state) {
    let user = this.users[index];
    user.edit = state;
  }

  updateUser(index, password) {
    let user = this.users[index];
    if (password.length > 1) {
      user.password = md5(password);
      this.epService.updateUser(user).subscribe(
        response => {
          console.log('success', response);
          if (response.updated == true) {
            this.editUser(index, false);
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (user.username == currentUser.username) {
              localStorage.removeItem('currentUser');
              this.router.navigate(['/login']);
            }
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  listRelays() {
    this.epService.list().subscribe(response => {
      this.relays = response;
      console.log(this.relays);
    })
  }

  listUsers() {
    this.epService.listUsers().subscribe(response => {
      this.users = response;
      console.log(this.users);
    })
  }

  listCameras() {
    this.epService.listCameras().subscribe(response => {
      this.cameras = response;
      console.log(this.cameras);
    })
  }

  ngOnInit() {
    this.listRelays();
    this.listUsers();
    this.listCameras();
  }

}
