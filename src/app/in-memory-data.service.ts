import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb(){
    const employees = [
      { id: 11, name: 'Dr Nice' , email: 'nice@onelity.com'},
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' , email: 'bomb@onelity.com'},
      { id: 14, name: 'Celeritas' , email: 'celeri@onelity.com'},
      { id: 15, name: 'Magneta' , email: 'magnet@onelity.com'},
      { id: 16, name: 'RubberMan' , email: 'ruby@onelity.com'},
      { id: 17, name: 'Dynama' , email: 'dynamite@onelity.com'},
      { id: 18, name: 'Dr IQ' , email: 'doctor@onelity.com'},
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' , email: 'tornado@onelity.com'}
    ];
    return employees;
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(empl => empl.id)) + 1 : 11;
  }
}
