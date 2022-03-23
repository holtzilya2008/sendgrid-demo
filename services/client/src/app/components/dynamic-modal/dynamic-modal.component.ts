import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { Component, NgModule, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss'],
  animations: [
    trigger('modalAnim', [
      transition(':enter', [
        sequence([
          style({
            height: '1px',
            width: '10px'
          }),
          animate('1s', style({
            height: '500px'
          })),
          animate('1s', style({
            width: '700px'
          }))
        ])
      ])
    ])
  ]
})
export class DynamicModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


@NgModule({
  declarations: [DynamicModalComponent],
  imports: [BrowserAnimationsModule]
})
class PlanetComponentModule {}
