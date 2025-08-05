import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Task } from '../../../models/task.interface';
import { TaskService } from '../../../api/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];  
  loading = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadTasks(): void {
    this.loading = true;
    this.subscription.add(
      this.taskService.getTasks().subscribe({
        next: (tasks) => {
          this.tasks = tasks;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar tarefas:', error);
          this.snackBar.open('Erro ao carregar tarefas', 'Fechar', { duration: 3000 });
          this.loading = false;
        }
      })
    );
  }

  toggleTaskCompletion(task: Task): void {
    this.subscription.add(
      this.taskService.toggleTaskCompletion(task.id).subscribe({
        next: () => {
          const status = task.completed ? 'pendente' : 'concluída';
          this.snackBar.open(`Tarefa marcada como ${status}`, 'Fechar', { duration: 2000 });
          location.reload()
          this.router.navigate(['/', ]);
        },
        error: (error) => {
          console.error('Erro ao alterar status da tarefa:', error);
          this.snackBar.open('Erro ao alterar status da tarefa', 'Fechar', { duration: 3000 });
        }
      })
    );
  }



  deleteTask(task: Task): void {
    if (confirm(`Tem certeza que deseja excluir a tarefa "${task.title}"?`)) {
      this.subscription.add(
        this.taskService.deleteTask(task.id).subscribe({
          next: () => {
            this.snackBar.open('Tarefa excluída com sucesso', 'Fechar', { duration: 2000 });
            location.reload()
          },
          error: (error) => {
            console.error('Erro ao excluir tarefa:', error);
            this.snackBar.open('Erro ao excluir tarefa', 'Fechar', { duration: 3000 });
          }
        })
      );
    }
  }
  
  editTask(taskId: number): void {
    this.router.navigate(['/task', taskId]);
  }
  
  createNewTask(): void {
    this.router.navigate(['/task']);
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return"";
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTaskStatusColor(task: Task): string {
    return task.completed ? 'primary' : 'accent';
  }

  getTaskStatusIcon(task: Task): string {
    return task.completed ? 'check_circle' : 'radio_button_unchecked';
  }
}

