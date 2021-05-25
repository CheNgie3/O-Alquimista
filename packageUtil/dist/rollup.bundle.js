(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.demo = factory());
}(this, (function () { 'use strict';

	const prefix = 'prefix';

	var prefix$1 = str => `${prefix} | ${str}`;

	const suffix = 'suffix';
	console.log(123);
	var suffix$1 = str => `${str} | ${suffix}`;

	var index = str => suffix$1(prefix$1(str));

	return index;

})));
