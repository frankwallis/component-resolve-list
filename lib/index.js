/*
 * component-resolve-list
 * https://github.com/frankwallis/component-resolve-list
 *
 * Copyright (c) 2014 Frank Wallis
 * Licensed under the MIT license.
 */
var resolver = require("../../component-resolve-fields");

function scripts(options, done) {
    return resolveList(resolver.scripts, options, done);
}

function files(options, done) {
    return resolveList(resolver.files, options, done);
}

function styles(options, done) {
    return resolveList(resolver.styles, options, done);
}

function all(options, done) {
    return resolveList(resolver.all, options, done);
}

function custom(options, done) {
    return resolveList(resolver.custom, options, done);
}

function resolveList(resolveFn, options, done) {

    var result = [];

    function add(file, cb) {
        result.push(file.filename);
        cb();
    }

    function end() {
        done(result);
    }

    resolveFn(options, add, end);
}

module.exports.all = all;
module.exports.files = files;
module.exports.styles = styles;
module.exports.scripts = scripts;
module.exports.custom = custom;