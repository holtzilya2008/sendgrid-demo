import { Component, OnInit } from '@angular/core';
import { ApiService, RegisteredDevicesResponse } from './api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  availableDevices: string[];
  deviceToRegister: string;
  serverMessage: string = '';
  registerDevices:RegisteredDevicesResponse[]=[];

  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.getAvailableDeviceNames();
    this.getRegisterDevices();
  }

  private getAvailableDeviceNames(){
    this.api.getAvailableDeviceNames().subscribe((devices) => {
      this.availableDevices = devices;
    });
  }

  private getRegisterDevices(){
    this.api.getRegisteredDevices().subscribe((devices) => {
      this.registerDevices = devices;
    });
  }

  onRegister(): void {
    this.api.registerDevice(this.deviceToRegister).subscribe(() => {
      this.serverMessage = `Device ${this.deviceToRegister} is registered!`;
      this.deviceToRegister = null;
      this.getAvailableDeviceNames();
      this.getRegisterDevices();
    });
  }

}
