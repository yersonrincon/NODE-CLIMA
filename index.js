

require('dotenv').config()
const { leerInput, inquirerMenu, pausa,listarLugares} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do{

        opt = await inquirerMenu();
        
        switch( opt ) {

            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad:');
                const lugares =await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                if( id==='0') continue;
                //guardar en base de datos
            
              const lugarSel = lugares.find(l => l.id === id);

             
              busquedas.agregarHistorial(lugarSel.nombre);
         //  const busquedaclima = await lugares;
    
              const climas = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
             // console.log(climas);
                //const termino = await leerInput('Ciudad: ');
                
                // Buscar los lugares
             //   const lugares = await busquedas.ciudad( termino );
                
                // Seleccionar el lugar
             //   const id = await listarLugares(lugares);
               // if ( id === '0' ) continue;


                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:',lugarSel.lat);
                console.log('Lng:',lugarSel.lng);
                console.log('Temperatura:',climas.temp);
                console.log('MInima:',climas.min);
                console.log('Maxima:',climas.max)
                console.log('Como esta el clima:',climas.desc);

            break;


            case 2:
                 busquedas.historialCapitalizado.forEach( (lugar, i) =>  {
                     const idx = `${ i + 1 }.`.green;
                     console.log( `${ idx } ${ lugar } ` );
                 })

            break;

        }



        if ( opt !== 0 ) await pausa();

    } while ( opt !== 0 )



}



main();