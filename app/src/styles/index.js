/**
 * Created by wangpeng on 2017/3/15.
 */
import { StyleSheet, Platform, Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    text: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    }
});

export const sideBarStyles = StyleSheet.create({
    sidebar: {
        flex: 1,
        backgroundColor: "#fff"
    },
    drawerCover: {
        alignSelf: "stretch",
        // resizeMode: "cover",
        height: deviceHeight / 3.5,
        width: null,
        position: "relative",
        marginBottom: 10
    },
    drawerImage: {
        position: "absolute",
        // left: (Platform.OS === "android") ? 30 : 40,
        left: (Platform.OS === "android") ? deviceWidth / 10 : deviceWidth / 9,
        // top: (Platform.OS === "android") ? 45 : 55,
        top: (Platform.OS === "android") ? deviceHeight / 13 : deviceHeight / 12,
        width: 210,
        height: 75,
        resizeMode: "cover"
    },
    listItemContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    iconContainer: {
        width: 37,
        height: 37,
        borderRadius: 18,
        marginRight: 12,
        paddingTop: (Platform.OS === "android") ? 7 : 5
    },
    sidebarIcon: {
        fontSize: 21,
        color: "#fff",
        lineHeight: (Platform.OS === "android") ? 21 : 25,
        backgroundColor: "transparent",
        alignSelf: "center"
    }
});
