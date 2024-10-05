import {ApplicationUser} from './ApplicationUser';

export interface UserStorageInterface {
    store(user: ApplicationUser): void;
    get(): ApplicationUser | null;
    clear(): void;
}

export class ApplicationUserStorageFactory {
    private static instance: undefined | UserStorageInterface;

    static create(): UserStorageInterface {
        if (undefined === ApplicationUserStorageFactory.instance) {
            ApplicationUserStorageFactory.instance = new ApplicationUserStorage();
        }

        return ApplicationUserStorageFactory.instance;
    }

    private constructor() {
        /*_*/
    }
}

class ApplicationUserStorage implements UserStorageInterface {
    private static readonly storageKey: string = 'ds2p_predictor_auth_user';

    store(user: ApplicationUser): void {
        localStorage.setItem(ApplicationUserStorage.storageKey, JSON.stringify(user.token));
    }

    get(): ApplicationUser | null {
        let jwtToken = localStorage.getItem(ApplicationUserStorage.storageKey);
        if (null !== jwtToken) {
            const userObject = JSON.parse(atob(jwtToken.split('.')[1]));
            jwtToken = jwtToken.substring(1, jwtToken.length - 1);
            return new ApplicationUser(
                Number(userObject['id']),
                userObject['username'],
                userObject['roles'],
                jwtToken
            );
        }
        return null;
    }

    clear(): void {
        localStorage.removeItem(ApplicationUserStorage.storageKey);
    }
}
