import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../../../api/task.service';
import {
  Task,
  CreateTaskDto,
  UpdateTaskDto,
} from '../../../models/task.interface';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode = false;
  taskId: number | null = null;
  loading = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.createForm();
  }

  ngOnInit(): void {
    this.taskId = parseInt(this.route.snapshot.paramMap.get('id') || "");
    this.isEditMode = !!this.taskId;

    if (this.isEditMode && this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  private loadTask(id: number): void {
    this.loading = true;
    this.taskService.getTaskById(id).subscribe({
      next: (task: Task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
        });
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefa:', error);
        this.snackBar.open('Erro ao carregar tarefa', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/']);
        this.loading = false;
      },
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.submitting = true;

      if (this.isEditMode && this.taskId) this.updateTask();
      else this.createTask();
    } else {
      this.markFormGroupTouched();
    }
  }

  private createTask(): void {
    const createTaskDto: CreateTaskDto = this.taskForm.value;

    this.taskService.createTask(createTaskDto).subscribe({
      next: () => {
        this.snackBar.open('Tarefa criada com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro ao criar tarefa:', error);
        this.snackBar.open('Erro ao criar tarefa', 'Fechar', {
          duration: 3000,
        });
        this.submitting = false;
      },
    });
  }

  private updateTask(): void {
    if (!this.taskId) return;

    const updateTaskDto: UpdateTaskDto = this.taskForm.value;
    updateTaskDto.id = this.taskId;

    this.taskService.updateTask(this.taskId, updateTaskDto).subscribe({
      next: () => {
        this.snackBar.open('Tarefa atualizada com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erro ao atualizar tarefa:', error);
        this.snackBar.open('Erro ao atualizar tarefa', 'Fechar', {
          duration: 3000,
        });
        this.submitting = false;
      },
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.taskForm.controls).forEach((key) => {
      const control = this.taskForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  get title() {
    return this.taskForm.get('title');
  }

  get description() {
    return this.taskForm.get('description');
  }

  getTitleErrorMessage(): string {
    if (this.title?.hasError('required')) {
      return 'Título é obrigatório';
    }
    if (this.title?.hasError('minlength')) {
      return 'Título deve ter pelo menos 3 caracteres';
    }
    if (this.title?.hasError('maxlength')) {
      return 'Título deve ter no máximo 100 caracteres';
    }
    return '';
  }

  getDescriptionErrorMessage(): string {
    if (this.description?.hasError('required')) {
      return 'Descrição é obrigatória';
    }
    if (this.description?.hasError('minlength')) {
      return 'Descrição deve ter pelo menos 10 caracteres';
    }
    if (this.description?.hasError('maxlength')) {
      return 'Descrição deve ter no máximo 500 caracteres';
    }
    return '';
  }
}
