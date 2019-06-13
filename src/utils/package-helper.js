
const hasDependency = (pkg, name) => {
    if(!pkg) {
        return false;
    }

    if(pkg.dependencies && pkg.dependencies[name]) {
        return true;
    }

    if(pkg.devDependencies && pkg.devDependencies[name]) {
        return true;
    }

    return false;
}

module.exports = {
    hasDependency
};