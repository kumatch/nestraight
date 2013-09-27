var expect = require('chai').expect;
var nestraight = require('../');

describe('has', function () {

    it('no nest object', function () {
        var data = {
            foo: 10
        };

        expect(nestraight.has(data, "foo")).to.be.true;
        expect(nestraight.has(data, "bar")).to.be.false;

    });

    it('nested object', function () {
        var data = {
            foo: {
                bar: {
                    baz: "OK"
                }
            }
        };

        expect(nestraight.has(data, "foo")).be.true;
        expect(nestraight.has(data, "foo.bar")).be.true;
        expect(nestraight.has(data, "foo.bar.baz")).be.true;
        expect(nestraight.has(data, "foo.bar.baz.qux")).be.false;

        expect(nestraight.has(data, "foo.bar['baz']")).be.true;
        expect(nestraight.has(data, "foo['bar']['baz']")).be.true;
        expect(nestraight.has(data, "foo['bar'].baz")).be.true;

        expect(nestraight.has(data, "foo.a")).be.false;
        expect(nestraight.has(data, "foo.a.b")).be.false;
        expect(nestraight.has(data, "foo.a.b.c")).be.false;
    });

    it('no nest array', function () {
        var data = [ 10 ];

        expect(nestraight.has(data, "0")).be.true;
        expect(nestraight.has(data, "1")).be.false;

    });

    it('nested array', function () {
        var data = [
            "level 1",
            [
                "level 2",
                [
                    "level 3"
                ]
            ]
        ];

        expect(nestraight.has(data, "0")).be.true;
        expect(nestraight.has(data, "1.0")).be.true;
        expect(nestraight.has(data, "1.1.0")).be.true;
        expect(nestraight.has(data, "1.1.1")).be.false;
        expect(nestraight.has(data, "1.1.0.0")).be.false;
    });

    it('nested object and array', function () {

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

        expect(nestraight.has(data1, "foo.1")).be.true;
        expect(nestraight.has(data1, "foo.1.bar")).be.true;
        expect(nestraight.has(data1, "foo.1.bar.baz")).be.true;
        expect(nestraight.has(data1, "foo.1.bar.baz.0")).be.true;
        expect(nestraight.has(data1, "foo.2")).be.false;
        expect(nestraight.has(data1, "foo.2.bar")).be.false;

        expect(nestraight.has(data1, "foo.0")).be.true;
        expect(nestraight.has(data1, "foo.0.0")).be.false;
        expect(nestraight.has(data1, "foo.0.0.0")).be.false;
        expect(nestraight.has(data1, "foo.0.foo")).be.false;

        expect(nestraight.has(data2, "1")).be.true;
        expect(nestraight.has(data2, "1.foo")).be.true;
        expect(nestraight.has(data2, "1.foo.1")).be.true;
        expect(nestraight.has(data2, "1.foo.1.bar")).be.true;
    });
});