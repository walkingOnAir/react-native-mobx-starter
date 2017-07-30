/**
 * Created by wangpeng on 2017/3/22.
 */
import { observable, action, computed } from "mobx";

class MainDrawerStore {

    @observable drawerState = "closed";

    @action
    setDrawerState(val) {
        this.drawerState = val;
    }

}

export default MainDrawerStore;