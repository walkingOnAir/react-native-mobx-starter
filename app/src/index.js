/**
 * Created by wangpeng on 2017/3/15.
 */
import React, { Component } from "react";
import { Provider } from "mobx-react/native";
import { Scene, Router, Actions, Reducer, Modal } from "react-native-router-flux";
import { useStrict } from "mobx";
import {
    LoginStore,
    UserInfoStore,
    MainDrawerStore,
    MainTabStore,
    ListStore,
    ViewCardStore
} from "./store";
import Login from "./components/Login";
import Main from "./components/Main";
import Drawer from "./components/Drawer";
import List from "./components/List";
import Spinner from "./components/Spinner";
import Details from "./components/Details";
import DynamicList from "./components/DynamicList";
//加载storage
import "./lib/storage";

useStrict(true);

const loginStore = new LoginStore();
const userInfoStore = new UserInfoStore();
const mainDrawerStore = new MainDrawerStore();
const mainTabStore = new MainTabStore();
const listStore = new ListStore();
const viewCardStore = new ViewCardStore();

class App extends Component {

    render() {
        return (
            <Provider
                loginStore={ loginStore }
                userInfoStore={ userInfoStore }
                mainDrawerStore={ mainDrawerStore }
                mainTabStore={ mainTabStore }
                listStore={ listStore }
                viewCardStore={ viewCardStore }
            >
                <Router>
                    <Scene key="modal" component={ Modal }>
                        <Scene key="root" hideNavBar hideTabBar>
                            <Scene
                                key="login"
                                initial
                                component={ Login }
                            />
                            {/*<Scene key="list" component={ List }/>*/}
                            {/*<Scene key="dynamicList" component={ DynamicList }/>*/}
                            {/*<Scene key="details" component={ Details }/>*/}
                            {/*<Scene*/}
                                {/*key="main"*/}
                                {/*component={ Drawer }*/}
                            {/*>*/}
                                {/*<Scene key="mainContent" component={ Main }/>*/}
                            {/*</Scene>*/}
                        </Scene>
                        {/*<Scene key="spinner" component={ Spinner } />*/}
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default App;