// @flow
import type { ApiServiceInterface } from "../shared/services/ApiServiceInterface";

class AppService {
  api: ApiServiceInterface;

  endpoint: string = "/v1/todos";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getAll() {
    return this.api.get(this.endpoint);
  }

  addTodo(description: string) {
    return this.api.post(this.endpoint, {description});
  }

  updateAllTodosState(state: "ACTIVE" | "COMPLETED") {
    return this.api.put(this.endpoint, {state});
  }

  updateTodoState(id: string, state: "ACTIVE" | "COMPLETED") {
    return this.api.put(`${this.endpoint}/${id}`, {state});
  }

  deleteTodo(id: string) {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

  deleteTodosByState(state: "ACTIVE" | "COMPLETED") {
    return this.api.delete(this.endpoint, {state});
  }
}

export default AppService;
