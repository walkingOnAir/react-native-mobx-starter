/**
 * Created by wangpeng on 2017/3/28.
 */
import React, { Component } from "react";
import { Image, View } from "react-native";
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
    Spinner,
    DeckSwiper,
    Card,
    CardItem,
    IconNB
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";
import { listContainer } from "../styles/common/container";

@inject("viewCardStore")
@observer
class Details extends Component {

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
                    <Title>details</Title>
                    </Body>
                    <Right />
                </Header>
                <View style={{ flex: 1, padding: 12 }}>
                    <DeckSwiper
                        dataSource={ this.props.viewCardStore.dataArray.slice() }
                        renderItem={
                                item => (
                                    <Card style={{ elevation: 3 }}>
                                        <CardItem>
                                            <Left>
                                                <Thumbnail source={ item.image } />
                                                <Body>
                                                    <Text>{ item.text }</Text>
                                                    <Text note>NativeBase</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem cardBody>
                                            <Image style={{ resizeMode: "cover", width: null, flex: 1, height: 300 }} source={item.image} />
                                        </CardItem>
                                        <CardItem>
                                            <IconNB name={ "ios-heart" } style={{ color: "#ED4A6A" }} />
                                                <Text>{ item.name }</Text>
                                        </CardItem>
                                    </Card>
                                )
                            }
                    />
                </View>
            </Container>
        );
    }
}

export default Details;