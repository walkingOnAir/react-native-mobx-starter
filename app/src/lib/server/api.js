/**
 * 服务端请求封装
 * 使用fetch API 参见https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch
 * 包含promise 参见http://es6.ruanyifeng.com/#docs/promise
 * 包含async await 参见http://es6.ruanyifeng.com/#docs/async
 * Created by wangpeng on 2017/3/16.
 */

class API {

    static url = "https://api.github.com/users/walkingOnAir";
    static data = {
        header: {
            token: ""
        },
        body: {}
    };
    static init = {};

    /**
     * 获取json数据
     * get请求
     * @returns {*} Promise
     */
    static async getJSON(param) {
        try {
            const headers = new Headers(),
                  init = {
                      method: "GET",
                      headers: headers
                  },
                  url = param.url;
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            let response = await fetch(url, init);
            let json = await response.json();
            console.log(json);
            return json;
        } catch(error) {
            console.error(error);
        }
    }

    /**
     * 一般post请求
     * 注意这个方法前面有async关键字
     * @param param
     * @returns {*} Promise
     */
    static async post(param) {
        try {
            const headers = new Headers({
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                }),
                data = {
                    header: {
                        token: ""
                    },
                    body: param.data
                },
                init = {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(data)
                },
                url = param.url;
            // 注意这里的await语句，其所在的函数必须有async关键字声明
            let response = await fetch(url, init);
            let json = await response.json();
            console.log(json);
            return json;
        } catch(error) {
            console.error(error);
        }
    }

    /**
     * json类型post请求
     * @param param
     * @returns {Promise.<TResult>}
     */
    static postJSON(param) {
        const headers = new Headers({
                "Content-Type": "application/json; charset=UTF-8"
            }),
            data = {
                header: {
                    token: ""
                },
                body: param.data
            },
            init = {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            },
            url = param.url;
        return fetch(url, init)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json);
                return json;
            });
    }
}

export default API;