/**
 * Created by wangpeng on 2017/3/23.
 */
import { Platform } from "react-native";

export const sideBarText = {
    text: {
        fontWeight: (Platform.OS === "ios") ? "500" : "400",
        fontSize: 16,
        marginLeft: 20
    },
    badgeText: {
        fontSize: (Platform.OS === "ios") ? 13 : 11,
        fontWeight: "400",
        textAlign: "center",
        marginTop: (Platform.OS === "android") ? -3 : undefined
    }
};