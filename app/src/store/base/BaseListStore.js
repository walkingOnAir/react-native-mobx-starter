/**
 * List通用父类
 * Created by wangpeng on 2017/4/10.
 */
import { observable, action, computed } from "mobx";

class BaseListStore {
    //数据加载状态
    @observable listLoadingStatus = false;
    //数据列表
    @observable list = [];
    //当前页
    @observable page = 1;
    //当前页记录数
    @observable pageCount = 15;
    //总记录数
    @observable sumCount = 0;
    //总页数
    @computed
    get totalPage() {
        let totalPage = Math.ceil(this.sumCount / this.pageCount);
        return totalPage == 0 ? 1 : totalPage;
    }

    /**
     * 设置数据加载状态
     * @param val
     */
    @action
    setListLoadingStatus(val) {
        this.listLoadingStatus = val;
    }

    /**
     * 清空列表
     */
    @action
    clearList() {
        this.list.clear();
    }

    /**
     * 初始化列表
     * @param val
     */
    @action
    initialList(val) {
        this.list = val;
        this.listLoadingStatus = true;
    }
}

export default BaseListStore;
