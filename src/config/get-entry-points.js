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

    const entryPoints = {};
    const entryFilePath = path.join(options.root, entryFile);
    entryPoints[path.basename(entryFilePath).split('.')[0]] = entryFilePath

    return entryPoints;
}

const getEntryPointsFromHtmlFile = (options, entryFile) => {
    const html = fs.readFileSync(entryFile, { encoding: 'UTF-8'});
    const fileRoot = path.dirname(entryFile);

    const doc = cheerio.load(html);
    const files = [];
    const scripts = doc('script').each((i,s) => {
        const src = doc(s).attr('src');

        if(!src || src.startsWith('http')) {
            return;
        }

        files.push(path.join(options.root, fileRoot, src));
    });
    
    console.log(files);
    const entryPoints = {};
    files.forEach(f => entryPoints[path.basename(f).split('.')[0]] = f);
    return entryPoints;
}

module.exports = getEntryPoints;