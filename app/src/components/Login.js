/**
 * Created by wangp on 2017/3/16.
 */
import React, {Component} from "react";
import {Keyboard, View, Image} from "react-native";
import {Container, Content, Grid, Col, Row, Toast, Form, Item, Input, Label, Button, Text} from "native-base";
import {action} from "mobx";
import {inject, observer} from "mobx-react/native";
import {Actions, ActionConst} from "react-native-router-flux";
import {loginButton} from "../styles/common/button";
import account from "../service/account";

@inject("loginStore")
@observer
class Login extends Component {

    @action.bound
    setUsername(val) {
        this.props.loginStore.setUsername(val);
    }

    @action.bound
    setPassword(val) {
        this.props.loginStore.setPassword(val);
    }

    @action.bound
    login() {
        //验证输入
        if (this.props.loginStore.username === "") {
            // Toast.show({
            //     text: '用户名不能为空!',
            //     position: "top",
            //     buttonText: '确定',
            //     type: "danger"
            // });
            alert("用户名不能为空!");
            return;
        }
        if (this.props.loginStore.password === "") {
            // Toast.show({
            //     text: '密码不能为空!',
            //     position: "bottom",
            //     buttonText: "确定",
            //     type: "warning"
            // });
            alert("密码不能为空!");
            return;
        }
        //收起键盘
        Keyboard.dismiss();
        //构建请求参数
        const data = {
            client_id: 1000,
            identity_type: 1,
            identifier: this.props.loginStore.username,
            credential: this.props.loginStore.password
        };
        //调用接口
        account.login(data).then((json) => {
            //清空输入框
            this.props.loginStore.clearInput();
            //转向main场景
            Actions.main({ type: ActionConst.RESET });
        }).catch((error) => {
            Toast.show({
                text: error.message,
                position: "top",
                buttonText: "确定",
                type: "danger"
            });
            // alert(error.message);
        });
    }

    render() {
        const { username, password } = this.props.loginStore;
        return (
            <Container>
                <Content
                    keyboardShouldPersistTaps="always"
                    style={{ flex: 1 }}
                >
                    <View
                        style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
                    >
                        <Image
                            source={ require("../img/logo400_160.png") }
                        />
                    </View>
                    <View
                        style={{ flex: 1 }}
                    >
                        <Form style={{ padding: 10 }}>
                            <Item floatingLabel last>
                                <Label>用户名</Label>
                                <Input
                                    value={ username }
                                    onChangeText={ this.setUsername }
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label>密码</Label>
                                <Input
                                    secureTextEntry
                                    value={ password }
                                    onChangeText={ this.setPassword }
                                />
                            </Item>
                            <Button
                                block
                                style={ loginButton.button1 }
                                onPress={ this.login }
                            >
                                <Text>登录</Text>
                            </Button>
                            <View
                                style={{ flex: 1, flexDirection: "row" }}
                            >
                                <View
                                    style={{ flex: 1 }}
                                >
                                    <Button
                                        info
                                        transparent
                                    >
                                        <Text>找回密码</Text>
                                    </Button>
                                </View>
                                <View
                                    style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
                                >
                                    <Button
                                        info
                                        transparent
                                    >
                                        <Text>立即注册</Text>
                                    </Button>
                                </View>
                            </View>
                        </Form>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Login;