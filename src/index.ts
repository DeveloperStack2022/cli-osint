import inquirer from "inquirer";
import {LugarElectoral} from "./models/lugar-electoral.js";
import {FGE} from './models/FGE.js'
import chalk from "chalk";

async function promptUser():Promise<void> {
    console.clear();
    const datos = await inquirer.prompt([
        {
            name: 'numero_cedula',
            message: 'Ingrese numero cedula:'
        },
        {
            name: 'fecha_nacimiento',
            message: 'Ingrese fecha nacimiento: (DD/MM/AAAA)',
        }
    ])
    
    // const consulta = new RealizadoConsulta()
    const remover_signos =  /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
    const expresionRegular = />(.*?)</g;
    
    const fecha_nacimiento = datos.fecha_nacimiento.replace(remover_signos,'')
    const consulta = new LugarElectoral(0,datos.numero_cedula,fecha_nacimiento)
    const respuesta = await consulta.makeQuery()
    

    const coincidencias_cne = [];
    let match_cne;

    while((match_cne = expresionRegular.exec(respuesta?.datosCiudadano)) != null) {
        coincidencias_cne.push(match_cne[1])
    }

    

    // FGE
    const fge_query = new FGE(datos.numero_cedula)
    const response_fge:string = await fge_query.makeQuery()

    const coincidencias = [];
    let match;
    while((match = expresionRegular.exec(response_fge)) != null ){
        coincidencias.push(match[1])
    }

    
    console.log(chalk.greenBright('CNE - CONSEJO NACIONAL ELECTORAL'))
    console.log(`${chalk.blueBright(coincidencias_cne[1].split(':')[0])}: ${coincidencias_cne[1].split(':')[1]}`)
    console.log(`${chalk.blueBright(coincidencias_cne[2].split(':')[0])}: ${coincidencias_cne[2].split(':')[1]}`)
    console.log(`${chalk.blueBright(coincidencias_cne[3].split(':')[0])}: ${coincidencias_cne[3].split(':')[1]}`)
   
    console.log(chalk.greenBright('FGE - FISCALIA GENERAL DEL ESTADO'))
    console.log(`${chalk.blueBright('LUGAR:')} ${coincidencias[6]}`)
    console.log(`${chalk.blueBright('FECHA:')} ${coincidencias[8]}`)
    console.log(`${chalk.blueBright('DENUCIANTE:')} ${coincidencias[28]} ${chalk.blueBright('NUMERO CL:')} ${coincidencias[27]}`)
    console.log(`${chalk.blueBright('SOSPECHOSO:')} ${coincidencias[31]} ${chalk.blueBright('NUMERO CL:')} ${coincidencias[30]}`)
    console.log(`${chalk.blueBright('VICTIMA:')} ${coincidencias[34]} ${chalk.blueBright('NUMERO CL:')} ${coincidencias[33]}`)
    console.log(``)
}
promptUser()