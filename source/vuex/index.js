let Vue;

class Store {
    constructor(options) {
        const { state, mutations, actions, getters, modules, strict } = options;
        this.strict = strict;
        this._mutations = mutations;
        this._actions = actions;
        this._wrapGetters = Object.create(null);
        this._modules = modules;
        this.getters = Object.create(null);
        resetVm(this, state, getters);
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

function resetVm(store, state, getters) {
    const computed = {};
    Object.entries(getters).forEach(([key, fn]) => {
        computed[key] = () => fn(store.state, store.getters);
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        });
    });

    store._vm = new Vue({
        data: () => {
            return {
                $$state: state
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
