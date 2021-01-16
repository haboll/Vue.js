


class Modules {

}


class ModuleCollection {
    constructor(rawModules) {
        this.rawModules = rawModules;
        registerModules(this, rawModules, []);
    }
}


function registerModules(root, rawModules, path = []) {
    if(path.length === 0) {
        root._isRoot = true;
    }

    
}