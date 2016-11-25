let cheerio = require('cheerio');

module.exports = function(content) {
  // flag as cachable
  this.cacheable();

  // get the query (settings) as object
  var query = JSON.parse(this.query.substr(1));

  // put the content in a dom structure
  let $ = cheerio.load(content);

  // when babel options are set - use it
  if(query.babel) {
    // get all script tags
    $('script').each(function(i, elem) {
      // get the babel-core when it is defined
      var babel = require("babel-core");
      // transform the script with babel
      var bblsrc = babel.transform($(this).text(), query.babel).code;
      // replace the script with the converted one
      $(this).text(bblsrc);
    });
  }

  // put the result into a variable
  var result = $.html();

  // when minify options are set - minify
  if(query.minify) {
    // get the minify if required
    var minify = require('html-minifier').minify;
    // minify the complete file
    result = minify(result, query.minify);
  }

  // replace all ' signs to be able to put the result into a variable
  result = result.replace(/'/g, "\\'");

  var js = `
    // function to run code, to hide the variables and
    // structure of the following code block
    function run(code, node) {
      var currentWebcomponent = node;
      eval(code);
    };

    // get the head element of the main page
    var link = document.querySelector('head');
    // create a new link element
    var element = document.createElement("link");
    // set the import attribute to it
    element.setAttribute('rel', 'import');
    // create a shadow root inside of it
    var shadow = element.createShadowRoot();
    // set the result content into the shadow root
    shadow.innerHTML = '${result}';
    // put everything into the head
    var res = link.appendChild(element);

    // get all script tags and loop over them
    var codes = shadow.querySelectorAll('script');
    for(var i=0;i<codes.length;i++)
    {
      // execute each script tag
      run(codes[i].text, shadow);
    }
  `;

  return js;
};
