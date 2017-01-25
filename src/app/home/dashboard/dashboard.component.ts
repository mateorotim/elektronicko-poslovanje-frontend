import { Component, OnInit } from '@angular/core';
import { EpService } from '../../services/ep.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private relays = [];
  private cameras = [];
  constructor(private epService: EpService) { }

  toggleRelay(event, index){
    let state = null;
    let oldState = this.relays[index].state;
    this.relays[index].state = event.target.checked;
    let relay = {
      'name': this.relays[index].name,
      'state': this.relays[index].state
    }
    this.epService.change(relay).subscribe(
      response => {
        response.toggled ? console.log('success') : this.relays[index].state = oldState;
      },
      err => {
        console.log(err);
        this.relays[index].state = false;
        console.log(this.relays[index])
      }
    );
  }

  updateUrl(index){
    if(this.cameras[index].errors == 1){
      this.cameras[index].ip = '../../assets/cameraError.png';
    } else {
      let ip = this.cameras[index].ip;

      let pIndex = ip.indexOf("://");
      let prefix = ip.substr(0, pIndex+3);

      ip = ip.slice(pIndex+3, ip.length);

      let atIndex = ip.indexOf("@");
      ip = ip.slice(atIndex+1, ip.length);
      ip = prefix+ip;
      ip = ip.replace(/\s/g, '');
      this.cameras[index].ip = ip;
      this.cameras[index].errors = 1;
    }
  }

  ngOnInit() {
    this.epService.list().subscribe(response => {
      this.relays = response;
      console.log(this.relays);
    });
    this.epService.listCameras().subscribe(response => {
      this.cameras = response;
      console.log(this.cameras);
    })
  }

}
