import { action, computed, observable } from 'mobx';
import { ApiService } from '../api/ApiService';
import { AppUser } from "./AppUser";

export enum StoreState {
    Loading,
    Ready,
    Error,
}

export class BaseStore {
    @observable private _state: StoreState;
    @observable private _errorMessage: string;
    @observable private _clientErrorMessage: string;
    @observable private _serverErrorMessage: string;
    @observable private _loadingButtonId: string;

    protected user: AppUser;
    protected api : ApiService;
    
    constructor(user?: AppUser,api?:ApiService) {
        this._state = StoreState.Loading;
        this.user = user;
        this.api = api;
    }

    @computed
    get errorMessage(): string {
        return this._errorMessage;
    }

    @computed
    get clientErrorMessage(): string {
        return this._clientErrorMessage;
    }

    @computed
    get serverErrorMessage(): string {
        return this._serverErrorMessage;
    }

    @computed
    get isLoading(): boolean {
        return this._state === StoreState.Loading;
    }

    @computed
    get isReady(): boolean {
        return this._state === StoreState.Ready;
    }

    @computed
    get hasError(): boolean {
        return this._state === StoreState.Error;
    }

    @computed
    get state(): StoreState {
        return this._state;
    }

    @computed
    get btnLoadingId(): string {
        return this._loadingButtonId;
    }

    @action
    setBtnLoading(id: string) {
        this._loadingButtonId = id;
    }

    @action
    setError(error: any) {
        this._state = StoreState.Error;
        this._errorMessage = error.message;
        this._clientErrorMessage = error.clientErrorMessage ? error.clientErrorMessage : null;
        this._serverErrorMessage = error.serverErrorMessage ? error.serverErrorMessage : null;
        this._loadingButtonId = '';
    }

    @action
    setLoading() {
        this._errorMessage = null;
        this._state = StoreState.Loading;
    }

    @action
    setReady() {
        this._errorMessage = null;
        this._state = StoreState.Ready;
        this._loadingButtonId = '';
    }
}
