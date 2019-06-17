const babel = require('./core/babel');
const css = require('./core/css');
const scss = require('./core/scss');
const html = require('./core/html');

const vue = require('./core/vue');
const svelte = require('./core/svelte');

const apply = (config, options, pkg) => {
    [babel, css, scss, html].forEach(x => x(config, options, pkg));
    [vue, svelte].forEach(x => x(config, options, pkg));
};

module.exports = apply;