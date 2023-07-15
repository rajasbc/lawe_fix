import axios from "axios";
import { action, observable } from 'mobx';
import { BaseForm } from "../Validate-Field/BaseForm";

export class ApiService extends BaseForm {
    @observable response: any = {};
    public Isloading: boolean = false;
    @observable public isError: boolean;
    //public BaseUrl = process.env.API_URL;
    public BaseUrl = 'http://localhost:9000';

    constructor() {
        super()
    }

    @action Post = async (path: string, data: any) => {
        await axios.post(`${this.BaseUrl}/${path}`, data)
            .then(response => {
                this.isError = false;
                this.response = response;
            }).catch(err => {
                this.isError = true;
                return null;
            });
    }

    @action
    Get = async (path: any) => {
        await axios.get(`${this.BaseUrl}/${path}`)
            .then(response => {
                this.response = response;
            }).catch(err => {
                return null;
            });
    }

    @action
    delete = async (path: any) => {
        await axios.delete(`${this.BaseUrl}/${path}`)
            .then(response => {
                this.response = response;
            }).catch(err => {
                return null;
            });
    }
    @action
    put = async (path: any,data: any) => {
        await axios.put(`${this.BaseUrl}/${path}`, data)
            .then(response => {
                this.response = response;
            }).catch(err => {
                return null;
            });
    }
}

