import {Store} from "../../store";
import {Injectable} from "@angular/core";

interface Employee {    title: string;   name: string;}
 const employees: Employee[] = [ {  title: 'Boss',   name: 'Michael Scott' }, { title: 'Secretary', name: 'Pam Beesly'}]
 export class OfficeState {
     employees: Employee[] = [...employees];
 }

 @Injectable({providedIn: 'root'})
 export class OfficeStore extends Store<OfficeState> {
     constructor(){
         super(new OfficeState())
     }

     addEmployee(person: Employee): void {
         this.setState({
             ...this.state,
             employees: [...this.state.employees, person]
         });
     }

     removeEmployee(person: Employee): void {
         this.setState({
             ...this.state,
             employees: this.state.employees.filter(item => item.name !== person.name)
         });
     }
 }
