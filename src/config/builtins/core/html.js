
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cheerio = require('cheerio');

process.noDeprecation = true;

class RemoveReferencesPlugin {
    apply (compiler) {
      compiler.plugin('compilation', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tapAsync(
          'Wacker', 
          (data, cb) => {
            const doc = cheerio.load(data.html);
           
            // remove script references
            ([].concat(doc('script'))).filter(s => s.attr('src') && !s.attr('src').startsWith('http')).forEach(s => s.remove());
            
            data.html = doc.html();
            cb(null, data)
          }
        )
      })
    }
  }
  
const apply = (config, options) => {

    if(!options.entry.endsWith(".html")) {
        config.plugins.push(new HtmlWebpackPlugin({ template: 'src/index.html', filename: 'index.html'}));
        config.plugins.push(new RemoveReferencesPlugin());

        return;            
    }

    const params = {
        template: options.entry
    };

    config.plugins.push(new HtmlWebpackPlugin(params)); 
    config.plugins.push(new RemoveReferencesPlugin());    
};
    
module.exports = apply;
