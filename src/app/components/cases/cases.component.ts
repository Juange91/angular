import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2'
import { UserService } from "../../services/user/user.service";
import { AgentService } from "../../services/agent/agent.service";
import { TurnsService, turn } from "../../services/turns/turns.service";

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  // Variable nombre de usuario
  name_user = '';
  // Variable apellido de usuario
  last_name_user = '';
  // Variable longitud turnos
  lengthTurns = 0;
  // Objeto donde se guardan los datos generados para el turno
  addTurn: turn = {
    name_turn: '',
    status_turn: '',
    module_turn: '',
    case_turn: '',
    id_user_fk: '',
    id_agent_fk: ''
  }
  constructor(private ActivatedRoute: ActivatedRoute, private UserService: UserService, private AgentService: AgentService,
    private TurnsService: TurnsService, private route:Router) { }

  ngOnInit(): void {
    // Se recibe el documento del usuario como parametro por la url. 
    const document = this.ActivatedRoute.snapshot.params.document;
    // Se recibe el tipo de documento del usuario como parametro por la url. 
    const typeDocument = this.ActivatedRoute.snapshot.params.typeDocument;
    // Se reciben los datos del usuario
    this.UserService.verifyUser(document, typeDocument).subscribe(
      res => {
        // Los datos recibidos se convierten en una cadena de texto
        let data_user = JSON.stringify(res);
        // La cadena de texto se convierte en un objeto de javaScript
        let result = JSON.parse(data_user);
        // Se toma el nombre del usuario del objeto mediante la propiedad name_user.
        this.name_user = result[0].name_user;
        // Se toma el apellido del usuario del objeto mediante la propiedad last_ name_user.
        this.last_name_user = result[0].last_name_user;
      })
  }

  priority(id) {
    this.typeCase(id);
    this.saveTurn(id)
  }
  administrative(id) {
    this.typeCase(id);
    this.saveTurn(id)
  }
  // Aqui se va a guardar el turno en la base de datos 
  saveTurn(id) {
    this.AgentService.validateAgent(id).subscribe(
      res => {
        // Se recibe el documento del usuario como parametro por la url. 
        const documentUser = this.ActivatedRoute.snapshot.params.document;
        // Los datos recibidos se convierten en una cadena de texto
        let data_agent = JSON.stringify(res);
        // La cadena de texto se convierte en un objeto de javaScript
        let resultAgent = JSON.parse(data_agent);
        // Se saca la longitud del objeto de javaScript
        let length = resultAgent.length;
        //Con la logitud del objeto se genera un numero aleatorio para asignar un agente aleatorio
        let number = Math.floor(Math.random() * length);
        // Se guarda el documento del usuario
        this.addTurn.id_user_fk = <any>documentUser;
        // Se guarda el documento del agente
        this.addTurn.id_agent_fk = <any>resultAgent[number].id_agent;
        //Condicional para seleccionar el caso que aya tomado el usuario
        if (id === 1) {
          //Se guarda el numero del turno en este caso es prioritario
         this.addTurn.name_turn = 'P ' + this.lengthTurns++;
          //Se guarda el numero del caso selecionado
          this.addTurn.case_turn = id;
        } else if (id === 2) {
          //Se guarda el numero del turno en este caso es administrativo
          this.addTurn.name_turn = 'A ' + this.lengthTurns++;
          //Se guarda el numero del caso selecionado
          this.addTurn.case_turn = id;
        }
        // Se guarda como primer estado 'activo'
        this.addTurn.status_turn = 'Activo';
        // Se guarda el modulo que lo corresponde al agente selecionado
        this.addTurn.module_turn = <any>resultAgent[number].module_agent;
        
        // Se ejecuta el metodo post para guardar todo los datos en la base de datos
        this.TurnsService.addTurn(this.addTurn).subscribe();
        this.verifyTurn();


      })
  }
  // Se valida el tipo de caso para ser asignado
  typeCase(id) {
    this.TurnsService.validationTypeCase(id).subscribe(
      res => {
        // Los datos recibidos se convierten en una cadena de texto
        let data_turn = JSON.stringify(res);
        // La cadena de texto se convierte en un objeto de javaScript
        let result = JSON.parse(data_turn);
        // Se saca la longitud del objeto de javaScript
        this.lengthTurns = result.length;

      });
  }

  verifyTurn() {
    // Se recibe el documento del usuario como parametro por la url. 
    const id_user = this.ActivatedRoute.snapshot.params.document;
    // // Se valida si al usuario se le genero el turno
    this.TurnsService.validationTurn(id_user).subscribe(
      res => {
        //console.log(res);
        // Los datos recibidos se convierten en una cadena de texto
        let data_agent = JSON.stringify(res);
        // La cadena de texto se convierte en un objeto de javaScript
        let result = JSON.parse(data_agent);
        // Se toma el dato del turno devuelto
        let turn = result[0].name_turn;
// Se muestra una alerta con el turno que se le asigno al usuario
        Swal.fire({
          position: 'center',
          title: 'TU TURNO',
          showConfirmButton: false,
          html: `<h1 style="font-size: 100px;">${turn}</h1>`,
          timer: 10000,
        }).finally(() => {
          this.route.navigate(['']);
        })
      });
  }

}
