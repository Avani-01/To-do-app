import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../../service/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../service/token.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  username: string = '';
  todos: Todo[] = [];
  newTitle = '';
  todoIdToDelete: string | null = null;
  bgColors: string[] = ['#99aa38', '#fad2e1', '#9882ac', '#89c2d9', '#d4a373'];
  constructor(private todoService: TodoService,
    private router : Router,
    private tokenService: TokenService
  ) {}
  

  ngOnInit() {
    if (this.tokenService.isTokenExpired()) {
      this.tokenService.logout(); // Log out the user
      this.router.navigate(['/login']); // Redirect to login page
    }
    this.username = localStorage.getItem('username') || '';
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
    this.todoService.updateTodo(todo).subscribe();
  }

  // deleteOneTodo(id: string) {
  //   this.todoService.deleteTodo(id).subscribe(() => this.fetchTodos()); 
  // }
  setTodoToDelete(id: string) {
    this.todoIdToDelete = id;
    console.log(this.todoIdToDelete)
  }
  // confirmDelete(){
  //    if (this.todoIdToDelete) {
  //   this.deleteOneTodo(this.todoIdToDelete);
  //   this.todoIdToDelete = null;
  // }
  // }

  confirmDelete(): void {
    if (!this.todoIdToDelete) return;
  
    this.todoService.deleteTodo(this.todoIdToDelete).subscribe({
      next: () => {
        this.fetchTodos();
        this.todoIdToDelete = null;
      },
      error: (err) => {
        console.error('Failed to delete todo:', err);
      }
    });
  }

  logoutUser() {
    // Clear token and user info
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Navigate to login page
    this.router.navigate(['/login']);
  }
  
}
