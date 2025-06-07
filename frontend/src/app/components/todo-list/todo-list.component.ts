import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error: string | null = null;
  errorSource: 'load' | 'add' | 'edit' | null = null;
  initialized = false;
  editingTodo: Todo | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.error = null;

    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
        this.initialized = true;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
        this.initialized = true;
        this.errorSource = 'load';
      },
    });
  }

  addTodo(newTodo: { title: string; description?: string }): void {
    this.todoService.addTodo(newTodo).subscribe({
      next: (todo) => {
        this.todos.push(todo);
      },
      error: (err) => {
        this.error = err;
        this.errorSource = 'add';
      },
    });
  }

  updateTodo(updatedTodo: Todo): void {
    if (!this.editingTodo) return;
    this.todoService.updateTodo(updatedTodo.id, updatedTodo).subscribe({
      next: (todo) => {
        const index = this.todos.findIndex((t) => t.id === todo.id);
        if (index !== -1) {
          this.todos[index] = todo;
        }
        this.editingTodo = null;
      },
      error: (err) => {
        this.error = err;
        this.errorSource = 'edit';
      },
    });
  }

  toggleComplete(todo: Todo): void {
    this.todoService.updateTodo(todo.id, todo).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (err) => {
        this.error = err;
        this.errorSource = 'edit';
      },
    });
  }

  deleteTodo(id: number): void {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
        },
        error: (err) => {
          this.error = err;
        },
      });
    }
  }

  startEdit(todo: Todo): void {
    this.editingTodo = todo;
  }

  cancelEdit(): void {
    this.editingTodo = null;
  }
}
