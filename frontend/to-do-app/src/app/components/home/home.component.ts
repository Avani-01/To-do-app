import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../service/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];
  newTitle = '';
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }
  
  fetchTodos() {
    this.todoService.getTodos().subscribe(t => this.todos = t);
  }

  addNewTodo() {
    if (!this.newTitle.trim()) return;
    const todo: Todo = { title: this.newTitle, completed: false };
    this.todoService.addTodo(todo).subscribe(() => {
      this.newTitle = '';
      this.fetchTodos();
    });
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  deleteOneTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe(() => this.fetchTodos());
  }
}
