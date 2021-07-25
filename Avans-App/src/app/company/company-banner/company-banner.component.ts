import {Component, Input, OnInit} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-company-banner',
  templateUrl: './company-banner.component.html',
  styleUrls: ['./company-banner.component.scss'],
})
export class CompanyBannerComponent implements OnInit {

  @Input()
  companyId: number;

  bannerPath: any;

  constructor(
      private companyService: CompanyService,
      private sanitizer: DomSanitizer
  ) {
    this.bannerPath = 'assets/default_banner.png';
  }

  ngOnInit() {
    this.companyService.getBanner(this.companyId).subscribe(banner => {
      this.bannerPath = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(banner));
    });
  }
}
