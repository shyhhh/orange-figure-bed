import { makeObservable, observable, action } from "mobx";
import { Uploader } from "../models";
import { message} from "antd"

class ImageStore {
  constructor() {
    makeObservable(this);
  }

  @observable filename = "";
  @observable file = null;
  @observable isUpLoading = false;
  @observable serverFile = null

  @action setFilename(newFilename) {
    this.filename = newFilename;
  }
  @action setFile(newFile) {
    this.file = newFile;
  }
  @action upload() {
    this.isUpLoading = true;
    this.serverFile = null;
    return new Promise((resolve, reject) => {
      Uploader.add(this.file, this.filename)
        .then((serverFile) => {
          this.serverFile = serverFile
          resolve(serverFile)
        })
        .catch((err) => {
          message.error("上传失败")
          reject(err)
        })
        .finally(() => (this.isUpLoading = false));
    });
  }
  @action reset() {
    this.isUpLoading = false;
    this.serverFile = null;
  }
}

export default new ImageStore();
