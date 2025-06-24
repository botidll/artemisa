import { Component,computed, signal, effect, inject, Injector } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from './../../models/task.model';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasks = signal<Task[]>([]);

  filter = signal('all');
  tasksbyFilter = computed(()   =>  {
      const filter = this.filter();
      const tasks = this.tasks();
      if (filter === 'Pending'){
        return tasks.filter(task => !task.completed)
      }
      if (filter === 'Completed'){
        return tasks.filter(task => task.completed)
      }
      return tasks;
  })

  //control de Imput
  newTaskControl = new FormControl('', {
    nonNullable: true,
    //
    validators: [
      Validators.required,
      //este validador evita espacios vacios
      Validators.pattern('^\\S.*$'),
      Validators.minLength(5),
    ],
  });

  //Imput Html Control Funcion
  ImputHandler() {
    if (this.newTaskControl.valid) {
      const value = this.newTaskControl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskControl.setValue('');
      }
    }
  }

  //Agregar un Otro elemento a una lista activa, sin cambiar todo solo añadir
  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }
  //Añade otro objeto de tarea
  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  //Borra una tarea
  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((task, position) => position !== index)
    );
  }
  //actualziar tarea

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((tasks, position) => {
        if (position === index) {
          return {
            ...tasks,
            completed: !tasks.completed,
          };
        }
        return tasks;
      });
    });
  }

  //Tacha una tarea
  toggleChecked(index: number) {
    this.tasks.update((value) =>
      value.map((task, position) => {
        if (position === index)
          return {
            ...task,
            completed: !task.completed,
          };
        return task;
      })
    );
  }
  //Entrar en modo edicion
  updateTaskMode(index: number){
        this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true
          }
        }

        return {
          ...task,
          editing: false
        };
      })
    });
  }

  //Entrar en modo edicion
  updateTaskText(index: number, event: Event){
    const input = event.target as HTMLInputElement
        this.tasks.update(prevState => {
      return prevState.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task
      })
    });
  }

  ChangueFilter(filter: string){
    this.filter.set(filter);
  }
//effects idk
  constructor(){

  }

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackingtasks();
  }


  injector = inject(Injector);

  trackingtasks(){
effect(()   =>  {
      const tasks = this.tasks();
      console.log(tasks);
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }, {})
  }
}
