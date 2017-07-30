/**
 * Created by wangp on 2017/4/13.
 */
import api from "../../lib/server/api";
import { AppStorage } from "../../lib/storage";
import { ACCOUNT } from "../../config";
import {RESPONSE_CODE_ERROR} from "../../constants/validation/serviceValidation";

class AccountService {
    static async login(data) {
        const url = `${ACCOUNT}/public/public/login`;
        let apiJson = await api.post({
            url: url,
            data
        });
        if (apiJson.code === 1) {
            //保存userInfo
            AppStorage.addOne("userInfo", apiJson.userinfo);
        } else {
            throw new Error(apiJson.message);
        }
        return apiJson;
    }
}

export default AccountService;