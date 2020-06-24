#Intro
This project is meant to be a general purpose starting point for a web server running 
Node.js. You can get up and running with your project right away by following the steps
in the quick start section, but I've also included a detailed overview of the code so that
someone new can learn how a node server works and how the different pieces interact with each
other. 

#Quick Start
##Pre-Requisites and instructions for running
Regardless of what you're trying to do, you'll need to download [Node](https://nodejs.org/en/), 
navigate to the root
directory of the project and run `npm install`. This only needs to be done once unless
you install other dependencies. 

Every time you want to run everything locally you'll need to have two terminals open. One
should run `npm run start` to run the server, and one should run `npm run build` to have
Webpack build the Javascript files.

##I Just want to run Javascript in an HTML page
This project is set up so that the file `pages/index.html` will run on your localhost at 
`http://localhost:3000`. As long as `npm run build` is running in a terminal, everything is
setup so that changes you make to `source/js/index.js` will automatically be built and
put in the correct place. You should be able to make changes to `source/js/index.js` and 
refresh the page immediately to see the results.

##I Just want to run server code
The entry point is `server.js`. If you make any server changes you will need to stop and
re-run `npm run start`.

#Detailed Information

##The `node_modules` folder
When you run `npm install` node downloads all the dependencies needed for the project
and puts them here. Since node recursively downloads all the dependencies, this folder 
can get pretty big.

![densest objects in the universe - node_modules](https://i.imgur.com/lrgCHVu.jpg)

##The `pages` folder
There's nothing special about this folder either I just like to have all my HTML files in
one place so it's easy what pages exist.

###`index.html`
I'm assuming for this project that you know HTML and Javascript so there's not too much to
point out here. The one thing to note is the paths for `assets/style.css` and 
`build/index.js`.
In `server.js`, the `public` folder is set as a root directory, so files should be
referenced relative to that folder. 

##The `public` folder
In `server.js` we set this folder as the root folder for serving static assets. This means
we can access files in this folder by looking for files like `assets/style.css`. I'll go
over this more in the `server.js` section.

###The `public/assets` folder
There's nothing special about this folder, but in general I find it a good idea to keep
all your static assets in one place. By default I've included `style.css`, which is loaded
in `index.html`, but you can add css files, image files, or anything else you like
here. If you had a lot of assets you should probably split this folder so that different
file types are in different places.

###The `public/build` folder
When you run `npm run build`, something called [Webpack](https://webpack.js.org/) gets run
to bundle all your needed javascript code into one output file. I'll talk about webpack
a bit more in another section, but the `build` folder is where the packaged output files
are set up to get placed. 

##The `source` folder
###`js/index.js`

##The root folder
###.browserslistrc
Webpack is configured to use [Babel](https://babeljs.io/) 
to convert the Javascript we write into a version that
works on older browsers. This means we can use new Javascript features in our source code
and not have to worry about broader support, with limitations. This file tells babel what
browsers the built code will need to target. This is currently set to
`last 1 chrome version`, which means that the built file probably won't be much different
than the source version. You could change this to target back to IE11 or whatever else
you wanted to support. For more information on you options here, see
[here](https://github.com/browserslist/browserslist)

###.gitignore
This makes it so certain files won't show up in git as ready to be added so they won't
be added to source control. Right now this is set up to have some files/folders that I
generally find useful to ignore, for example the built javascript files and definitely
the `node_modules` folder. 

###babel.config.js
As mentioned under the `.browserslistrc` file description, Webpack is currently configured
to use [Babel](https://babeljs.io/). This file is pretty simple conceptually, but I find
the details pretty confusing. There's documentation 
[here](https://babeljs.io/docs/en/config-files) in case you need to make any changes but
I'll go through the entire file here.

`api.cache(true);` 

Babel needs to know how often it needs to run this config file, this line makes it so 
that babel only inits the plugins/presets once and the results are cached. If we set
`api.cache(false)` then every time a js file changes babel would re-init everything.

    const presets = [
        ["@babel/preset-env"],
    ];
    
Babel presets are basically "standard" groups of plugins for your project. `env` is 
probably what you want to use for most "vanilla" js projects, but there's also presets
for React and Typescript if you need.

    const plugins = [
        '@babel/transform-runtime'
    ];
    
Plugins are the things that actually make changes to your code. A plugin may take code with
a new Javascript feature, and output a functionally equivalent version that works on older
browsers. For an example of this with arrow functions see 
[here](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions). 
As mentioned above, our preset already contains a bunch of these. The one we're adding
`transform-runtime` helps reduce duplication in the built file, which helps lower file size.

###package.json
This file is where everything gets defined for the node package. A lot of this is
self-explanatory, so I'll only cover the more interesting parts here.

    "scripts": {
        "build": "webpack --config webpack.dev.js",
        "build:prod": "webpack --config webpack.prod.js",
        "start": "node server.js",
        "start:https": "node server.js --useHttps=true"
    }, 
Any key in the `scripts` object can be used after the `npm run` command. The values are
the actual commands that are run. This allows us to make it easier to run some more 
complicated console commands. For example, when we run `npm run build`, what we are
actually doing is running `webpack --config webpack.dev.js`. These commands should mostly
be familiar to you from the Quick Start section. 

The only difference between `npm run build`
and `npm run build:prod` is that they use slightly different webpack config files, which
will be explained under their respective sections. The main thing to remember here is that
`npm run build:prod` does not contain all the debug information, so it will be harder to
debug in your browser's debug tools but the file size will be considerably smaller that
`npm run build`. 

The difference between `npm run start` and `npm run start:https` should be fairly obvious,
`npm run start` will start your server on `http://localhost:3000` and 
`npm run start:https` will start it on `https://localhost:3000`. Note that to run the 
https version, you'll have to generate your own SSL certificate, which is a bigger topic
that I'm not going to cover here. If the certificate files are not in the root directory
then `npm run start:https` will fail. In general, the http version should be fine for
running your server locally.

`dependencies`

This is the list of all the packages the project needs to run. These are the things that
get downloaded when you do `npm install`. I won't go through what each of these does here 
because they should mostly be explained elsewhere, but if you're curious to learn more you
can always search [npm](https://www.npmjs.com/) for them.

`devDependencies`

This is the list of all the packages the project needs for development, but not necessarily
to run. For example, this may include a package that Webpack will bundle into a built file.
Since the package is bundled, the dependency itself isn't needed to actually run the project.
This mainly comes up for when you deploy the server. The computer you're deploying to would
probably only install the dependencies and not the dev dependencies.

###README.md
This is the file you're reading right now! Github will display it on the project page.

###webpack.common.js
There are two main webpack configuration files, one for development and one for production.
As you'd expect, they share some settings, so this is where the shared settings are stored.

`entry`

This is where you define the starting point for your built files. You can also specify
multiple entry points, each of which will produce their own built file.
Webpack will look at each entry point and bundle everything needed to run each one by
looking at the imports (or `require`s).

`plugins`

This is where you can specify additional things to run when compiling. The only one 
I've included is `CleanWebpackPlugin`, which will delete files out of the build folder
before building, so you always know you have a new file in there after a build. 

    output: {
        path: __dirname + '/public/build',
        filename: '[name].js'
    },
When the file gets built, the resulting file needs to get placed somewhere. This just
specifies where. One thing to note here is that `[name]` means the name of the key of the
entry point. In our case this means `index: ['./source/js/index.js']` creates a file
named `index.js`.

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            },
        }]
    }
The use part here is just telling Webpack to run [Babel](https://babeljs.io/) 
on the files. The test/exclude parts are just saying which files to be passed to babel. In
this case we're transforming javascript files that aren't in the node_modules folder. 
We don't run babel on the node_modules folder because these are from packages that we've 
downloaded, which should already be self-contained.

###webpack.dev.js
This is the config file used when running `npm run build`. The `merge(common, {. . .` 
bit just means to merge the settings from this file with the settings in the common file.
For information on the options for `mode` see 
[the docs](https://webpack.js.org/configuration/mode/). From the docs, `development` sets
`process.env.NODE_ENV = 'development'`. See 
[Devtool docs](https://webpack.js.org/configuration/devtool/) for more information on 
devtool since there are a lot of options, but basically `eval-source-map` includes debug
information in the built file. This means the resulting file is large, but it is useful
for development. `watch: true` means that when you change source files, webpack will
re-compile automatically. The re-compile should be much faster than the initial compile,
so you should be able to view your changes in browser immediately after saving your source.

###webpack.prod.js
This is the config file used when running `npm run build:prod`. See the section on the
`webpack.dev.js` for relevant documentation for the options here. `mode: 'production'` sets
`process.env.NODE_ENV = 'production'` and `devtool: 'source-map'` creates a small 
production-ready compiled file. 
[BundleAnalyzerPlugin](https://www.npmjs.com/package/webpack-bundle-analyzer) is a nice
tool for showing which packages are contributing most to the size of your compiled file.

###server.js
This is the file that could use the most explaining, so I saved it for the end.

    const argv = require('minimist')(process.argv.slice(2));
minimist just allows us to process command line arguments. This is mainly used in the 
package.json line `"start:https": "node server.js --useHttps=true"`
    
    const express = require('express');
    const app = express();
    
[Express](https://expressjs.com/) is a framework for setting up the server and server
endpoints.

    const bodyParser = require('body-parser');
This isn't currently being used, but 
[body-parser](https://www.npmjs.com/package/body-parser) 
allows you to access the parameters sent to the server in a request's body.
    
    const fs = require('fs');
    const path = require('path');
These are libraries built into node that help you to deal with file operations.
    
    let https = null;
    
    if(argv.useHttps){
       var certOptions = {
          key: fs.readFileSync(path.resolve('server.key')),
          cert: fs.readFileSync(path.resolve('server.crt'))
       };
       https = require('https').Server(certOptions, app);
    }
    else{
       https = require('http').Server(app);
    }
Generating the key and crt files is outside the scope of this writeup, but if you create
these you can run an https server instead of an http one. This is all run if you run the
`npm run start:https` command.
    
    app.set('view engine', 'html');
    app.engine('html', require('hbs').__express);
This sets the engine for rendering html. I have it set up to use 
[handlebars](https://handlebarsjs.com/), which also allows us to do templating.
    
    app.use(express.static(__dirname + '/public'));
This is alluded to a few places in this writeup, but this sets the root directory for
serving static files from the server. For example, since there is a file 
`public/assets/style.css` in our code, we can access it once the server is running by 
going to `http://localhost:3000/assets/style.css`.
    
    app.use(bodyParser.urlencoded({extended: true}));
This is just some basic configuration for body-parser, see the documentation for more info.
    
    app.get('/', function (req, res) {
       res.render(__dirname + '/pages/index.html');
    });
This is an example of an HTTP GET endpoint in express. The first parameter is the path, 
which in this case is the top page. It simply returns the `index.html` page in this case
but you can put arbitrary code here to set up more complex logic. See the 
[Express docs](https://expressjs.com/en/guide/routing.html) for more information on options
for routes.
    
    let listenPort = process.env.PORT || 3000;
This just tells the server to run on port 3000 unless there's a PORT environment variable.
    
    let server = https.listen(listenPort, function () {
       let host = server.address().address;
       let port = server.address().port;
    
       let date = new Date();
    
       console.log("App listening at http://%s:%s", host, port);
       console.log('Current Time: ' + date);
    });
Finally, This starts the server and logs some basic information on the started server to
the console. 