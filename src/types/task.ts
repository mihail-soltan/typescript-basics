export interface Task {
  _id?: string;
  title: string;
  category: string;
  description: string;
  completed: boolean;
  deadline: Date;
  created_at: Date;
  created_by: string;
  updated_at: Date;
  updated_by?: string;
  complete_task?: any;
  delete_task?: any; 
}
