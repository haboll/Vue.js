

let Vue;

class Store {
    constructor(options) {
        const { strict } = options;
        const store = this;
        this.strict = strict;
        this._mutations = Object.create(null);
        this._actions = Object.create(null);
        this._wrapGetters = Object.create(null);
        this._modules = Object.create(null);
        this.getters = {};
        installModules(store, options);
        console.log(store)
        resetVm(store);
    }

    get state() {
        return this._vm._data.$$state;
    }

    set state(val) {
        console.warn("please use 'replaceState' to set state");
    }

    commit = (type, payload) => {
        // const entry = this._mutations[type];
        // if (!entry) {
        //     console.warn(`please checke the type ${type} in mutations`);
        //     return;
        // }
        // entry.forEach(handler => handler(this.state, payload));
        this._mutations[type](this.state, payload)
    }

    dispatch = (type, payload) => {
        // const entry = this._actions[type];
        // if (!entry) {
        //     console.warn(`please checke the type ${type} in actions`);
        //     return;
        // }
        // entry.forEach(handler => handler.call(this));
        console.log(this)
        this._actions[type](this, payload)
    }

}

// 规范modules 格式
function installModules(store, options, path=[]) {
    const isRoot = path.length === 0;
    const {state, getters, mutations, actions, modules, nameSpace} = options;
    const nameSpaceKey = path.length ? path.join('') : "";
    // 处理state
    if(isRoot){
        store._state = state;
    } else {
        let parent = path.slice(0, -1).reduce((memo, cur) => {
            return memo[cur];
        }, store._state);
        parent[path[path.length-1]] = state;
    }

    
    // 根据路径获取对应state， getters, 
    const local = makeLocalContext(store, path, nameSpace);
    // 处理 mutations
    
    mutations && Object.entries(mutations).forEach(([key, fn]) => {
        const pathKey = nameSpaceKey ? `${nameSpaceKey}/${key}` : key;
        store._mutations[pathKey] = (payload) => fn(local.state, payload); 
    });
    // 处理 actions
    actions && Object.entries(actions).forEach(([key, fn]) => {
        const pathKey = nameSpaceKey ? `${nameSpaceKey}/${key}` : key;
        store._actions[pathKey] = (payload) => fn.call(store, local.store, payload);
    });
    // 处理 getters
    getters && Object.entries(getters).forEach(([key, fn]) => {
        const pathKey = nameSpaceKey ? `${nameSpaceKey}/${key}` : key;
        store._wrapGetters[pathKey] = (store) => fn(local.state, local.getter, store.state, store.getters);
    });
    // 处理 递归处理module
    modules && Object.entries(modules).forEach(([key, obj]) => {
        installModules(store, obj, path.concat([key]));
    });

}

function makeLocalContext(store, path, nameSpace) {
    const local = {};
    Object.defineProperties(local, {
        state: () => nameSpace ? store._state : getNameState(store, path),
        getters: () => getNameSpaceGetters(store, path),
        store: () => ({
            dispath: store.dispatch,
            commit: store.commit,
            state: local.state,
            getters: local.getters,
            rootSate: store.state,
            rootGetters: store.getters
        })
    })
    return local;
}

function getNameState(store, path) {
    return path.reduce((memo, cur) => {
        return memo[cur];
    }, store._state)
}

function getNameSpaceGetters(store, path){
    const gettersProxy = {};
    const nameSpaceKey = path.join("/");
    Object.keys(store.getters).forEach(key => {
        if(!key.includes(nameSpaceKey)) return;
        const lastKey = key.split("/")[-1];
        Object.defineProperty(gettersProxy, lastKey, {
            get: () => store._vm[key]
        });
    })
    return gettersProxy;
}

// 实例化vue, 将getters挂载在computed属性上
function resetVm(store) {
    const computed = {};
    Object.entries(store._wrapGetters).forEach(([key, fn]) => {
        computed[key] = () => fn(store);
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        });
    });

    store._vm = new Vue({
        data: () => {
            return {
                $$state: store._state
            };
        },
        computed
    });
}

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    });
}

export default { Store, install };
