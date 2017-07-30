/**
 * Created by wangpeng on 2017/3/24.
 */
import React, { Component } from "react";
import { action } from "mobx";
import { inject, observer } from "mobx-react/native";
import { Actions, ActionConst } from "react-native-router-flux";
import {
    View,
    Text
} from "react-native";
import {
    Container,
    Content,
    Spinner
} from "native-base";
import { spinnerContainer } from "../styles/common/container";

class SpinnerComponent extends Component {

    render() {
        return (
            <Container style={ spinnerContainer }>
                <View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
                    <Spinner color="blue" />
                </View>
            </Container>
        );
    }
}

export default SpinnerComponent;