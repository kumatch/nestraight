var expect = require('chai').expect;
var nestraight = require('../');

describe('get', function () {

    it('no nest object', function () {
        var data = {
            foo: 10, bar: 20
        };

        expect(nestraight.get(data, "foo")).be.equals(data.foo);
        expect(nestraight.get(data, "bar")).be.equals(data.bar);

    });

    it('nested object', function () {
        var data = {
            foo: {
                bar: {
                    baz: "OK"
                }
            }
        };

        expect(nestraight.get(data, "foo")).be.equals(data.foo);
        expect(nestraight.get(data, "foo.bar")).be.equals(data.foo.bar);
        expect(nestraight.get(data, "foo.bar.baz")).be.equals(data.foo.bar.baz);

        expect(nestraight.get(data, "foo.bar['baz']")).be.equals(data.foo.bar.baz);
        expect(nestraight.get(data, "foo['bar']['baz']")).be.equals(data.foo.bar.baz);
        expect(nestraight.get(data, "foo['bar'].baz")).be.equals(data.foo.bar.baz);
    });

    it('no nest array', function () {
        var data = [ 10, 20 ];

        expect(nestraight.get(data, "0")).be.equals(data[0]);
        expect(nestraight.get(data, "1")).be.equals(data[1]);

    });

    it('nested array', function () {
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

        expect(nestraight.get(data, "0")).be.equals(data[0]);
        expect(nestraight.get(data, "1.0")).be.equals(data[1][0]);
        expect(nestraight.get(data, "1.1.0")).be.equals(data[1][1][0]);
        expect(nestraight.get(data, "1.1.1.0")).be.equals("OK");

        expect(nestraight.get(data, "1.1.1[0]")).be.equals("OK");
        expect(nestraight.get(data, "1.1[1][0]")).be.equals("OK");
        expect(nestraight.get(data, "1[1][1][0]")).be.equals("OK");
        expect(nestraight.get(data, "[1][1][1][0]")).be.equals("OK");
        expect(nestraight.get(data, "[1][1][1].0")).be.equals("OK");
        expect(nestraight.get(data, "[1].1[1].0")).be.equals("OK");
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

        expect(nestraight.get(data1, "foo.1.bar.baz.0")).be.equals("OK");
        expect(nestraight.get(data2, "1.foo.1.bar")).be.equals("OK");
    });


    it('nest and undefined ', function () {
        var data = {
            foo: {
                bar: [ "OK" ]
            }
        };

        expect(nestraight.get(data, "a")).to.be.undefined;
        expect(nestraight.get(data, "foo.a")).to.be.undefined;
        expect(nestraight.get(data, "foo.bar.42")).to.be.undefined;

        expect(function () { nestraight.get(data, "a.b"); }).to.throw(TypeError);
    });

});