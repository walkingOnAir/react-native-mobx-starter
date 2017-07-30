/**
 * Created by wangpeng on 2017/4/26.
 */
import React, {Component} from "react";
import {TouchableHighlight} from "react-native";

class CustomerButton extends Component {

    /**
     * this.props对象的属性与组件的属性一一对应，除了this.props.children属性，表示组件的所有子节点。
     * 使用React.Children.map来遍历子节点
     * this.props.children的几种可能：
     * 1、没有子节点，则为undefined
     * 2、一个子节点，则数据类型是object
     * 3、多个子节点，则数据类型是array
     * TouchableHighlight只能有一个子节点，如果传递多个，使用View包装起来
     */
    render() {
        return (
            <TouchableHighlight onPress={this.props.onPress}>
                { this.props.children }
            </TouchableHighlight>
        );
    }
}

export default CustomerButton;