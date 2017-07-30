/**
 * Created by wangpeng on 2017/3/24.
 */
import { observable, action, computed } from "mobx";
import BaseListStore from "../base/BaseListStore";

class ListStore extends BaseListStore {
    arr = [
        {
            img: require("../../img/contacts/sankhadeep.png"),
            text: "Sankhadeep",
            note: "Its time to build a difference . ."
        },
        {
            img: require("../../img/contacts/supriya.png"),
            text: "Supriya",
            note: "One needs courage to be happy and smiling all time . . "
        },
        {
            img: require("../../img/contacts/himanshu.png"),
            text: "Himanshu",
            note: "Live a life style that matchs your vision"
        },
        {
            img: require("../../img/contacts/shweta.png"),
            text: "Shweta",
            note: "Failure is temporary, giving up makes it permanent"
        },
        {
            img: require("../../img/contacts/shruti.png"),
            text: "Shruti",
            note: "The biggest risk is a missed opportunity !!"
        }
    ];

    @action.bound
    getList() {
        this.list = this.list.concat(this.arr);
    }

}

export default ListStore;