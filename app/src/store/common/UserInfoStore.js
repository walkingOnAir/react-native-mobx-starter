/**
 * 用户信息store
 * Created by wangpeng on 2017/3/20.
 */

import { observable, action, computed } from "mobx";

class UserInfoStore {

    @observable nickname = "";
    @observable token = "";

    @action
    setNickname(val) {
        this.nickname = val;
    }

    @action
    setToken(val) {
        this.token = val;
    }

}

export default UserInfoStore;
