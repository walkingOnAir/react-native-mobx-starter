/**
 * Created by wangpeng on 2017/3/22.
 */
import React, { Component } from "react";
import { action } from "mobx";
import { inject, observer } from "mobx-react/native";
import { Image } from "react-native";
import {
    Container,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Switch,
    Badge,
    Icon,
    Button,
    Text
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";
import { sideBarStyles as styles } from "../styles";
import { sideBarText } from "../styles/common/text";
import { sideBarContent } from "../styles/common/content";
import { sideBarIcon } from "../styles/common/icon";

//侧边栏数据
const datas = [
    {
        name: "列表",
        route: "list",
        icon: "phone-portrait",
        bg: "#C5F442"
    },
    {
        name: "动态列表",
        route: "dynamicList",
        icon: "phone-portrait",
        bg: "#477EEA",
        types: "8"
    },
    {
        name: "Footer",
        route: "footer",
        icon: "phone-portrait",
        bg: "#DA4437",
        types: "4"
    },
    {
        name: "Badge",
        route: "badge",
        icon: "notifications",
        bg: "#4DCAE0"
    },
    {
        name: "Button",
        route: "button",
        icon: "radio-button-off",
        bg: "#1EBC7C",
        types: "9"
    },
    {
        name: "Card",
        route: "card",
        icon: "keypad",
        bg: "#B89EF5",
        types: "5"
    },
    {
        name: "Check Box",
        route: "checkbox",
        icon: "checkmark-circle",
        bg: "#EB6B23"
    },
    {
        name: "Deck Swiper",
        route: "deckswiper",
        icon: "swap",
        bg: "#3591FA"
    },
    {
        name: "Fab",
        route: "fab",
        icon: "help-buoy",
        bg: "#EF6092",
        types: "2"
    },
    {
        name: "Form & Inputs",
        route: "form",
        icon: "call",
        bg: "#EFB406",
        types: "13"
    },
    {
        name: "Icon",
        route: "icon",
        icon: "information-circle",
        bg: "#EF6092"
    },
    {
        name: "Layout",
        route: "layout",
        icon: "grid",
        bg: "#9F897C",
        types: "5"
    },
    {
        name: "List",
        route: "list",
        icon: "lock",
        bg: "#5DCEE2",
        types: "7"
    },
    {
        name: "Picker",
        route: "picker",
        icon: "arrow-dropdown",
        bg: "#F50C75"
    },
    {
        name: "Radio",
        route: "radio",
        icon: "radio-button-on",
        bg: "#6FEA90"
    },
    {
        name: "SearchBar",
        route: "searchbar",
        icon: "search",
        bg: "#29783B"
    },
    {
        name: "Segment",
        route: "segment",
        icon: "menu",
        bg: "#AB6AED"
    },
    {
        name: "Spinner",
        route: "spinner",
        icon: "navigate",
        bg: "#BE6F50"
    },
    {
        name: "Tabs",
        route: "tab",
        icon: "home",
        bg: "#AB6AED",
        types: "2"
    },
    {
        name: "Thumbnail",
        route: "thumbnail",
        icon: "image",
        bg: "#cc0000"
    },
    {
        name: "Toast",
        route: "toast",
        icon: "albums",
        bg: "#C5F442"
    },
    {
        name: "Typography",
        route: "typography",
        icon: "paper",
        bg: "#48525D"
    }
];

//图片
const drawerCover = require("../img/drawer-cover.png");
const drawerImage = require("../img/logo-kitchen-sink.png");
const logo = require("../img/logo400_160.png");

@inject("mainDrawerStore")
@observer
class SideBar extends Component {

    @action
    chooseItem(routeName) {
        if (routeName === "list" || routeName === "dynamicList") {
            //关闭drawer
            this.props.mainDrawerStore.setDrawerState("closed");
            //Actions.refresh({ key: "main" });
            Actions[routeName]();
        } else {
            alert(routeName);
        }
    }

    render() {

        return (
            <Container>
                <Content
                    style={ sideBarContent }
                >
                    <Image source={ drawerCover } style={ styles.drawerCover }>
                        <Image
                            square
                            style={ styles.drawerImage }
                            source={ logo }
                        />
                    </Image>
                    <List
                        dataArray={ datas }
                        renderRow={ data => (
                            <ListItem
                                button
                                noBorder
                                onPress={ () => this.chooseItem(data.route) }
                            >
                                <Left>
                                    <Icon active name={ data.icon } style={ sideBarIcon.icon1 } />
                                    <Text style={ sideBarText.text }>{ data.name }</Text>
                                </Left>
                                { (data.types) &&
                                    <Right style={{ flex: 1 }}>
                                        <Badge
                                            style={{ borderRadius: 3, height: 25, width: 72, backgroundColor: data.bg }}
                                        >
                                            <Text style={ sideBarText.badgeText }>{ data.types } Types</Text>
                                        </Badge>
                                    </Right>
                                }
                            </ListItem>
                        ) }
                    />
                </Content>
            </Container>
        );
    }
}

export default SideBar;