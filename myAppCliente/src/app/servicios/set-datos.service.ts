import { Cliente } from './../models/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetDatosService {
  
  cliente: Cliente;
  item: number;

  constructor() {
    this.limpiarCliente();
   }

   setItem(item: number){
    this.item = item;
    console.log('este es el item',item);
  }
 
  getItem(){
    if(this.item !==null){
      console.log('getitem',this.item);
      return this.item
    }
  }


  setCliente(editCliente: Cliente){
    this.cliente = editCliente;
    console.log("este es el cliente",this.cliente);
  }


  getCliente(){
    console.log("getclientes", this.cliente);
    return this.cliente;
  }

  limpiarCliente(){
    this.cliente = {
      id: '',
      codigo: '',
      cedula: '',
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
      latitud: null,
      longitud: null,
      telefono: '',
      FechaCreacion: new Date(),
      rol: 'Cliente',
      imagenBig: '',
      imagenSmall: '',
      emailRegistro: '',
      contrasena: '',
      tipoCliente: 'Mayorista',
      estado: 'activo',
    };
  }
}
