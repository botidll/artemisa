import { Component } from '@angular/core';
import {signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-labs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.html',
  styleUrl: './labs.css'
})
export class Labs {
  protected title = 'TDA';
    welcome = 'Bienvenido a mi primera aplicación con Angular';
  tasks = signal([
    'Instalar Angular CLI',
    'Crear proyecto',
    'Crear componente',
    'Crear servicio',
  ]);
  name = signal ('Julio');
  age: number = 15;
  disabled = true;
  img = 'https://images.icon-icons.com/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png';
person =signal ( {
  name: 'Julio',
  age: 15,
  avatar :'https://images.icon-icons.com/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png'
});


colorControl = new FormControl();
WidthControl = new FormControl(50, {
  nonNullable: true
})
NameControl = new FormControl('tulio', {
  nonNullable: true,
  validators:[
    Validators.required,
    Validators.minLength(3),
  ]
})

constructor(){
  this.colorControl.valueChanges.subscribe(value =>{
     console.log(value);
  } )

}

clickHandler(){
  alert('Hola')
}

changeHandler(event: Event){
   const input = event.target as HTMLInputElement
   const newValue = input.value;
   this.name.set(newValue);
}



keydownHandler(event: KeyboardEvent){
  const input = event.target as HTMLInputElement
  console.log(input.value)
}

changeAge(event: Event){
   const input = event.target as HTMLInputElement;
   const newValue = input.value;
   this.person.update(prevState  =>{
    return{
      ...prevState,
      age: parseInt(newValue, 10)
    }
   });
}

changeName(event: Event){
   const input = event.target as HTMLInputElement;
   const newValue = input.value;
   this.person.update(prevState  =>{
    return{
      ...prevState,
      name: newValue
    }
   });
}


}
