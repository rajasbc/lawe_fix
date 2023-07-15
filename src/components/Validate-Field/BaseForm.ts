import { action, computed, observable } from 'mobx';

export enum FormState {
    Ready,
    Working,
    Success,
    Error,
}

export class BaseForm {
    @observable private _errorMessage: string;
    //@observable private _clientErrorMessage: string;
    //@observable private _serverErrorMessage: string;
    @observable private _state: FormState;
    @observable private _successMessage: string;
    @observable private _loadingButtonId: string;

    constructor() {
        this._state = FormState.Ready;
    }

    @computed
    get errorMessage(): string {
        return this.hasError ? this._errorMessage : '';
    }

    // @computed
    // get clientErrorMessage(): string {
    //     return this._clientErrorMessage;
    // }

    // @computed
    // get serverErrorMessage(): string {
    //     return this._serverErrorMessage;
    // }

    @computed
    get hasError(): boolean {
        return (this._state === FormState.Error);
    }

    @computed
    get isReady(): boolean {
        return this._state === FormState.Ready;
    }

    @computed
    get isSuccess(): boolean {
        return this._state === FormState.Success;
    }

    @computed
    get isWorking(): boolean {
        return this._state === FormState.Working;
    }

    @computed
    get successMessage(): string {
        return this.isSuccess ? this._successMessage : '';
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
    setError(error) {
        this._state = FormState.Error;
        this._errorMessage = error.message;
        //this._clientErrorMessage = error.clientErrorMessage ? error.clientErrorMessage : null;
        //this._serverErrorMessage = error.serverErrorMessage ? error.serverErrorMessage : null;
        this._loadingButtonId = '';
    }

    @action
    setReady() {
        this._state = FormState.Ready;
        this._loadingButtonId = '';
    }

    @action
    setSuccess(message: string) {
        this._state = FormState.Success;
        this._successMessage = message;
        this._loadingButtonId = '';
    }

    @action
    setWorking() {
        this._state = FormState.Working;
    }
}
