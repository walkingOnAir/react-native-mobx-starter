/**
 * Created by wangpeng on 2017/3/23.
 */
import React, { Component } from "react";
import { action } from "mobx";
import { inject, observer } from "mobx-react/native";
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Left,
    Header,
    Body,
    Right,
    Title,
    Switch,
    Badge,
    Icon,
    Button,
    Text,
    Spinner
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";
import { listContainer } from "../styles/common/container";

@inject("listStore")
@observer
class ListComponent extends Component {

    componentWillMount() {
        //清空原有数据
        this.props.listStore.clearList();
        //初始化
        this.getData();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    @action.bound
    getData() {
        //加载状态
        this.props.listStore.setListLoadingStatus(false);
        //模拟异步加载数据
        this.timer = setTimeout(() => {
            this.props.listStore.getList();
            this.props.listStore.setListLoadingStatus(true);
        }, 1000);
    }

    @action.bound
    getDetails() {
        Actions.details();
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
                        <Title>List Thumbnail</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <List>
                        { this.props.listStore.list.map((data, index) => (
                            <ListItem thumbnail key={ index }>
                                <Left>
                                    <Thumbnail square size={ 55 } source={ data.img } />
                                </Left>
                                <Body>
                                    <Text>{ data.text }</Text>
                                    <Text numberOfLines={ 1 } note>{ data.note }</Text>
                                </Body>
                                <Right>
                                    <Button
                                        transparent
                                        onPress={ this.getDetails }
                                    >
                                        <Text>View</Text>
                                    </Button>
                                </Right>
                            </ListItem>
                            )) }
                        {
                            this.props.listStore.listLoadingStatus ?
                                <Button
                                    block
                                    transparent
                                    style={{ marginTop: 10 }}
                                    onPress={ this.getData }
                                >
                                    <Text>加载更多</Text>
                                </Button>
                                : <Spinner color="blue" />
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}

export default ListComponent;