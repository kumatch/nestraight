var expect = require('chai').expect;
var nestraight = require('../');

describe('get()', function () {

    it('should get a value from a simple object', function () {
        var data = {
            foo: 10, bar: 20
        };

        expect(nestraight.get(data, "foo")).to.equal(data.foo);
        expect(nestraight.get(data, "bar")).to.equal(data.bar);

    });

    it('should get a value from a nested object', function () {
        var data = {
            foo: {
                bar: {
                    baz: "OK"
                }
            }
        };

        expect(nestraight.get(data, "foo")).to.equal(data.foo);
        expect(nestraight.get(data, "foo.bar")).to.equal(data.foo.bar);
        expect(nestraight.get(data, "foo.bar.baz")).to.equal(data.foo.bar.baz);

        expect(nestraight.get(data, "foo.bar['baz']")).to.equal(data.foo.bar.baz);
        expect(nestraight.get(data, "foo['bar']['baz']")).to.equal(data.foo.bar.baz);
        expect(nestraight.get(data, "foo['bar'].baz")).to.equal(data.foo.bar.baz);
    });

    it('should get a value from a simple array', function () {
        var data = [ 10, 20 ];

        expect(nestraight.get(data, "0")).to.equal(data[0]);
        expect(nestraight.get(data, "1")).to.equal(data[1]);

    });

    it('should get a value from a nested array', function () {
        var data = [
            "level 1",
            [
                "level 2",
                [
                    "level 3",
                    [ "OK" ]
                ]
            ]
        ];

        expect(nestraight.get(data, "0")).to.equal(data[0]);
        expect(nestraight.get(data, "1.0")).to.equal(data[1][0]);
        expect(nestraight.get(data, "1.1.0")).to.equal(data[1][1][0]);
        expect(nestraight.get(data, "1.1.1.0")).to.equal("OK");

        expect(nestraight.get(data, "1.1.1[0]")).to.equal("OK");
        expect(nestraight.get(data, "1.1[1][0]")).to.equal("OK");
        expect(nestraight.get(data, "1[1][1][0]")).to.equal("OK");
        expect(nestraight.get(data, "[1][1][1][0]")).to.equal("OK");
        expect(nestraight.get(data, "[1][1][1].0")).to.equal("OK");
        expect(nestraight.get(data, "[1].1[1].0")).to.equal("OK");
    });

    it('should get a value from a nested object with array', function () {

        var data1 = {
            foo: [
                "foo level 1",
                {
                    bar: {
                        baz: [ "OK" ]
                    }
                }
            ]
        };

        var data2 = [
            "level 1",
            {
                foo: [
                    "level 2",
                    {
                        bar: "OK"
                    }
                ]
            }
        ];

        expect(nestraight.get(data1, "foo.1.bar.baz.0")).to.equal("OK");
        expect(nestraight.get(data2, "1.foo.1.bar")).to.equal("OK");
    });


    it('should get an undefined value if use undefined attributes on object', function () {
        var data = {
            foo: {
                bar: [ "OK" ]
            }
        };

        expect(nestraight.get(data, "foo.a")).to.be.undefined;
        expect(nestraight.get(data, "foo.bar.42")).to.be.undefined;
        expect(nestraight.get(data, "a")).to.be.undefined;
        expect(nestraight.get(data, "a.b")).to.be.undefined;
        expect(nestraight.get(data, "a.b.c")).to.be.undefined;
    });

});