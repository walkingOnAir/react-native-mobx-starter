/**
 * Created by wangpeng on 2017/4/27.
 */
import React, {Component} from "react";
import {ListView, Text, RefreshControl} from "react-native";
import {action, computed, isObservable} from "mobx";
import {observer} from "mobx-react/native";
import {Container, Content, Left, Header, Body, Right, Title, Icon, Button, Spinner} from "native-base";
import {Actions, ActionConst} from "react-native-router-flux";
import {listContainer} from "../styles/common/container";
import DynamicListStore from "../store/main/DynamicListStore";

@observer
class DynamicList extends Component {

    dynamicListStore = new DynamicListStore();

    constructor() {
        super();
        this.state = {
            isRefreshing: false
        };
    }

    componentWillMount() {
        this._init();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    @action.bound
    _init() {
        const arr = [];
        for (let i = 0; i < 30; i++) {
            arr.push({
                id: i + 1,
                text: "这是第" + (i + 1) + "条"
            });
        }
        this.dynamicListStore.initialList(arr);
    }

    @action.bound
    _getMoreData() {
        let len = this.dynamicListStore.list.length;
        for (let i = len; i < len + 10; i++) {
            this.dynamicListStore.list.push({
                id: i + 1,
                text: "这是第" + (i + 1) + "条"
            });
        }
    }

    @action.bound
    onRefresh() {
        this.dynamicListStore.listLoadingStatus = false;
        this._init();
        this.dynamicListStore.listLoadingStatus = true;
    };

    renderRefreshControl() {
        return (
            <RefreshControl
                refreshing={ !this.dynamicListStore.listLoadingStatus }
                onRefresh={ this.onRefresh }
                tintColor="#ddd"/>
        );
    }

    renderListRow = (data) => {
        return (
            <Text key={data.id} style={{height: 100}}>
                {data.text}
            </Text>
        );
    };

    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return <Spinner/>;
        }
        return <Text>...end...</Text>;
    };

    @action.bound
    _onEndReached() {
        this.setState({
            isRefreshing: true
        });
        this.timer = setTimeout(this._getMoreData, 1000);
    }

    render() {

        return (
            <Container style={ listContainer }>
                <Header>
                    <Left>
                        <Button transparent onPress={ () => Actions.pop() }>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>动态列表</Title>
                    </Body>
                    <Right />
                </Header>
                <ListView
                    refreshControl={ this.renderRefreshControl() }
                    removeClippedSubviews
                    onEndReachedThreshold={ 10 }
                    initialListSize={ 10 }
                    pageSize = { 10 }
                    pagingEnabled={ false }
                    scrollRenderAheadDistance={ 150 }
                    dataSource={ this.dynamicListStore.dataSource }
                    renderRow={ this.renderListRow }
                    renderFooter={ this.renderListFooter }
                    onEndReached={ this._onEndReached }
                    enableEmptySections={true}
                />
            </Container>
        );
    }
}

export default DynamicList;