/**
 * Created by wangpeng on 2017/3/24.
 */
import { observable, action, computed } from "mobx";

class ViewCardStore {
    @observable dataArray = [
        {
            text: "Card One",
            name: "One",
            image: require("../../img/swiper-1.png")
        },
        {
            text: "Card Two",
            name: "Two",
            image: require("../../img/swiper-2.png")
        },
        {
            text: "Card Three",
            name: "Three",
            image: require("../../img/swiper-3.png")
        },
        {
            text: "Card Four",
            name: "Four",
            image: require("../../img/swiper-4.png")
        }
    ];
    @observable loadingStatus = false;

    @action
    setLoadingStatus(val) {
        this.loadingStatus = val;
    }

    @action
    clearDataArray() {
        this.dataArray = [];
    }

}

export default ViewCardStore;