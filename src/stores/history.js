import { makeObservable, observable, action, configure } from "mobx";
import { message } from "antd";
import { Uploader } from "../models";

configure({
  enforceActions: "never",
});
class HistoryStore {
  constructor() {
    makeObservable(this);
  }

  @observable list = [];
  @observable isLoading = false;
  @observable hasMore = true;
  @observable page = 0;
  limit = 10;

  @action append(newList) {
    this.list = this.list.concat(newList);
  }

  @action find() {
    this.isLoading = true;
    Uploader.find({page: this.page, limit: this.limit})
      .then(newList => {
        this.append(newList);
        this.page++;
        if (newList.length < this.limit) {
          console.log(this)
          console.log("1111111111")
          this.hasMore = false;
        }
      }).catch(error => {
        message.error('加载数据失败');
      }).finally(() => {
        this.isLoading = false;
      });
  }

  @action reset() {
    this.list = [];
    this.isLoading = false;
    this.hasMore = true;
    this.page = 0;
  }

}

export default new HistoryStore();
