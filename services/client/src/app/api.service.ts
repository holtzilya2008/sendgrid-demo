import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint = 'http://localhost:8000/';

  constructor(private http: HttpClient) { }

  getAvailableDeviceNames(): Observable<string[]> {
    const url = this.endpoint + 'getAvailableDeviceNames';
    return this.http.get<string[]>(url);
  }

  getRegisteredDevices(): Observable<RegisteredDevicesResponse[]> {
    const url = this.endpoint + 'getRegisteredDevices';
    return this.http.get<RegisteredDevicesResponse[]>(url);
  }

  registerDevice(deviceName: string): Observable<void> {
    const url = this.endpoint + 'register';
    return this.http.post(url, { deviceName } ) as any;
  }

}
export interface RegisteredDevicesResponse{
    _id: string;
    deviceName: string;
    deviceDescription: string;
}