/**
 * Created by wangpeng on 2017/4/28.
 */
import {ListView} from "react-native";
import {observable, computed} from "mobx";
import BaseListStore from "./BaseListStore";

class BaseListDataSourceStore extends BaseListStore {

    ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
    });

    @computed
    get dataSource() {
        return this.ds.cloneWithRows(this.list.slice());
    }
}

export default BaseListDataSourceStore;