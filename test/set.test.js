var expect = require('chai').expect;
var nestraight = require('../');

describe('set()', function () {

    describe('a simple object', function () {
        var data;

        beforeEach(function () {
            data = {
                foo: 10
            };
        });

        it('should set a value by new attributes', function () {

            nestraight.set(data, "bar", 20);
            nestraight.set(data, "baz", 30);

            expect(data.foo).to.equal(10);
            expect(data.bar).to.equal(20);
            expect(data.baz).to.equal(30);
        });

        it('should set a value by a exists attribute', function () {
            nestraight.set(data, "foo", 20);

            expect(data.foo).to.equal(20);
        });
    });


    describe('a nested object', function () {
        var data;

        beforeEach(function () {
            data = {
                foo: {
                    bar: {
                        baz: 10
                    }
                }
            };
        });


        it('should set a value by new attributes', function () {
            nestraight.set(data, "foo.bar.qux", 20);
            nestraight.set(data, "a.b.c", 30);

            expect(data.foo.bar.baz).to.equal(10);
            expect(data.foo.bar.qux).to.equal(20);
            expect(data.a.b.c).to.equal(30);
        });

        it('should set a value by exists attribute', function () {
            expect(data.foo.bar.baz).to.equal(10);

            nestraight.set(data, "foo.bar.baz", 20);

            expect(data.foo.bar.baz).to.equal(20);

            nestraight.set(data, "foo.bar", 30);

            expect(data.foo.bar).to.equal(30);
            expect(data.foo.bar.baz).to.be.undefined;
        });
    });


    describe('a simple array', function () {
        var data;

        beforeEach(function () {
            data = [ 10 ];
        });


        it('should set a value by new index', function () {
            expect(data.length).to.equal(1);

            nestraight.set(data, "1", 20);

            expect(data[0]).to.equal(10);
            expect(data[1]).to.equal(20);
            expect(data.length).to.equal(2);
        });

        it('should set a value by exists index', function () {
            expect(data.length).to.equal(1);

            nestraight.set(data, "0", 20);

            expect(data[0]).to.equal(20);
            expect(data.length).to.equal(1);
        });
    });


    describe('a nested array', function () {
        var data;

        beforeEach(function () {
            data = [
                "level 1",   // 0
                [
                    "level 2",  // 1.0
                    [
                        "level 3"  // 1.1.0
                    ]
                ]
            ];
        });


        it('should set a value by new index', function () {
            expect(data[0]).to.equal("level 1");
            expect(data[1][0]).to.equal("level 2");
            expect(data[1][1][0]).to.equal("level 3");

            nestraight.set(data, "2", 10);
            nestraight.set(data, "1.2", 20);
            nestraight.set(data, "[1][3]", 30);
            nestraight.set(data, "1.1.1", 40);
            nestraight.set(data, "1[1].2", 50);

            expect(data[0]).to.equal("level 1");
            expect(data[1][0]).to.equal("level 2");
            expect(data[1][1][0]).to.equal("level 3");

            expect(data[2]).to.equal(10);
            expect(data[1][2]).to.equal(20);
            expect(data[1][3]).to.equal(30);
            expect(data[1][1][1]).to.equal(40);
            expect(data[1][1][2]).to.equal(50);
        });

        it('should set a value by exists index', function () {
            expect(data[0]).to.equal("level 1");
            expect(data[1][0]).to.equal("level 2");
            expect(data[1][1][0]).to.equal("level 3");

            nestraight.set(data, "0", "foo");

            expect(data[0]).to.equal("foo");
        });
    });
});