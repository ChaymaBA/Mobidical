// src/stores/TodoStore.ts
import { makeAutoObservable, runInAction } from "mobx";
import { storage } from "../../utils/storage";

const STORAGE_KEY = 'todo_store';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

class TodoStore {
    todos: Todo[] = [];
    isLoading = false;
    error: string | null = null;
    isHydrated = false;

    constructor() {
        makeAutoObservable(this);
        this.hydrate();
    }

    async hydrate() {
        try {
            this.isLoading = true;
            const data = await storage.load(STORAGE_KEY);

            runInAction(() => {
                if (data) {
                    this.todos = data.todos || [];
                }
                this.isHydrated = true;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
                this.error = error instanceof Error ? error.message : 'Unknown error';
            });
        }
    }

    async persistState() {
        await storage.save(STORAGE_KEY, {
            todos: this.todos,
        });
    }

    addTodo(text: string) {
        const todo = {
            id: Date.now().toString(),
            text,
            completed: false,
        };

        this.todos.push(todo);
        this.persistState();
    }

    toggleTodo(id: string) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.persistState();
        }
    }

    removeTodo(id: string) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.persistState();
    }

    get completedTodos() {
        return this.todos.filter(t => t.completed);
    }

    get pendingTodos() {
        return this.todos.filter(t => !t.completed);
    }
}

export default TodoStore;