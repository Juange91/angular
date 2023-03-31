import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AgentService,statusAgent} from "../../services/agent/agent.service";
import { TurnsService, listTurn, finishTurn } from "../../services/turns/turns.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Se recibe el dato a modificar en la tabla turnos
  finish_turn_: finishTurn = {
    status_turn: ''
  }
  // Se recibe el dato a modificar en la tabla agentes
  editStatusAgent: statusAgent = {
    status_agent: ''
  }
  // Arreglo para mostrar los datos de los turnos
  list_turns: listTurn[];
  // variable para guardar el id del agente
  id_agent = 0;
  // variable para guardar el nombre del agente
  name_agent = '';
  // variable para guardar el apellido del agente
  last_name_agent = '';
  // variable para guardar el estado del agente
  status_agent = '';
  // variable para guardar el usuario del agente
  userAgent = '';
  
  constructor(private AgentService: AgentService, private ActivatedRoute: ActivatedRoute, private TurnsService: TurnsService) { }

  ngOnInit(): void {
    // Se recibe el usuario del agente como parametro por la url.
    this.userAgent = this.ActivatedRoute.snapshot.params.user;
    // Se hace una consulta a la base de datos con el usario del agente para obtener sus datos
    this.AgentService.viewAgent(this.userAgent).subscribe(
      res => {
        // Los datos recibidos se convierten en una cadena de texto
        let data_agent = JSON.stringify(res);
        // La cadena de texto se convierte en un objeto de javaScript
        let resultAgent = JSON.parse(data_agent);
        // Se guarda en la variable el id del agente
        this.id_agent = resultAgent[0].id_agent;
        // Se guarda en la variable el nombre del agente
        this.name_agent = resultAgent[0].name_agent;
        // Se guarda en la variable el apellido del agente
        this.last_name_agent = resultAgent[0].last_name_agent;
        // Se garda en la variable el estado del agente
        this.status_agent= resultAgent[0].status_agent;
        // Se reinicia la tabla de los turnos
        this.viewTurns();

      })
  }
// Se hace una consulta a la base de datos para obtener todos los turnos de un agente especifico
  viewTurns() {
    this.TurnsService.view_turns(this.id_agent).subscribe(
      res => {
        this.list_turns = <any>res;
      })
  };
// Se envia una peticion de tipo put para cambiar el estado del turno de activo a inactivo
  finishTurn(id) {
    this.finish_turn_.status_turn = 'Inactivo',
      this.TurnsService.finish_turn(id, this.finish_turn_).subscribe(
        res => {
          console.log('Turno finalizado');
          this.viewTurns();
        }
      )
  };
// Se envia una peticion de tipo put para cambiar el estado del agente de activo a inactivo
  statusAgent() {
    if (this.status_agent == 'Activo') {
      this.editStatusAgent.status_agent = 'Inactivo';
      this.AgentService.editStatus(this.id_agent, this.editStatusAgent).subscribe();
      this.status_agent = 'Inactivo';

    } else {
      this.editStatusAgent.status_agent = 'Activo';
      this.AgentService.editStatus(this.id_agent, this.editStatusAgent).subscribe();
      this.status_agent = 'Activo';
    }
  }
}
