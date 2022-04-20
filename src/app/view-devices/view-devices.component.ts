import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Device } from '../device';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-view-devices',
  templateUrl: './view-devices.component.html',
  styleUrls: ['./view-devices.component.css']
})
export class ViewDevicesComponent implements OnInit {
  devices$!: Observable<Device[]>;
  private searchTerms = new Subject<string>();

  constructor(public deviceService: DeviceService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.devices$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.deviceService.searchDevices(term)),
    );
  }

}
