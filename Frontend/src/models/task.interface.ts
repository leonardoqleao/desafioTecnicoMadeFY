export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  creation: Date;
  conclusion?: Date;
}

export interface CreateTaskDto {
  title: string;
  description: string;
}

export interface UpdateTaskDto {
  id: number
  title?: string;
  description?: string;
}

