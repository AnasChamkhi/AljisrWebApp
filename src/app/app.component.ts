import { Component } from '@angular/core';
import { menu } from './declarations';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {
  NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aljisrwebapplication';
  itsHome = false;
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
    this._router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if( this._router.url == "/home" || this._router.url == "/"){
            this.isHome();
          }
          else{
            this.isHomeNt();
          }
          
        }
      }
    );
  }
  isHome(){
    this.itsHome=true;
  }
  isHomeNt(){
    this.itsHome=false;
  }
  ngOnInit() {
    $(window).on("load", function () {
      setTimeout(() => { $(".splash-wrapper").fadeOut("slow") },0);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }




  Menu: menu[] = [
    {
      title: {
        name: 'Aljisr',
        link: '#'
      },
      subtitle: [
        {
          name: 'Qui somme nous?',
          link: 'QuiSommeNous'
        },
        {
          name: 'Votre Vocation',
          link: '#'
        },
        {
          name: 'Notre Organisation',
          link: '#'
        },
      ]
    },
    {
      title: {
        name: 'Education',
        link: '#'
      },
      subtitle: [
        {
          name: 'Fromation fondamental',
          link: '#'
        },
        {
          name: 'Fonction-Renforcement',
          link: '#'
        },
        {
          name: 'Trouver une école',
          link: '#'
        },
      ]
    },
    {
      title: {
        name: 'Packes écoles',
        link: '#'
      },
      subtitle: [
        {
          name: 'Aj Pee',
          link: '#'
        },
        {
          name: 'Aj Per',
          link: '#'
        },
        {
          name: 'Aj Pef',
          link: '#'
        },
        {
          name: 'Aj Pcv',
          link: '#'
        },
        {
          name: 'Aj Pev',
          link: '#'
        },
        {
          name: 'Aj Pei',
          link: '#'
        },
        {
          name: 'Aj Par',
          link: '#'
        },
        {
          name: 'Aj Ps',
          link: '#'
        },
      ]
    },
    {
      title: {
        name: 'Formation-Insertion',
        link: '#'
      },
      subtitle: [
        {
          name: 'Formation Apprentissage',
          link: '#'
        },
        {
          name: 'Formation Diplomé',
          link: '#'
        },
        {
          name: 'Insertion En Entreprise',
          link: '#'
        },
        {
          name: 'Insertion En Société',
          link: '#'
        },

      ]
    },
    {
      title: {
        name: 'Activités',
        link: '#'
      },
      subtitle: [
        {
          name: 'Activités Scolaire',
          link: '#'
        },
        {
          name: 'Programmes Scolaire',
          link: '#'
        },
        {
          name: 'Activités Parascolaire',
          link: '#'
        },
        {
          name: 'Programmes Parascolaire',
          link: '#'
        }
      ]
    },
    {
      title: {
        name: 'Génération citoyenne',
        link: '#'
      },
      subtitle: [
        {
          name: 'Ecole Verte',
          link: '#'
        },
        {
          name: 'Revalorisation',
          link: '#'
        },
        {
          name: 'Patrimoine',
          link: '#'
        }
      ]
    },
    {
      title: {
        name: 'Archives',
        link: '#'
      },
      subtitle: [
        {
          name: 'Bibliothèque',
          link: '#'
        },
        {
          name: 'Photothèque',
          link: '#'
        },
        {
          name: 'Vidéothèque',
          link: '#'
        }
      ]
    },
    {
      title: {
        name: 'My Jisr',
        link: '#'
      },
      subtitle: [
      ]
    },
    {
      title: {
        name: 'Newsletter',
        link: '#'
      },
      subtitle: [
      ]
    },
    {
      title: {
        name: 'Médiasphère',
        link: '#'
      },
      subtitle: [
      ]
    },
    {
      title: {
        name: 'Agenda',
        link: '#'
      },
      subtitle: [
      ]
    },
    {
      title: {
        name: 'Contact',
        link: '#'
      },
      subtitle: [
      ]
    },
  ];

}
