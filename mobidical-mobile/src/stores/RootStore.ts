// src/stores/RootStore.ts
import { makeAutoObservable } from "mobx";
import UserStore from '@/src/stores/UserStores';
import TodoStore from '@/src/stores/TodoStores';
import { storage } from '@/utils/storage';

class RootStore {
    userStore: UserStore;
    todoStore: TodoStore;
    isHydrated = false;

    constructor() {
        this.userStore = new UserStore();
        this.todoStore = new TodoStore();
        makeAutoObservable(this);
    }

    get allStoresReady() {
        return this.userStore.isHydrated && this.todoStore.isHydrated;
    }
}

export default RootStore;