import { Component } from '@angular/core';
import { RotasService } from './services/rotas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cbiost-front';

  constructor(private services: RotasService) {

  }

}




