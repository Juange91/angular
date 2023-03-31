import { Component, OnInit } from '@angular/core';
import { TurnsService, turn, listAllTurn} from "../../services/turns/turns.service";
import { AgentService, agent } from "../../services/agent/agent.service";

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit {
  listAllTurns: listAllTurn[];
  // Arreglo donde se guarda los datos extraidos de la base de datos en este caso es de turnos
  listTurns: turn[];
   // Arreglo donde se guarda los datos extraidos de la base de datos en este caso son los agentes
  listAgents: agent[];
   // Arreglo donde se guarda todos los id de los agentes
  listId = [];
  // Variable donde se guarda la cantidad de turnos
  lengthTurns = 0;
  // Variable donde se guarda la cantidad de agentes
  lengthAgents = 0;
  constructor(private TurnsService: TurnsService, private AgentService: AgentService) { }

  ngOnInit(): void {
    // Se realiza el llamado de la funcion 
    this.allTurns();
    this.listAllTurns_();
  }
  // Se raliza una consulta donde a la base de datos donde se obtinen todos los turnos 
  allTurns() {
    this.TurnsService.viewAllTurns().subscribe(
      res => {

        // Los datos recibidos se convierten en una cadena de texto
        let data_turn = JSON.stringify(res);
        // La cadena de texto se convierte en un objeto de javaScript
        this.listTurns = JSON.parse(data_turn);
        // Se obtiene la cantidad de turnos que se encuentran en base de datos
        this.lengthTurns = this.listTurns.length
        // Se realiza el llamado de la funcion 
        this.allAgents();
       
      });
  }
  // Se raliza una consulta donde a la base de datos donde se obtinen todos los agentes disponibles
  allAgents() {
    this.AgentService.viewAllAgents().subscribe(
      res => {
        //Se guardan en un arreglo los datos de los agentes que fueron obtenido 
        this.listAgents = <any>res;
        //Se saca la cantidad de agentes que se encuentren disponibles
        this.lengthAgents = this.listAgents.length
        // En este bucle extraemos la cantidad de turnos qu teiene cada agente 
        for (let index = 0; index < this.lengthTurns; index++) {
          // Se consiguen todos los id de las agentes para usarlos en la consulta
          this.listId[index] = this.listAgents[index].id_agent;
          // Se realiza una consulta para obtener los turnos de cada agente
          this.TurnsService.turnByAgent(this.listId[index]).subscribe(
            res => {
              // Los datos recibidos se convierten en una cadena de texto
              let data_agent = JSON.stringify(res);
              // La cadena de texto se convierte en un objeto de javaScript
              this.listTurns = JSON.parse(data_agent);
              // Se guarda en el arreglo en la prodiedas cantidad de turnos de cada agente
              this.listAgents[index].lengthTurns = this.listTurns.length;

            }
          )
        }
      });
  }

  listAllTurns_() {
    this.TurnsService.viewAllTurns().subscribe(
      res => {
this.listAllTurns = <any>res;

      }

    )
  }
}
