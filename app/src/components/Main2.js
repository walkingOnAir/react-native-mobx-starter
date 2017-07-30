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

@observer
class Main2 extends Component {

    render() {
        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>this is main2 scene. </Text>
            </View>
        );
    }
}

export default Main2;