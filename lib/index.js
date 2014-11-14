/*
 * component-resolve-list
 * https://github.com/frankwallis/component-resolve-list
 *
 * Copyright (c) 2014 Frank Wallis
 * Licensed under the MIT license.
 */
var path = require('path');
var resolver = require('component-resolver');
var flatten = require('component-flatten');

var fields = {
    scripts: ["scripts", "templates", "json"],
    files: ["files", "images", "fonts"],
    styles: ["styles"]
}

function scripts(options, done) {
    if (typeof(options) == 'function') {
        done = options
        options = {};
    }

    options = options || {};
    options.fields = fields.scripts;
    return resolve(options, done);
}

function files(options, done) {
    if (typeof(options) == 'function') {
        done = options
        options = {};
    }

    options = options || {};
    options.fields = fields.files;
    return resolve(options, done);
}

function styles(options, done) {
    if (typeof(options) == 'function') {
        done = options
        options = {};
    }

    options = options || {};
    options.fields = fields.styles;
    return resolve(options, done);
}

function all(options, done) {
    if (typeof(options) == 'function') {
        done = options
        options = {};
    }

    options = options || {};
    options.fields = [].concat(fields.scripts).concat(fields.files).concat(fields.styles);
    return resolve(options, done);
}

function resolve(options, done) {
    var opts = {};
    opts.verbose = true;
    opts.install = false;
    opts.development = false;

    var result = [];

    // resolve the dependency tree
    resolver(process.cwd(), opts, function (err, tree) {
        if (err) throw err;

        var branches = flatten(tree);

        branches.forEach(function(branch) {
            options.fields.forEach(function(field) {
                if (branch.node[field]) {
                    result = result.concat(branch.node[field].map(function(rel){
                        return path.join(branch.path, rel);
                    }));
                }
            })
        });
        done(result);
    });    
}

module.exports.all = all;
module.exports.files = files;
module.exports.styles = styles;
module.exports.scripts = scripts;