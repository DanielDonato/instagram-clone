import { Component, OnInit} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [ /* Nome da trigger que será conectada com o html */ 
      state('escondido', style({ /* Nome do estado e uma obj literal com atributos css que indicara a animação que ira ocorrer com o componente */
        opacity: 0
      })),
      state('visivel', style({ /* Nome do estado e uma obj literal com atributos css que indicara a animação que ira ocorrer com o componente */
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('2s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'visivel';

  public imagens: Imagem[] = [
    { estado: 'visivel' , url: '../../../assets/banner-acesso/img_1.png' },
    { estado: 'escondido' , url: '../../../assets/banner-acesso/img_2.png' },
    { estado: 'escondido' , url: '../../../assets/banner-acesso/img_3.png' },
    { estado: 'escondido' , url: '../../../assets/banner-acesso/img_4.png' },
    { estado: 'escondido' , url: '../../../assets/banner-acesso/5.png' }
  ];

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao(), 3000);
  }

  public logicaRotacao(): void{
    let idx: number;
    for (let i: number = 0; i < 5; i++) {
      if (this.imagens[i].estado === 'visivel') {
          this.imagens[i].estado = 'escondido';
          idx = i === 4 ? 0 : i + 1;
          break;
      }
    }
    this.imagens[idx].estado = 'visivel';
    setTimeout(() => this.logicaRotacao(), 3000);
  }

}
