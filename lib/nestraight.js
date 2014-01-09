var isArray  = require('lodash.isarray');
var isObject = require('lodash.isobject');

exports.get = get;
exports.has = has;
exports.set = set;
exports.del = del;

function get (object, key) {
    var keys = createKeyParts(key);
    var value = object;

    for (var i = 0, len = keys.length; i < len; i++) {
        if (isArray(value) || isObject(value)) {
            value = value[ keys[i] ];
        } else {
            value = undefined;
        }
    }

    return value;
};

function has (object, key) {
    return (typeof get(object, key) !== 'undefined');
};

function set (object, key, value) {
    var keys = createKeyParts(key);
    var last = keys.pop();
    var base = object;
    var part, next;

    for (var i = 0, len = keys.length; i < len; i++) {
        part = normalizeKey(keys[i]);

        if (i === (len - 1)) {
            next = normalizeKey(last);
        } else {
            next = normalizeKey(keys[i + 1]);
        }

        if (typeof next === 'number') {
            if (!isArray(base[part])) {
                base[part] = [];
            }
        } else {
            if (typeof base[part] !== 'object') {
                base[part] = {};
            }
        }

        base = base[part];
    }

    base[last] = value;
}

function del (object, key) {
    var keys = createKeyParts(key);
    var last = keys.pop();
    var prev_value = object;

    if (keys.length) {
        prev_value = get(object, keys.join('.'));
    }

    if (isObject(prev_value) || isArray(prev_value)) {
        delete prev_value[ normalizeKey(last) ];
    }
}


function createKeyParts(key) {
    var string_key = (typeof key === 'string') ? String(key).trim() : "";

    return string_key.replace(/\[[\s]*["']?[\s]*([\w]+)[\s]*["']?[\s]*\]/g, '.$1')
        .replace(/^[\.]*/, '')
        .replace(/[\.]*$/, '')
        .split('.');
}

function normalizeKey (key) {
    if ((key + '').match(/^[0-9]+$/)) {
        return Number(key);
    } else {
        return key;
    }
}