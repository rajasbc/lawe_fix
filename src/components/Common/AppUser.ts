import { Auth } from "aws-amplify";
import { History } from 'history';
import { action, computed, observable } from 'mobx';
import { ApiService } from "../api/ApiService";

export class AppUser {
  public api: ApiService;
  // public store: ServiceListStore
  @observable public token;
  @observable public userInfo: any;
  @observable public isLogedIn: boolean;
  @observable public isError: boolean;
  @observable public _picture: string;
  @observable public isLoading: boolean;
  @observable public _storeLogo: string;
  @observable public backdrops: boolean;
  @observable public AllStoreList: any = []
  @observable public _role: string = 'orgAdmin';
  @observable isAuthenticated: boolean = false;

  constructor() {
    this.api = new ApiService();
  }

  @computed
  get userId(): string {
    if (JSON.parse(localStorage.getItem('user'))) {
      //console.log('local storage userid' + localStorage.getItem('user'));
      return JSON.parse(localStorage.getItem('user'))[1];
    }
  }

  @computed
  get appId(): string {
    if (JSON.parse(localStorage.getItem('org'))) {
      return JSON.parse(localStorage.getItem('org'))[1];
    }
  }

  @computed
  get role(): string {
    if (JSON.parse(localStorage.getItem('org'))) {
      return JSON.parse(localStorage.getItem('org'))[0];
    }
  }

  getUser = async () => {
    this.isLoading = true;
    const branch = [];
    if (localStorage.getItem('user')) {
      console.log(localStorage.getItem('user'));
      await this.api.Get(`getuser?userid=${this.userId}`);
      if (this.api.response.status === 200) {
        this.userInfo = this.api.response.data;
        this.isLoading = false;
        branch.push(this.userInfo.role, this.userInfo.branchid)
        localStorage.setItem("org", JSON.stringify(branch));
      }
    }
  }

  @action
  async updatePicture(file: string) {
  }

  @computed
  get islogedin(): boolean {
    if (JSON.parse(localStorage.getItem('user'))) {
      return true;
    }
    return false;
  }

  SignOut = async (history: History) => {
    await Auth.signOut({ global: true })
    localStorage.clear();
    history.push("/");
    location.reload();
  }

  getAllSearchStore = async (value) => {
    this.backdrops = true;
    await this.AllStoreList.splice(0, this.AllStoreList.length);

    await this.api.Get(`orgs/searchorg?businessName=${value}`);
    if (this.api.response.data) {
    }
  }
  
  getAllStore = async () => {
    this.backdrops = true;
    await this.AllStoreList.splice(0, this.AllStoreList.length);
    await this.api.Get('orgs/getallorg');
    if (this.api.response.data.message) {
      this.backdrops = false;
      return false;
    }
    if (this.api.response.data) {

    } else {
      this.backdrops = false;
    }
  }

}
