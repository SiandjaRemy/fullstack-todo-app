export interface Todo {
  id: number;
  title: string;
  description?: string | null | undefined;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
  completed: boolean;
}
