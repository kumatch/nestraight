var expect = require('chai').expect;
var nestraight = require('../');

describe('del()', function () {

    it('should delete an attribute from a simple object', function () {
        var data = {
            foo: 10, bar: 20
        };

        nestraight.del(data, "foo");

        expect(data.foo).be.undefined;
        expect(data.bar).to.equal(20);
    });

    it('should delete attributes from a nested object', function () {
        var data = {
            foo: {
                bar: {
                    baz: "OK"
                }
            },

            qux: {
                quux: "OK"
            }
        };

        nestraight.del(data, "foo.bar.baz");
        nestraight.del(data, "qux");

        expect(data.foo).be.a('object');
        expect(data.foo.bar).be.a('object');
        expect(data.foo.bar.baz).to.be.undefined;
        expect(data.qux).to.be.undefined;

        expect(data).to.deep.equal({ foo: { bar: {} } });
    });

    it('should delete an index from a simple array', function () {
        var data = [ 10, 20 ];

        nestraight.del(data, "0");

        expect(data[0]).to.be.undefined;
        expect(data[1]).to.equal(20);
        expect(data.length).to.equal(2);
    });

    it('should delete indexes from a nested array', function () {
        var data = [
            "level 1",
            [
                "level 2",
                [
                    "level 3",
                ]
            ],

            [
                [
                    [
                        "level 4"
                    ]
                ]
            ]
        ];

        nestraight.del(data, "1.1[0]");
        nestraight.del(data, "2");

        expect(data[0]).to.equal("level 1");
        expect(data[1][0]).to.equal("level 2");
        expect(data[1][1]).to.be.a('array');
        expect(data[1][1][0]).to.be.undefined;
        expect(data[2]).to.be.undefined;
    });

    it('should delete attributes with indexes from nested object with array', function () {

        var data = {
            foo: [
                "foo level 1",
                {
                    bar: {
                        baz: [ "OK" ]
                    }
                }
            ]
        };

        nestraight.del(data, "foo[1].bar.baz.0");

        expect(data.foo[0]).to.equal('foo level 1');
        expect(data.foo[1].bar.baz).to.be.a('array');
        expect(data.foo[1].bar.baz[0]).to.be.undefined;
    });
});