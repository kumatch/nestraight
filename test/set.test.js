var expect = require('chai').expect;
var nestraight = require('../');

describe('set', function () {

    it('no nest object', function () {
        var data = {
            foo: 10
        };

        nestraight.set(data, "bar", 20);
        nestraight.set(data, "baz", 30);

        expect(data.foo).be.equal(10);
        expect(data.bar).be.equal(20);
        expect(data.baz).be.equal(30);

        nestraight.set(data, "foo", 40);

        expect(data.foo).be.equal(40);
        expect(data.bar).be.equal(20);
        expect(data.baz).be.equal(30);
    });

    it('nested object', function () {
        var data = {
            foo: {
                bar: {
                    baz: 10
                }
            }
        };

        nestraight.set(data, "foo.bar.qux", 20);
        nestraight.set(data, "a.b.c", 30);

        expect(data.foo.bar.baz).be.equal(10);
        expect(data.foo.bar.qux).be.equal(20);
        expect(data.a.b.c).be.equal(30);

        nestraight.set(data, "a.b", 40);

        expect(data.a.b).be.equal(40);
        expect(data.a.b.c).be.an('undefined');
    });

    it('no nest array', function () {
        var data = [ 10 ];

        expect(data.length).be.equal(1);

        nestraight.set(data, "1", 20);

        expect(data.length).be.equal(2);
        expect(data[0]).be.equal(10);
        expect(data[1]).be.equal(20);

    });

    it('nested array', function () {
        var data = [
            "level 1",   // 0
            [
                "level 2",  // 1.0
                [
                    "level 3"  // 1.1.0
                ]
            ]
        ];

        nestraight.set(data, "2", 10);
        nestraight.set(data, "1.2", 20);
        nestraight.set(data, "[1][3]", 30);
        nestraight.set(data, "1.1.1", 40);
        nestraight.set(data, "1[1].2", 50);

        expect(data[0]).be.equal("level 1");
        expect(data[1][0]).be.equal("level 2");
        expect(data[1][1][0]).be.equal("level 3");

        expect(data[2]).be.equal(10);
        expect(data[1][2]).be.equal(20);
        expect(data[1][3]).be.equal(30);
        expect(data[1][1][1]).be.equal(40);
        expect(data[1][1][2]).be.equal(50);

        nestraight.set(data, "[1][1]", 60);

        expect(data[1][1]).be.equal(60);
    });
});