import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Speedmeet } from '../models/speedmeet';
import { SpeedmeetService } from '../services/speedmeet.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  @ViewChild('slider', { read: ElementRef, static: false})slider: ElementRef;

  sliderOpts = {
    zoom: {
      maxRatio: 5
    }
  };

  logoPath;
  err: any;

  constructor(
    private speedmeetService: SpeedmeetService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.speedmeetService.getSpeedmeetMap().subscribe(map => {
      this.logoPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(map));
    },
    error => {
      this.err = error;
    });
  }

  zoom(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.in();
    } else {
      zoom.out();
    }
  }


}
