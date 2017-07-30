/**
 * app客户端缓存
 * 使用react-native-storage库 参见https://github.com/sunnylqm/react-native-storage/blob/master/README-CHN.md
 * Created by wangpeng on 2017/3/16.
 */
import Storage from "react-native-storage";
import { AsyncStorage } from "react-native";

//在全局范围内创建一个实例，有且仅有一个实例
if (!global.appStorage) {
    global.appStorage = new Storage({
        // 最大容量，默认值1000条数据循环存储
        size: 1000,

        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: AsyncStorage,

        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires: null,

        // 读写时在内存中缓存数据。默认启用。
        enableCache: true,

        // 如果storage中没有相应数据，或数据已过期，
        // 则会调用相应的sync方法，无缝返回最新数据。
        // 你可以在构造函数这里就写好sync的方法
        // 或是写到另一个文件里，这里require引入
        // 或是在任何时候，直接对storage.sync进行赋值修改
        sync: require("./sync")
    });
}

class AppStorage {

    /**
     * 按照key添加一条缓存
     * @param key
     * @param data 需保存的数据
     * @param expires 过期时间
     */
    static addOne(key, data, expires) {
        if (key.indexOf("_") !== -1) {
            throw new Error("key中不能含有_");
        }
        const paramData = {
            key,
            data
        };
        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期
        if (typeof expires === "number") {
            paramData["expires"] = expires;
        }
        global.appStorage.save(paramData);
    }

    /**
     * 添加同key，不同id的一组数据
     * 使用key和id来保存数据，一般是保存同类别（key）的大量数据。
     * 所有这些"key-id"数据共有一个保存上限（无论是否相同key）
     * 即在初始化storage时传入的size参数。
     * 在默认上限参数下，第1001个数据会覆盖第1个数据。
     * 覆盖之后，再读取第1个数据，会返回catch或是相应的sync方法。
     * @param key
     * @param id
     * @param data
     * @param expires
     */
    static addGroup(key, id, data, expires) {
        if (key.indexOf("_") !== -1) {
            throw new Error("key中不能含有_");
        }
        if (id.indexOf("_") !== -1) {
            throw new Error("id中不能含有_");
        }
        const paramData = {
            key,
            id,
            data
        };
        // 如果不指定过期时间，则会使用defaultExpires参数
        // 如果设为null，则永不过期
        if (typeof expires === "number") {
            paramData["expires"] = expires;
        }
        global.appStorage.save(paramData);
    }

    /**
     * 根据key获取数据
     * 注意获取的过程是异步的，需要通过回调处理
     * @param key
     * @returns {*}
     */
    static async getOne(key) {
        try {
            let data = await global.appStorage.load({
                key,
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
                autoSync: false,
                // syncInBackground(默认为true)意味着如果数据过期，
                // 在调用sync方法的同时先返回已经过期的数据。
                // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: true
            });
            console.log(data);
            return data;
        } catch (err) {
            //如果没有找到数据且没有sync方法(NotFoundError)，
            //或者有其他异常(ExpiredError)，则在catch中返回
            throw err;
        }

    }

    /**
     * 根据key和id获取数据组中的一条数据
     * @param key
     * @param id
     * @returns {*}
     */
    static async getOneInGroup(key, id) {
        try {
            let data = await global.appStorage.load({
                key,
                id,
                // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
                autoSync: false,
                // syncInBackground(默认为true)意味着如果数据过期，
                // 在调用sync方法的同时先返回已经过期的数据。
                // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
                syncInBackground: true
            });
            console.log(data);
            return data;
        } catch (err) {
            //如果没有找到数据且没有sync方法(NotFoundError)，
            //或者有其他异常(ExpiredError)，则在catch中返回
            throw err;
        }
    }

    /**
     * 获取某个key下的所有id
     * @param key
     * @returns {*}
     */
    static async getAllidsByKey(key) {
        try {
            let data = await global.appStorage.getIdsForKey(key);
            console.log(data);
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * 根据key和一个id数组来批量读取数据组中的数据
     * @param key
     * @param ids
     * @returns {*} 返回一个有序数组
     */
    static async getBatchInGroup(key, ids) {
        try {
            let data = await global.appStorage.getBatchDataWithIds({
                key,
                ids
            });
            console.log(data);
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * 根据key获取某个数据组的所有数据
     * @param key
     * @returns {*}
     */
    static async getAllInGroup(key) {
        try {
            let data = await global.appStorage.getAllDataForKey(key);
            console.log(data);
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * 使用和load方法一样的参数读取批量数据，但是参数是以数组的方式提供。
     * 会在需要时分别调用相应的sync方法，最后统一返回一个有序数组。
     * @param arr [
     *             { key: 'loginState' },
     *             { key: 'checkPoint', syncInBackground: false },
     *             { key: 'balance' },
     *             { key: 'user', id: '1009' }
     *            ]
     * @returns {*}
     */
    static async getBatch(arr) {
        try {
            let data = await global.appStorage.getBatchData(arr);
            console.log(data);
            return data;
        } catch (err) {
            throw err;
        }
    }

    /**
     * 根据key删除某条数据
     * @param key
     */
    static remove(key) {
        global.appStorage.remove({
            key
        });
    }

    /**
     * 根据key和id删除数据组中的某条数据
     * @param key
     * @param id
     */
    static removeInGroup(key, id) {
        global.appStorage.remove({
            key,
            id
        });
    }

    /**
     * 根据key删除整个数据组的数据
     * @param key
     */
    static removeAllInGroup(key) {
        global.appStorage.clearMapForKey({
            key
        });
    }

    /**
     * 清空整个storage
     */
    static clear() {
        global.appStorage.clearMap();
    }
}

export default AppStorage;

