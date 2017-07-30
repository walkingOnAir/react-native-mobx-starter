/**
 * Created by wangpeng on 2017/3/17.
 */
import React, {Component} from "react";
import {action} from "mobx";
import {inject, observer} from "mobx-react/native";
import {Actions, ActionConst} from "react-native-router-flux";
import {View, Text} from "react-native";
import {
    Container,
    Content,
    Header,
    Footer,
    FooterTab,
    Title,
    Left,
    Body,
    Right,
    Icon,
    Button,
    Badge
} from "native-base";
import Main1 from "./Main1";
import Main2 from "./Main2";
import Main3 from "./Main3";
import {styles} from "../styles";
import {AppStorage} from "../lib/storage";

@inject("userInfoStore", "mainDrawerStore", "mainTabStore")
@observer
class Main extends Component {

    componentWillMount() {
        this.getUserInfo();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    @action.bound
    getUserInfo() {
        this.clickTab(0);
        AppStorage.getOne("userInfo")
            .then((userInfo) => {
                this.props.userInfoStore.setToken(userInfo.token);
                this.props.userInfoStore.setNickname(userInfo.nickname);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    logout() {
        //清空缓存中的userInfo
        AppStorage.remove("userInfo");
        //回到登录场景
        Actions.login({ type: ActionConst.REPLACE });
    }

    @action.bound
    showDrawer() {
        this.props.mainDrawerStore.setDrawerState("opened");
    }

    @action.bound
    showSpinner() {
        Actions.spinner();
        this.timer = setTimeout(() => {
            Actions.pop();
            this.clickTab(0);
        }, 2000);
    }

    @action
    clickTab(index) {
        this.props.mainTabStore.setTabItem(index);
    }

    @action.bound
    main1() {
        this.clickTab(1);
    }

    @action.bound
    main2() {
        this.clickTab(2);
    }

    @action.bound
    main3() {
        this.clickTab(3);
    }

    /**
     * 渲染头部
     * @returns {XML}
     */
    renderHeader() {
        return (
            <Header>
                <Left>
                    <Button transparent onPress={ this.showDrawer }>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                <Title>Main</Title>
                </Body>
                <Right>
                    <Button transparent onPress={ () => this.logout() }>
                        <Icon name="ios-power" />
                    </Button>
                </Right>
            </Header>
        );
    }

    /**
     * 渲染主体内容
     * @returns {XML}
     */
    renderContent() {
        if (this.props.mainTabStore.tabItemIndex === 1) {
            return <Main1 />;
        } else if (this.props.mainTabStore.tabItemIndex === 2) {
            return <Main2 />;
        } else if (this.props.mainTabStore.tabItemIndex === 3) {
            return <Main3 />;
        }
        return (
            <View style={ styles.container }>
                <Text style={ styles.text }>你好, { this.props.userInfoStore.nickname } </Text>
                <Text style={ styles.text }>你的token是{ this.props.userInfoStore.token } </Text>
            </View>
        );
    }

    /**
     * 渲染底部
     * @returns {XML}
     */
    renderFooter() {
        return (
            <Footer>
                <FooterTab>
                    <Button
                        badge
                        active={ this.props.mainTabStore.tabItemActiveArray[0] }
                        onPress={ this.showSpinner }
                    >
                        <Badge>
                            <Text>2</Text>
                        </Badge>
                        <Icon active={ this.props.mainTabStore.tabItemActiveArray[0] } name="navigate" />
                        <Text>spinner</Text>
                    </Button>
                    <Button
                        active={ this.props.mainTabStore.tabItemActiveArray[1] }
                        onPress={ this.main1 }
                    >
                        <Icon active={ this.props.mainTabStore.tabItemActiveArray[1] } name="paper" />
                        <Text>main1</Text>
                    </Button>
                    <Button
                        badge
                        active={ this.props.mainTabStore.tabItemActiveArray[2] }
                        onPress={ this.main2 }
                    >
                        <Badge success>
                            <Text>51</Text>
                        </Badge>
                        <Icon active={ this.props.mainTabStore.tabItemActiveArray[2] } name="images" />
                        <Text>main2</Text>
                    </Button>
                    <Button
                        active={ this.props.mainTabStore.tabItemActiveArray[3] }
                        onPress={ this.main3 }
                    >
                        <Icon active={ this.props.mainTabStore.tabItemActiveArray[3] } name="person" />
                        <Text>main3</Text>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }

    render() {
        return (
            <Container>
                { this.renderHeader() }
                <Content padder>
                    { this.renderContent() }
                </Content>
                { this.renderFooter() }
            </Container>
        );
    }
}

export default Main;