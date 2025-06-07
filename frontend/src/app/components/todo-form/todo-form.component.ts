import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class TodoFormComponent implements OnChanges {
  @Output() add = new EventEmitter<{ title: string; description?: string }>();
  @Output() edit = new EventEmitter<Todo>();
  @Output() cancel = new EventEmitter<void>();

  @Input() todo: Todo | null = null;

  title = '';
  description = '';
  isAdding = false;

  editedTitle = '';
  editedDescription = '';
  isEditing = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['todo'] && this.todo) {
      this.editedTitle = this.todo.title;
      this.editedDescription = this.todo.description || '';
    }
  }

  saveAdd(): void {
    if (!this.title.trim()) return;
    this.isAdding = true;

    this.add.emit({
      title: this.title,
      description: this.description || undefined,
    });

    this.resetForm();
    this.isAdding = false;
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
  }

  saveEdit(): void {
    if (!this.todo) return;

    this.isEditing = true;
    const updatedTodo = {
      ...this.todo,
      title: this.editedTitle,
      description: this.editedDescription || null,
    };
    this.edit.emit(updatedTodo);
    this.isEditing = false;
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
