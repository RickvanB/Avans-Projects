import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tokencatcher',
  templateUrl: './tokencatcher.component.html',
  styleUrls: ['./tokencatcher.component.css']
})
export class TokencatcherComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute, private router: Router, private tokenService: TokenService) { 
  }

  ngOnInit() {
     this.route.params.subscribe(params => {
        this.tokenService.saveToken(params['token']);
        this.authService.checkToken();
        this.router.navigateByUrl('/');
     });
  }

}
