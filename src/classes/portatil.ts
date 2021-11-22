import { Cliente } from './cliente'
export class Portatil {
  private _numSerie: string;
  protected _precioFabrica: number; // para acceder en la subclase
  private _velocidadCPU: number;
  private _cantidadRAM: number;
  private _capacidadHDD: number;
  private _instaladoSO: boolean;
  private _cliente: Array<Cliente>;
  constructor(
    numSerie: string, 
    precioFabrica: number, 
    velocidadCPU: number, 
    cantidadRAM: number, 
    capacidadHDD: number,
    instaladoSO: boolean
    ) {
    this._numSerie = numSerie;
    this._precioFabrica = precioFabrica;
    this._velocidadCPU = velocidadCPU;
    this._cantidadRAM = cantidadRAM;
    this._capacidadHDD = capacidadHDD;
    this._instaladoSO = instaladoSO;
    this._cliente = new Array<Cliente>();
  }

  get numSerie() {
    return this._numSerie;
  }
  get precioFabrica() {
    return this._precioFabrica;
  }
  get velocidadCPU() {
    return this._velocidadCPU;
  }
  get cantidadRAM() {
    return this._cantidadRAM;
  }
  get capacidadHDD() {
    return this._capacidadHDD;
  }
  get instaladoSO() {
    return this._instaladoSO;
  }
  get cliente() {
    return this._cliente;
  }
  set velocidadCPU(_velocidadCPU: number){
    /*
        Si la velocidad CPU no es la permitida
        salta una excepción con "throw" y su mensaje

    */
    if (this._velocidadCPU < 2){
        throw "\nVelocidad CPU insuficiente, debe ser al menos 2 GHz"
    }
    this._velocidadCPU = _velocidadCPU
}
set cantidadRAM(_cantidadRAM: number){
  /*
      Si la cantidad de memoria RAM no es la permitida
      salta una excepción con "throw" y su mensaje

  */
  if (this._cantidadRAM < 8){
      throw "\nCantidad de RAM pequeña, debe ser al menos 8 GB"
  }
  this._cantidadRAM = _cantidadRAM
}
set capacidadHDD(_capacidadHDD: number){
  /*
      Si la capacidad del disco duro no es la permitida
      salta una excepción con "throw" y su mensaje

  */
  if (this._capacidadHDD < 1){
      throw "\nCapacidad de Disco Duro escasa, debe ser al menos 1 TB"
  }
  this._capacidadHDD = _capacidadHDD
}
  precio(): number { //hay clientes que quieren el ordenador sin S.O, ofrecemos un descuento del 20%
    let precio: number;
    precio = this._precioFabrica;
    if (this._instaladoSO == false) {
      precio -= 0.2 * precio;
    }
    return precio;
  }
  public gananciaTotal(){ 
    let gananciaT: number = 0
    for (let cliente of this._cliente){
      gananciaT += cliente.calcularGanancia()
    }
    return gananciaT
  }
  public incluirPersona(cliente: Cliente) { 
    this._cliente.push(cliente);
  }
  public conseguirPersona(index: number) { //see whether it can be removed
    return this._cliente[index];
  }

  public conseguirPersonas() { 
    return this._cliente;  
  }
  completo() {
    return `\nNúmero de serie: ${this._numSerie}, 
    Precio base: ${this._precioFabrica}, 
    GHz de la CPU: ${this._velocidadCPU}, 
    Número de GB de la RAM: ${this._cantidadRAM},
    Capacidad en TB del HDD: ${this._capacidadHDD},
    ¿Instalado el S.O.?: ${this._instaladoSO}`;
  }
  abreviado() {
    return `\nNúmero de serie: ${this._numSerie}, `;
  }
  }
