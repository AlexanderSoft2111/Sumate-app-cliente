import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  
  @Input() titulo = '';
  @Input() carro = false;
  @Input() tienda = true;
  @Input() item = 0 ;
  constructor() { }

  ngOnInit() {}

}
