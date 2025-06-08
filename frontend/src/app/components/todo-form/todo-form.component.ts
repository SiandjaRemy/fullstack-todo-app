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

  titleShort = false;

  ngOnChanges(changes: SimpleChanges): void {
    this.titleShort = false;
    if (changes['todo'] && this.todo) {
      this.editedTitle = this.todo.title;
      this.editedDescription = this.todo.description || '';
    }
  }

  saveAdd(): void {
    if (!this.title.trim()) return;
    if (this.title.length < 5) {
      this.titleShort = true;
    } else {
      this.isAdding = true;

      this.add.emit({
        title: this.title,
        description: this.description || undefined,
      });

      this.resetForm();
      this.isAdding = false;
      this.titleShort = false;
    }
  }

  resetForm(): void {
    this.title = '';
    this.description = '';
  }

  saveEdit(): void {
    if (!this.todo) return;
    if (this.editedTitle.length < 5) {
      this.titleShort = true;
      return;
    } else {
      this.isEditing = true;
      const updatedTodo = {
        ...this.todo,
        title: this.editedTitle,
        description: this.editedDescription || null,
      };
      this.edit.emit(updatedTodo);
      this.isEditing = false;
      this.titleShort = false;
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
