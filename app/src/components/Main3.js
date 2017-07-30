/**
 * Created by wangpeng on 2017/3/28.
 */
import React, { Component } from "react";
import { action } from "mobx";
import { inject, observer } from "mobx-react/native";
import { Actions, ActionConst } from "react-native-router-flux";
import {
    View,
    Text
} from "react-native";
import { styles } from "../styles";
import CustomerButton from "../lib/ui/component/CustomerButton";

@observer
class Main3 extends Component {

    _onPressButton() {
        alert("自定义按钮");
    }

    render() {
        return (
            <View style={ styles.container }>
                <CustomerButton onPress={() => this._onPressButton()}>
                    <Text style={{backgroundColor: "blue", padding: 10, color: "#fff"}}>button</Text>
                </CustomerButton>
                <Text style={ styles.text }>this is main3 scene. </Text>
            </View>
        );
    }
}

export default Main3;