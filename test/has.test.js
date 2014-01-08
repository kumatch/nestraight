var expect = require('chai').expect;
var nestraight = require('../');

describe('has()', function () {

    describe('a simple object', function () {
        var data = {
            foo: 10
        };

        it('should be true if defined attribute', function () {

            expect(nestraight.has(data, "foo")).to.be.true;

        });

        it('should be false if undefined attribute', function () {
            expect(nestraight.has(data, "bar")).to.be.false;
        });
    });

    describe('a nested object', function () {
        var data = {
            foo: {
                bar: {
                    baz: "OK"
                }
            }
        };

        it('should be true if defined attributes', function () {

            expect(nestraight.has(data, "foo")).be.true;
            expect(nestraight.has(data, "foo.bar")).be.true;
            expect(nestraight.has(data, "foo.bar.baz")).be.true;

            expect(nestraight.has(data, "foo.bar['baz']")).be.true;
            expect(nestraight.has(data, "foo['bar']['baz']")).be.true;
            expect(nestraight.has(data, "foo['bar'].baz")).be.true;
        });

        it('should be false if undefined attributes', function () {

            expect(nestraight.has(data, "foo.bar.baz.qux")).be.false;
            expect(nestraight.has(data, "foo.a")).be.false;
            expect(nestraight.has(data, "foo.a.b")).be.false;
            expect(nestraight.has(data, "foo.a.b.c")).be.false;
        });
    });


    describe('a simple array', function () {
        var data = [ 10 ];

        it('should be true if exists index', function () {
            expect(nestraight.has(data, "0")).be.true;
        });

        it('should be false if not exists index', function () {
            expect(nestraight.has(data, "1")).be.false;
        });
    });


    describe('a nested array', function () {
        var data = [
            "level 1",
            [
                "level 2",
                [
                    "level 3"
                ]
            ]
        ];

        it('should be true if exists indexes', function () {
            expect(nestraight.has(data, "0")).be.true;
            expect(nestraight.has(data, "1.0")).be.true;
            expect(nestraight.has(data, "1.1.0")).be.true;
        });

        it('should be false if not exists indexes', function () {
            expect(nestraight.has(data, "1.1.1")).be.false;
            expect(nestraight.has(data, "1.1.0.0")).be.false;
        });
    });


    describe('a nested object with array', function () {
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

        it('should be true if exists attributes and indexes', function () {
            expect(nestraight.has(data, "foo.0")).be.true;

            expect(nestraight.has(data, "foo.1")).be.true;
            expect(nestraight.has(data, "foo.1.bar")).be.true;
            expect(nestraight.has(data, "foo.1.bar.baz")).be.true;
            expect(nestraight.has(data, "foo.1.bar.baz.0")).be.true;
        });

        it('should be false if not exists attributes and indexes', function () {
            expect(nestraight.has(data, "foo.0.0")).be.false;
            expect(nestraight.has(data, "foo.0.0.0")).be.false;
            expect(nestraight.has(data, "foo.0.foo")).be.false;

            expect(nestraight.has(data, "foo.2")).be.false;
            expect(nestraight.has(data, "foo.2.bar")).be.false;
        });
    });

    describe('a nested array with object', function () {
        var data = [
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


        it('should be true if exists attributes and indexes', function () {
            expect(nestraight.has(data, "0")).be.true;

            expect(nestraight.has(data, "1")).be.true;
            expect(nestraight.has(data, "1.foo")).be.true;
            expect(nestraight.has(data, "1.foo.1")).be.true;
            expect(nestraight.has(data, "1.foo.1.bar")).be.true;
        });

        it('should be false if not exists attributes and indexes', function () {
            expect(nestraight.has(data, "0.0")).be.false;
            expect(nestraight.has(data, "0.0.foo")).be.false;

            expect(nestraight.has(data, "0.foo")).be.false;
            expect(nestraight.has(data, "0.foo.0")).be.false;

            expect(nestraight.has(data, "1.0")).be.false;
            expect(nestraight.has(data, "1.foo.2")).be.false;
            expect(nestraight.has(data, "1.foo.2.0")).be.false;
            expect(nestraight.has(data, "1.foo.2.bar")).be.false;

            expect(nestraight.has(data, "2")).be.false;
            expect(nestraight.has(data, "2.0")).be.false;
            expect(nestraight.has(data, "2.0.foo")).be.false;

            expect(nestraight.has(data, "2.foo")).be.false;
            expect(nestraight.has(data, "2.foo.0")).be.false;
        });
    });
});