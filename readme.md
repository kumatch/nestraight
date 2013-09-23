nestraight
===========

Access nested object or array part by a straight string key.


Install
-----

    $ npm install nestraight



Usage
-----

```javascript
var nestraight = require('nestraight');

var data = {
    foo: {
        bar: 10,
    },

    list: [ 20, 30 ]
};


nestraight.get(data, "foo.bar");  // 10
nestraight.get(data, "list[0]");   // 20
nestraight.get(data, "list.1");    // 30

nestraight.set(data, "foo.baz", 40);  //  set data.foo.baz = 40
nestraight.set(data, "list[2]", 50);  //  set data.list[2] = 50
```


License
--------

Licensed under the MIT License.

Copyright (c) 2013 Yosuke Kumakura

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
