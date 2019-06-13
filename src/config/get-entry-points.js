const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio')

const getEntryPoints = (options) => {
    const entryFile = options.entry.toLowerCase();

    if(!fs.existsSync(entryFile)) {
        throw 'Unable to find entry file';
    }

    if(entryFile.endsWith('.html')) {
        return getEntryPointsFromHtmlFile(options, entryFile);
    }

    return [ path.join(options.root, entryFile) ];
}

const getEntryPointsFromHtmlFile = (options, entryFile) => {

    const html = fs.readFileSync(entryFile, { encoding: 'UTF-8'});
    const fileRoot = path.dirname(entryFile);
    const doc = cheerio.load(html);
    const scripts = [].concat(doc('script').attr('src')).filter(Boolean).filter(s => !s.startsWith('http'));
    const files = scripts.map(s => path.join(options.root, fileRoot, s));
    return [ ...files ];
}

module.exports = getEntryPoints;