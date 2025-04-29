import { makeAutoObservable, runInAction } from "mobx";
import { storage } from "@/utils/storage";

const STORAGE_KEY = 'user_store';

export interface User {
    id: string;
    name: string;
    email: string;
    profileImage?: string; // Ajout du champ pour la photo de profil
}

class UserStore {
    user: User | null = null;
    isLoading = false;
    error: string | null = null;
    isHydrated = false;

    constructor() {
        makeAutoObservable(this);
        this.hydrate();
    }

    // Méthode pour charger l'utilisateur depuis le stockage local
    async hydrate() {
        try {
            this.isLoading = true;
            const data = await storage.load(STORAGE_KEY);

            runInAction(() => {
                if (data) {
                    this.user = data.user;
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

    // Méthode pour persister l'état actuel dans le stockage local
    async persistState() {
        await storage.save(STORAGE_KEY, {
            user: this.user,
            // Ajouter d'autres champs que vous souhaitez persister ici
        });
    }

    // Méthode pour mettre à jour l'utilisateur, y compris la photo de profil
    setUser(user: User | null) {
        this.user = user;
        this.persistState(); // Persister automatiquement lorsque l'utilisateur change
    }

    // Méthode pour mettre à jour la photo de profil de l'utilisateur
    setProfileImage(profileImage: string) {
        if (this.user) {
            this.user.profileImage = profileImage;
            this.persistState(); // Persister après la mise à jour
        }
    }

    // Logique de login
    async login(email: string, password: string) {
        try {
            this.isLoading = true;
            this.error = null;

            // Appel API
            const response = await fetch('https://api.example.com/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            runInAction(() => {
                this.user = data.user;
                this.persistState();
            });
        } catch (error) {
            runInAction(() => {
                this.error = error instanceof Error ? error.message : 'Unknown error';
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    // Logique de déconnexion
    async logout() {
        this.user = null;
        await storage.remove(STORAGE_KEY); // Effacer le stockage à la déconnexion
    }
}

export default new UserStore();
