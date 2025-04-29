import { storage } from '@/utils/storage';
import { makeAutoObservable } from 'mobx';

class AuthStore {
    user: any = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async signIn(email: string, password: string) {
        const users = (await storage.load('users')) || [];

        const existingUser = users.find(
            (u: any) => u.email === email && u.password === password
        );

        if (!existingUser) {
            throw new Error('Invalid email or password');
        }

        await storage.save('user', existingUser);
        this.user = existingUser;
        return existingUser;
    }

    async signUp(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        userType: string
    ) {
        const users = (await storage.load('users')) || [];

        const userExists = users.some((u: any) => u.email === email);
        if (userExists) {
            throw new Error('User already exists');
        }

        const uid = 'user_' + Date.now().toString();
        const newUser = { uid, email, password, firstName, lastName, userType };

        const updatedUsers = [...users, newUser];
        await storage.save('users', updatedUsers);
        await storage.save('user', newUser);

        this.user = newUser;
        return newUser;
    }

    async signOut() {
        await storage.remove('user');
        this.user = null;
    }

    async loadCurrentUser() {
        const user = await storage.load('user');
        if (user) {
            this.user = user;
        }
        return user;
    }

    async KidsInfoRegistration() {
        // To be implemented
    }
}

export const authStore = new AuthStore();
