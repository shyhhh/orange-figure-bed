import { makeObservable, observable, action } from "mobx";
import { Auth } from "../models";
class USerStore {
  constructor() {
    makeObservable(this);
  }

  @observable currentUser = null;

  @action pullUser() {
    this.currentUser = Auth.getCurrentUser();
  }
  @action resetUser() {
    this.currentUser = null;
  }
}

export default new USerStore();
