/**
 * 登录store
 * Created by wangpeng on 2017/3/17.
 */
import { observable, action, computed } from "mobx";

class LoginStore {

    @observable username = "";
    @observable password = "";

    @action
    setUsername(val) {
        this.username = val;
    }

    @action
    setPassword(val) {
        this.password = val;
    }

    @action
    clearInput() {
        this.username = "";
        this.password = "";
    }

}

export default LoginStore;