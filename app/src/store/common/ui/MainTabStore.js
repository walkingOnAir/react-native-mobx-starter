/**
 * Created by wangpeng on 2017/3/24.
 */
import { observable, action, computed } from "mobx";
import validator from "validator";

class MainTabStore {

    //底部tab索引，从0开始
    @observable tabItemIndex = 0;
    @observable tabItemActiveArray = [
        true, false, false, false
    ];

    @action
    setTabItem(index) {
        let index_vali;
        if (typeof index !== "string") {
            index_vali = index + "";
        }
        if (!validator.isNumeric(index_vali)) {
            throw new Error("index must be a number");
        }
        this.tabItemIndex = index;
        this.updateTabItemActive();
    }

    @action
    updateTabItemActive() {
        this.tabItemActiveArray = [false, false, false, false];
        this.tabItemActiveArray[this.tabItemIndex] = true;
    }

}

export default MainTabStore;