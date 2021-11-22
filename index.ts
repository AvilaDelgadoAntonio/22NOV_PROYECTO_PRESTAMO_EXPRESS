import { menu_AAD } from './src/auxiliar/menu'
import { leerTeclado } from './src/auxiliar/lecturaTeclado'
import { Portatil } from './src/classes/portatil';
import { Sobremesa } from './src/classes/sobremesa';
import { Maquinas, iPort, iPC, tPort2, iSubir } from './src/schemas/ordenador'
import { Humanos,iCliente, iCliente2, iClienteJuridico } from './src/schemas/cliente';
import { Cliente } from './src/classes/cliente';
import { Clientejuridico } from './src/classes/clientejuridico';
import { db } from './src/database/database'

const main = async () => {
    let n: number
    let local: string = "N"
    let numSerie: string, 
        precioFabrica: number, 
        velocidadCPU: number, 
        cantidadRAM: number,
        capacidadHDD: number,
        instaladoSO: boolean,
        cliente: Array<Cliente>, 
        tipoRefrig: string
    let numIdentidad: string, 
        nombre: string, 
        pagoPrestamo: number, 
        numseriePrestado: string, 
        fechaPrestado: Date
    let clientes: Array<Cliente> = new Array<Cliente>();
    let portatiles: Array<Portatil> = new Array<Portatil>();
    await setBD(true) // true BD local; false BD Atlas
    do {
        n = await menu_AAD()

        switch(n){
            case 0:                
            local = await leerTeclado('Ponga [S] para conectarse a BD Atlas (Nube)? (en caso [N], conexión a BD local)')
            if (local == 'S'){
                await setBD(false)
                console.log('\nCONECTADO a BD Atlas (NUBE)')
            }else{
                await setBD(true)
                console.log('\nCONECTADO a BD LOCAL')
            }
            break
            case 1:
                console.log(`\nEstá en opción 1, crear NUEVO ordenador`)
                let seleccionado: string | any;
                seleccionado =  await leerTeclado('\nTeclee 1 para PORTÁTIL o 2 para PC SOBREMESA')
                if (seleccionado == 1)
                {
                    console.log(`\nHa elegido crear un PORTÁTIL`)                
                    const nuevoPortatil = async (portatiles: Array<Portatil>) =>  { 
                    let laptop: Portatil;
		            const numSerie = await leerTeclado('\nIntroduzca NÚMERO de SERIE del ordenador')
                    const precioFabrica =  parseInt( await leerTeclado('Introduzca precio base'))
                    const velocidadCPU =  parseInt( await leerTeclado('Introduzca los GHz de la CPU'))
                    const cantidadRAM =  parseInt( await leerTeclado('Introduzca los GB de la RAM'))
                    const capacidadHDD =  parseInt( await leerTeclado('Introduzca los TB del tamaño del Disco Duro'))
                    const instaladoSO =  Boolean( await leerTeclado('¿Tiene Sistema Operativo instalado? (Sí [true], No [false])'))
                    const cliente =  Array<Cliente>()     
                    laptop = new Portatil (numSerie, precioFabrica, velocidadCPU, cantidadRAM, capacidadHDD, instaladoSO);
                    portatiles.push(laptop);
                
                            try {
                                    laptop.velocidadCPU = velocidadCPU
                                }catch(error){
                                    console.log(error)

                                }
                            try {
                                    laptop.cantidadRAM = cantidadRAM
                             }catch(error){
                                    console.log(error)
                                }
                                try {
                                    laptop.capacidadHDD = capacidadHDD
                             }catch(error){
                                    console.log(error)
                                }
                }
                await nuevoPortatil(portatiles)
                }            
                else{
                    console.log(`\nHa elegido crear un PC SOBREMESA`)      
                    const nuevoPC = async (portatiles: Array<Portatil>) =>  { 
                    let laptop: Portatil;
		            const numSerie = await leerTeclado('\nIntroduzca NÚMERO de SERIE del ordenador')
                    const precioFabrica =  parseInt( await leerTeclado('Introduzca precio base'))
                    const velocidadCPU =  parseInt( await leerTeclado('Introduzca los GHz de la CPU'))
                    const cantidadRAM =  parseInt( await leerTeclado('Introduzca los GB de la RAM'))
                    const capacidadHDD =  parseInt( await leerTeclado('Introduzca los TB del tamaño del Disco Duro'))
                    const instaladoSO =  Boolean( await leerTeclado('¿Tiene Sistema Operativo instalado? (Sí [true], No [false])'))
                    const cliente =  Array<Cliente>()   
                    const tipoRefrig =  await leerTeclado('Introduzca refrigeración [estándar] o [líquida]')           
                    laptop = new Sobremesa (numSerie, precioFabrica, velocidadCPU, cantidadRAM, capacidadHDD, instaladoSO, tipoRefrig);
                    portatiles.push(laptop); 
                            try {
                                    laptop.velocidadCPU = velocidadCPU
                            }catch(error){
                                    console.log(error)
                            }
                            try {
                                laptop.cantidadRAM = cantidadRAM
                         }catch(error){
                                console.log(error)
                            }
                            try {
                                laptop.capacidadHDD = capacidadHDD
                         }catch(error){
                                console.log(error)
                            }
                    }      
       
                await nuevoPC(portatiles)
                }
                const mostrar = async (portatiles: Array<Portatil>) => {
                    for (let a of portatiles) {                        
                       console.log(`${a.completo()}`);
                    }
                  
                }
            
                mostrar(portatiles)       

                 break
              
            case 2:
                console.log("\nHA ENTRADO EN OPCIÓN 2, CREAR un nuevo CLIENTE")
                let elegido: string | any;
                elegido =  await leerTeclado('\nTeclee 1 para persona FÍSICA o 2 para persona JURÍDICA')
                if (elegido == 1)
                {
                    console.log(`\nHa elegido crear una persona FÍSICA`)
                    const nuevapersonaFisica = async (person: Array<Cliente>) =>  { 
                    let humano: Cliente;
                    const numIdentidad = await leerTeclado('\nIntroduzca DOCUMENTO de IDENTIDAD del cliente')
                    const nombre =  await leerTeclado('Introduzca NOMBRE del cliente')
                    const pagoPrestamo =  parseInt( await leerTeclado('Introduzca IMPORTE pagado por el préstamo del ordenador'))
                    const numseriePrestado =  await leerTeclado('Introduzca NÚMERO de SERIE asignado al ordenador prestado')
                    const fechaRaw =  await leerTeclado('Introduzca la FECHA del préstamos del ordenador (formato: AAAA-MM-DD)')
                    const fechaPrestado = new Date(fechaRaw) //conversión formato fecha
                    humano = new Cliente (numIdentidad, nombre, pagoPrestamo, numseriePrestado, fechaPrestado);
                    clientes.push(humano);
                    
                            try {
                                    humano.pagoPrestamo = pagoPrestamo
                            }catch(error){
                                    console.log(error)
                                    humano = new Cliente("","", 0, "", "");
                                }
                            }
                await nuevapersonaFisica(clientes)
                }               
                
                else{
                    console.log(`\nHa elegido crear una persona JURÍDICA`)
                    const nuevapersonaJuridica = async (person: Array<Cliente>) =>  { 
                    let humano: Cliente;
                    const numIdentidad = await leerTeclado('\nIntroduzca DOCUMENTO de IDENTIDAD del cliente')
                    const nombre =  await leerTeclado('Introduzca NOMBRE del cliente')
                    const pagoPrestamo =  parseInt( await leerTeclado('Introduzca IMPORTE pagado por el préstamo del ordenador'))
                    const numseriePrestado =  await leerTeclado('Introduzca NÚMERO de SERIE asignado al ordenador prestado')
                    const fechaRaw =  await leerTeclado('Introduzca la FECHA del préstamos del ordenador (formato: AAAA-MM-DD)')
                    const fechaPrestado = new Date(fechaRaw) //conversión formato fecha
                    const personalidadLegal =  await leerTeclado('Introduzca el tipo de SOCIEDAD')   
                    humano = new Clientejuridico (numIdentidad, nombre, pagoPrestamo, numseriePrestado, fechaPrestado, personalidadLegal);        
                    clientes.push(humano); 
                    
                    
                            try {
                                    humano.pagoPrestamo = pagoPrestamo
                            }catch(error){
                                    console.log(error)
                                    humano = new Clientejuridico("","", 0, "", "", "");
                                        }
                            }
                await nuevapersonaJuridica(clientes)
            }
        
                const enseñar = async (clientes: Array<Cliente>) => {
                    for (let a of clientes) {
                        
                       console.log(`${a.todo()}`);
                    }
                  
                }            
                enseñar(clientes)       

                break
            case 3:
                console.log("\nHA ENTRADO EN OPCIÓN 3, GUARDAR lo creado en BD")
                console.log("\n¡¡DOCUMENTO GUARDADO CON ÉXITO EN BD!!")
                let grabarBD = async () => {

                    // Ordenador schema
                    let aSchema: any
                    let dSchemaPort: iPort =
                    {
                      _numSerie: null,
                      _tipoOrdenador: null,
                      _precioFabrica: null,
                      _velocidadCPU: null,
                      _cantidadRAM: null,
                      _capacidadHDD: null,
                      _instaladoSO: null,
                      _cliente: null,
                    }
                    let dSchemaPC: iPC =
                    {
                        _numSerie: null,
                        _tipoOrdenador: null,
                        _precioFabrica: null,
                        _velocidadCPU: null,
                        _cantidadRAM: null,
                        _capacidadHDD: null,
                        _instaladoSO: null,
                        _tipoRefrig: null,
                        _cliente: null,
                    }
                      // Cliente schema
                    let pSchema: any
                    let dSchemaPerFi: iCliente =
                    {
                        _numIdentidad: null,
                        _tipoCliente: null,
                        _nombre: null,
                        _pagoPrestamo: null,
                        _numseriePrestado: null,
                        _fechaPrestado: null
                    }
                    let dSchemaPerJur: iClienteJuridico =
                    {
                        _numIdentidad: null,
                        _tipoCliente: null,
                        _nombre: null,
                        _pagoPrestamo: null,
                        _numseriePrestado: null,
                        _fechaPrestado: null,
                        _personalidadLegal: null,
                    }
                    await db.conectarBD()
                    for (let a of portatiles) {
                      // valores comunes ->
                      dSchemaPort._numSerie = dSchemaPC._numSerie = a.numSerie
                      dSchemaPort._precioFabrica = dSchemaPC._precioFabrica = a.precioFabrica
                      dSchemaPort._velocidadCPU = dSchemaPC._velocidadCPU = a.velocidadCPU                      
                      dSchemaPort._cantidadRAM = dSchemaPC._cantidadRAM = a.cantidadRAM
                      dSchemaPort._capacidadHDD = dSchemaPC._capacidadHDD = a.capacidadHDD
                      dSchemaPort._instaladoSO = dSchemaPC._instaladoSO = a.instaladoSO
                      // Valores propios
                      // Hay que preguntar primero por las subclases
                      if (a instanceof Sobremesa) {
                        dSchemaPC._tipoOrdenador = "PC"
                        dSchemaPC._tipoRefrig = a.tipoRefrig
                        aSchema = new Maquinas(dSchemaPC)
                      } else if (a instanceof Portatil) {
                        dSchemaPort._tipoOrdenador = "PORT"
                        aSchema = new Maquinas(dSchemaPort)
                      }
                      await aSchema.save()
                    }   
                    for (let p of clientes) {
                        // valores comunes
                        dSchemaPerFi._numIdentidad =  dSchemaPerJur._numIdentidad = p.numIdentidad
                        dSchemaPerFi._nombre = dSchemaPerJur._nombre = p.nombre
                        dSchemaPerFi._pagoPrestamo = dSchemaPerJur._pagoPrestamo = p.pagoPrestamo
                        dSchemaPerFi._numseriePrestado = dSchemaPerJur._numseriePrestado = p.numseriePrestado
                        dSchemaPerFi._fechaPrestado = dSchemaPerJur._fechaPrestado = p.fechaPrestado
                        // Valores propios
                        // Hay que preguntar primero por las subclases
                        if (p instanceof Clientejuridico) {
                          dSchemaPerJur._tipoCliente = "EMP"
                          dSchemaPerJur._personalidadLegal = p.personalidadLegal
                          pSchema = new Humanos(dSchemaPerJur)
                        } else if (p instanceof Cliente) {
                          dSchemaPerFi._tipoCliente = "PER"
                          pSchema = new Humanos(dSchemaPerFi)
                        }
                        await pSchema.save()
                    }             
                    await db.desconectarBD()
                }         
                grabarBD()
                break
            case 4:
                console.log("\nHA ENTRADO EN OPCIÓN 4, RECUPERAR (a memoria) documentos de la BD")
                await db.conectarBD()
                let deseado: string | any;
                deseado =  await leerTeclado('\nTeclee 1 para recuperar ORDENADOR o 2 para recuperar CLIENTE')
                if (deseado == 1)
                {
                    console.log(`\nHa elegido recuperar ORDENADOR`)
                    let tmpPort: Portatil | any
                    numSerie = await leerTeclado('\nIntroduzca el NÚMERO de SERIE del ordenador')
                    let query: any = await Maquinas.findOne( //usamos findOne, ya que el número de serie es único
                    { _numSerie: numSerie })                            
                    .then((doc: any) => {
                        console.log('\nCargando....') 
                    if (doc == null) console.log('\nNo existe')
                    else {
                        console.log('\nExiste: '+ doc)
                        tmpPort = 
                            new Portatil(
                                numSerie, 
                                precioFabrica, 
                                velocidadCPU, 
                                cantidadRAM, 
                                capacidadHDD, 
                                instaladoSO)
                    }
                })
                }else{
                console.log(`\nHa elegido recuperar CLIENTES para ordenador concreto`)
                let tmpCliente: Cliente | any
                numseriePrestado  = await leerTeclado('\nIntroduzca NÚMERO de SERIE del ordenador cuyos clientes desea saber')
                let query: any = await Humanos.find( //usamos find (y no findOne) porque las colecciones están unidas 1N
                    { _numseriePrestado: numseriePrestado })                            
                .then((doc: any) => {
                    console.log('\nCargando...') 
                    if (doc == null) console.log('\nNo existe')
                    else {
                        console.log('\nExiste: '+ doc)
                        tmpCliente = 
                            new Cliente (numIdentidad, nombre, pagoPrestamo, numseriePrestado, fechaPrestado)                           
                    }
                })    
                .catch( (err: any) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje    
                await db.desconectarBD()
                }
                break
            case 5:
                console.log("\nHA ENTRADO EN OPCIÓN 5, ASIGNACIÓN DE UN ORDENADOR A CLIENTE(S)")
                    let dOrdenador: tPort2
                    let tmpPort: Portatil = new Portatil("", 0, 0, 0, 0, true)
                    let tmpPersonal: Cliente
                    await db.conectarBD()
                    numSerie  = await leerTeclado('\nIntroduzca NÚMERO de SERIE del ordenador para asignar a cliente')
                    let query4: any =  await Maquinas.findOne( {_numSerie: numSerie} )
                    dOrdenador = query4                  
                    // Creamos el objeto para el ordenador                  
                    if (dOrdenador._tipoOrdenador == "PORT"){
                      tmpPort = new Portatil(
                                                dOrdenador._numSerie, 
                                                dOrdenador._precioFabrica,
                                                dOrdenador._velocidadCPU,
                                                dOrdenador._cantidadRAM, 
                                                dOrdenador._capacidadHDD, 
                                                dOrdenador._instaladoSO, 
                                                )
                    }else{
                      tmpPort = new Sobremesa(
                                                dOrdenador._numSerie, 
                                                dOrdenador._precioFabrica,
                                                dOrdenador._velocidadCPU, 
                                                dOrdenador._cantidadRAM, 
                                                dOrdenador._capacidadHDD,
                                                dOrdenador._instaladoSO,
                                                dOrdenador._tipoRefrig
                                                )
                    }
                  
                    // Leemos los clientes concretos, montamos los objetos correspondientes al número de serie
                    // y asignamos los clientes al ordenador                    
                    
                    let v = await leerTeclado('\nCantidad de clientes que quiere asignar a un ordenador')
                    let registro: number = parseInt(v);
                    for(let i = 0; i < registro; i ++){ 
                        numIdentidad  = await leerTeclado('\nIntroduzca DNI/CIF del cliente para asignar a dicha número serie del ordenador')  
                        let query3: any = await Humanos.findOne( {_numIdentidad: numIdentidad} )                        
                        if (query3._tipoCliente == "PER"){
                            tmpPersonal = new Cliente(query3._numIdentidad,query3._nombre, query3._pagoPrestamo, 
                                dOrdenador._numSerie, query3._fechaPrestado)  
                        }else {
                            tmpPersonal = new Clientejuridico(query3._numIdentidad,query3._nombre, query3._pagoPrestamo, 
                                dOrdenador._numSerie, query3._idioma, query3._fechaPrestado)
                        }
                      
                        tmpPort.incluirPersona(tmpPersonal)          }
  
                   // Una vez montado el objeto ordenador con sus clientes hacemos persistenes los cambios en la BD.
                  
                    let personales2 = tmpPort.conseguirPersonas()
                    for (let personal of personales2){                  
                        await Humanos.findOneAndUpdate( 
                          { _numIdentidad: personal.numIdentidad }, 
                          {
                              _numseriePrestado: personal.numseriePrestado,
                          },
                          {
                              runValidators: true // para que se ejecuten las validaciones del Schema
                          }  
                      )                
                      .then(() => console.log('Modificado Correctamente') )
                      .catch( (err: any) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje
                    }
                    await db.desconectarBD() 
                    console.log("\nEL CAMBIO DE ASIGNACIÓN DE ORDENADOR SE HA REALIZADO CON ÉXITO")

                break
            case 6:
                console.log("\nHA ENTRADO EN OPCIÓN 6, CALCULO DEL PRECIO FINAL DE TODOS LOS ORDENADORES EN INVENTARIO ")
                let precioFinal = async () => {
                    await db.conectarBD()
                    let tmpPort: Portatil | any
                    let dOrdenador: iSubir
                    let query: any = await Maquinas.find({})
                    for (dOrdenador of query) {
                      if (dOrdenador._tipoOrdenador == "PC") {
                        tmpPort = new Sobremesa(
                                                dOrdenador._numSerie, 
                                                dOrdenador._precioFabrica, 
                                                dOrdenador._velocidadCPU, 
                                                dOrdenador._cantidadRAM, 
                                                dOrdenador._capacidadHDD, 
                                                dOrdenador._instaladoSO, 
                                                dOrdenador._tipoRefrig
                                                )
                      } else if (dOrdenador._tipoOrdenador == "PORT") {
                        tmpPort = new Portatil(
                                                dOrdenador._numSerie, 
                                                dOrdenador._precioFabrica, 
                                                dOrdenador._velocidadCPU,
                                                dOrdenador._cantidadRAM,
                                                dOrdenador._capacidadHDD,
                                                dOrdenador._instaladoSO,
                                                )
                      }
                      console.log(`\n${tmpPort.completo()} precio final:${tmpPort.precio()}`)
                    }
                    await db.desconectarBD()
                  }
                  await precioFinal()
                break
            case 7:
                console.log("\nHA ENTRADO EN OPCIÓN 7, LISTA DE TODOS LOS CLIENTES")
                let customers = async () => {
                    await db.conectarBD()
                    let tmpCliente: Cliente | any
                    let dPer: iCliente2
                    let query: any = await Humanos.find({})
                    for (dPer of query) {
                      if (dPer._tipoCliente == "EMP") {
                        tmpCliente = new Clientejuridico(
                            dPer._numIdentidad, 
                            dPer._nombre, 
                            dPer._pagoPrestamo, 
                            dPer._numseriePrestado,
                            dPer._fechaPrestado, 
                            dPer._personalidadLegal
                            )
                      } else if (dPer._tipoCliente == "PER") {
                        tmpCliente = new Cliente(
                            dPer._numIdentidad, 
                            dPer._nombre, 
                            dPer._pagoPrestamo, 
                            dPer._numseriePrestado, 
                            dPer._fechaPrestado 
                            )
                      }
                      console.log(`\n${tmpCliente.todo()}`)
                    }
                    await db.desconectarBD()
                  }
                  await customers()
                break
            case 8:
                console.log("\nHA ENTRADO EN OPCIÓN 8, BORRAR datos")
                let decidido: string | any;
                decidido =  await leerTeclado('\nTeclee 1 para borrar CLIENTES o 2 para borrar ORDENADORES')
                if (decidido == 1)
                {
                    console.log(`\nHa elegido BORRAR un CLIENTE`)
		            await db.conectarBD()
                    let tmpPers2: Cliente | any
                    numIdentidad  = await leerTeclado('\nIntroduzca DNI/CIF del CLIENTE que desea borrar')
                    let query2: any = await Humanos.findOneAndDelete( 
                        { _numIdentidad: numIdentidad }) 
                           
                    .then((doc: any) => {
                    console.log('\nLa operación de BORRADO se realizó correctamente') 
                    if (doc == null) console.log('\nNo existe')
                    else{
                        console.log('\nBORRADA toda la información de abajo: '+ doc)
                        tmpPers2 = 
                            new Cliente (numIdentidad, nombre, pagoPrestamo, numseriePrestado, fechaPrestado)
                    }
                })
                .catch( (err: any) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje
                await db.desconectarBD()
                }else{
                    console.log(`\nHa elegido BORRAR un ORDENADOR`)
		            await db.conectarBD()
                    let tmpAuto2: Portatil | any
                    numSerie  = await leerTeclado('\nIntroduzca número de serie del ORDENADOR que desea borrar')
                    let query2: any = await Maquinas.findOneAndDelete( 
                        { _numSerie: numSerie })                            
                .then((doc: any) => {
                    console.log('\nLa operación de BORRADO se realizó correctamente') 
                    if (doc == null) console.log('\nNo existe')
                    else {
                        console.log('\nBORRADA toda la información de abajo: '+ doc)
                        tmpAuto2 = 
                            new Portatil(
                                            numSerie, 
                                            precioFabrica, 
                                            velocidadCPU,
                                            cantidadRAM,
                                            capacidadHDD,
                                            instaladoSO
                                            )
                    }
                })
                .catch( (err: any) => console.log('Error: '+err)) // concatenando con cadena muestra mensaje
                await db.desconectarBD()
            	}
                break
            case 9:
                console.log("\nHA ENTRADO EN OPCIÓN 9, CALCULAR SUMA DE TODAS LAS GANANCIAS ASOCIADAS A CADA ORDENADOR")
                  let gananciaOrdenador = async () => {
                    await db.conectarBD()
                    let dOrdenador: tPort2
                    let tmpOrdenadores: Portatil = new Portatil("", 0, 0, 0, 0, true)
                    let tmpPersona: Cliente
                    let query: any =  await Maquinas.find( {} )
                    let gananciaTotal: number                   
                    for (dOrdenador of query){
                        gananciaTotal = 0                  
                      if (dOrdenador._tipoOrdenador == "PORT"){                 
                        tmpOrdenadores = new Portatil(
                            dOrdenador._numSerie, 
                            dOrdenador._precioFabrica, 
                            dOrdenador._velocidadCPU,
                            dOrdenador._cantidadRAM,
                            dOrdenador._capacidadHDD,
                            dOrdenador._instaladoSO,
                            )
                        }else {
                            tmpOrdenadores = new Sobremesa(
                            dOrdenador._numSerie, 
                            dOrdenador._precioFabrica, 
                            dOrdenador._velocidadCPU,
                            dOrdenador._cantidadRAM,
                            dOrdenador._capacidadHDD,
                            dOrdenador._instaladoSO,
                            dOrdenador._tipoRefrig)     
                          }
                  
                        let query2: any = await Humanos.find( {_numseriePrestado: dOrdenador._numSerie} )
                  
                        for (let dPersona of query2){
                  
                          if (dPersona._tipoCliente == "PER"){
                                tmpPersona = new Cliente(
                                dPersona._numIdentidad, 
                                dPersona._nombre,  
                                dPersona._pagoPrestamo, 
                                dPersona._numseriePrestado, 
                                dPersona._fechaPrestado
                                )  
                          }else {
                            tmpPersona = new Clientejuridico(
                                dPersona._numIdentidad, 
                                dPersona._nombre,  
                                dPersona._pagoPrestamo, 
                                dPersona._numseriePrestado, 
                                dPersona._idioma, 
                                dPersona._fechaPrestado) 
                          }
                            gananciaTotal += tmpPersona.calcularGanancia()
                            tmpOrdenadores.incluirPersona(tmpPersona)                      }
                      // Estamos pidiendo el valor al método de la clase. NO se calcula fuera de la clase
                      //Aquí se usan 2 métodos (de dentro de la clase) a la vez
                            console.log(tmpOrdenadores.abreviado()+'GANANCIA total gracias a este ORDENADOR: '+tmpOrdenadores.gananciaTotal())
                    } 
    
                    await db.desconectarBD()                
                  }
                  
                  await gananciaOrdenador()                         
                break
            case 10:
                console.log("\nHA ENTRADO EN OPCIÓN 10, Calcular la GANANCIA TOTAL de la flota de ordenadores (desde fecha dada)")
  
                  let gananciaFecha = async () => {
                    const anualidad_raw =  await leerTeclado('\nFecha desde la que se calculan GANACIAS totales (formato: AAAA-MM-DD)')
                    const anualidad = new Date(anualidad_raw).toISOString() //conversión formato fecha
                    await db.conectarBD()
                    let dOrdenador: tPort2
                    let tmpOrdenadores: Portatil = new Portatil("", 0, 0, 0, 0, true)
                    let tmpPersona: Cliente
                    let query: any =  await Maquinas.find( {} )
                    let gananciaTotal
                   
                    for (dOrdenador of query){
                      gananciaTotal = 0
                  
                      if (dOrdenador._tipoOrdenador == "PORT"){
                  
                        tmpOrdenadores = new Portatil(
                            dOrdenador._numSerie, 
                            dOrdenador._precioFabrica, 
                            dOrdenador._velocidadCPU,
                            dOrdenador._cantidadRAM,
                            dOrdenador._capacidadHDD,
                            dOrdenador._instaladoSO
                            )
                        }else {
                            tmpOrdenadores = new Sobremesa(
                            dOrdenador._numSerie, 
                            dOrdenador._precioFabrica, 
                            dOrdenador._velocidadCPU,
                            dOrdenador._cantidadRAM,
                            dOrdenador._capacidadHDD,
                            dOrdenador._instaladoSO,
                            dOrdenador._tipoRefrig
                            )     
                          }
                        let fechaPrestado = anualidad
                        let query2: any = await Humanos.find( {_fechaPrestado: {$gte: fechaPrestado}} )
                        for (let dPersona of query2){                
                          if (dPersona._tipoCliente == "PER"){
                            tmpPersona = new Cliente(
                                dPersona._numIdentidad, 
                                dPersona._nombre,  
                                dPersona._pagoPrestamo, 
                                dPersona._numseriePrestado, 
                                dPersona._fechaPrestado
                                )  
                          }else {
                            tmpPersona = new Clientejuridico(
                                dPersona._numIdentidad, 
                                dPersona._nombre,  
                                dPersona._pagoPrestamo, 
                                dPersona._numseriePrestado, 
                                dPersona._fechaPrestado,
                                dPersona._personalidadLegal
                                ) 
                          }
                  
                            gananciaTotal += tmpPersona.calcularGanancia()
                          tmpOrdenadores.incluirPersona(tmpPersona)
                      }
                      
                    } 
                    //Aquí se usan 2 métodos (de dentro de la clase) a la vez
                    console.log('\nGANANCIA total sumando pagos de todos los clientes (desde la fecha indicada): '+tmpOrdenadores.gananciaTotal()) 
                    await db.desconectarBD()                
                  }
                  
                  await gananciaFecha()                                                        
                break

            case 100:
                console.log('\n--HA SALIDO CON ÉXITO, ADIÓS--')
                break
            default:
                console.log("\nLO SENTIMOS, OPCIÓN INCORRECTA")
                break
        }
    }while (n != 100)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'empresa'

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'empresa'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =          
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.a5pu9.mongodb.net/${bdAtlas}?retryWrites=true&w=majority` 
        db.cadenaConexion = conexionAtlas
    }
}

main()