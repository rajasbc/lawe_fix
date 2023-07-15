import { action } from 'mobx';
import { AppUser } from "./components/Common/AppUser";
import { BaseStore } from "./components/Common/BaseStore";
import { ApiService } from "./components/api/ApiService";

declare global {
    interface Window {
        gs: GlobalState;
    }
}

export interface UserContext {
    appId: string;
    orgId: string;
}

export class GlobalState extends BaseStore {
    declare user: AppUser;
    declare api: ApiService;
    userContext: UserContext;
    private static _gs: GlobalState = null;

    constructor() {
        super();
        this.user = new AppUser();
        this.api = new ApiService();
    }

    @action
    async init() {
        try {
            await Promise.all([
                // here we can initialize any stores
                // that need to be fully initialized before the app is rendered
                // one example is the user
                //this.user.init(),
            ]);
            this.setReady();
        } catch (e) {
            this.setError(e);
        }
    }

    static create(): GlobalState {
        GlobalState._gs = new GlobalState();
        GlobalState._gs.init();
        window.gs = GlobalState._gs;
        return GlobalState._gs;
    }
    static destroy(): void {
        GlobalState._gs = null;
        window.gs = null;
    }

    static get(): GlobalState {
        if (GlobalState._gs === null) {
            throw new Error('Uninitialized GlobalState')
        }
        return GlobalState._gs;
    }
    getUserContext(): UserContext {
        return GlobalState._gs.userContext;
    }
    setUserContext(userContext: UserContext) {
        GlobalState._gs.userContext = userContext;

    }
}
