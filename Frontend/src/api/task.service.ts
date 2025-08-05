import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task, CreateTaskDto, UpdateTaskDto } from '../models/task.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL = environment.baseUrl; 
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.getTasks().subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL}/all`).pipe(
      tap(tasks => this.tasksSubject.next(tasks))
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.API_URL}/${id}`);
  }

  createTask(createTaskDto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.API_URL, createTaskDto).pipe(
      tap(() => this.loadTasks())
    );
  }

  updateTask(id: number, updateTaskDto: UpdateTaskDto): Observable<Task> {
    return this.http.put<Task>(`${this.API_URL}`, updateTaskDto).pipe(
      tap(() => this.loadTasks()) 
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => this.loadTasks()) 
    );
  }

  toggleTaskCompletion(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.API_URL}/${id}/toggle`, {}).pipe(
      tap(() => this.loadTasks()) 
    );
  }

}

