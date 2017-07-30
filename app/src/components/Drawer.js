/**
 * Created by wangpeng on 2017/3/22.
 */
import React, { Component } from "react";
import { inject, observer } from "mobx-react/native";
import { action, autorun } from "mobx";
import {
    Container,
    Content,
    Button,
    Text,
    Drawer
} from "native-base";
import { Actions, ActionConst, DefaultRenderer } from "react-native-router-flux";
import SideBar from "./SideBar";

@inject("mainDrawerStore")
@observer
class DrawerComponet extends Component {

     componentDidMount() {
        //自动执行drawer的open和close
        this.disposer = autorun(() => {
            if (this.props.mainDrawerStore.drawerState === "opened") {
                this._drawer._root.open();
            }
            if (this.props.mainDrawerStore.drawerState === "closed") {
                this._drawer._root.close();
            }
        });
    }

    componentWillUnmount() {
        if (this.disposer) {
            this.disposer();
        }
    }

    @action.bound
    closeDrawer() {
        this.props.mainDrawerStore.setDrawerState("closed");
    }

    render() {
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref={ (ref) => { this._drawer = ref; } }
                content={ <SideBar navigator={this._navigator} /> }
                onClose={ this.closeDrawer }
            >
                <DefaultRenderer navigationState={ children[0] } onNavigate={ this.props.onNavigate }/>
            </Drawer>
        );
    }
}

export default DrawerComponet;