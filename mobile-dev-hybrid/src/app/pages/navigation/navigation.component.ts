import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  navigate : any;
  ngOnInit() 
  {
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/",
        icon  : "home"
      },
      {
        title : "All Pokemons",
        url   : "/pokemons",
        icon  : "list"
      },
      {
        title : "My Pokemons",
        url   : "/pokemons/my/catches",
        icon  : "book"
      },
      {
        title : "Catch Them All",
        url   : "/catch",
        icon  : "color-wand"
      },
      {
        title : "Administrator",
        url   : "/admin",
        icon  : "warning"
      },
    ]
  }
}
