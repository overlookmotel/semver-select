// --------------------
// semver-select module
// Tests
// --------------------

// modules
var chai = require('chai'),
	expect = chai.expect,
	semverSelect = require('../lib/');

// init
chai.config.includeStack = true;

// tests

/* jshint expr: true */
/* global describe, it */

var example = {
	monkey: {
		'^1.0.0': 'v1',
        '1.0.0 - 2.x.x': 'v2',
        '*': 'other'
	},
	dinosaur: {
		'^1.0.0': 'ver1',
		'^2.0.0': 'ver2'
	}
};

describe('semverSelect()', function() {
	it('matches correct version', function() {
		var result = semverSelect('1.0.2', example.monkey);
		expect(result).to.equal('v1');

		result = semverSelect('2.0.2', example.monkey);
		expect(result).to.equal('v2');

		result = semverSelect('3.0.2', example.monkey);
		expect(result).to.equal('other');
	});

	it('returns undefined if no match', function() {
		var result = semverSelect('3.0.2', example.dinosaur);
		expect(result).to.be.undefined;
	});
});

describe('semverSelect.object()', function() {
	it('matches correct version for all attributes', function() {
		var result = semverSelect.object('1.0.2', example);
		expect(result).to.deep.equal({
			monkey: 'v1',
			dinosaur: 'ver1'
		});

		result = semverSelect.object('2.0.2', example);
		expect(result).to.deep.equal({
			monkey: 'v2',
			dinosaur: 'ver2'
		});
	});

	it('returns undefined if no match', function() {
		var result = semverSelect.object('3.0.2', example);
		expect(result).to.deep.equal({
			monkey: 'other',
			dinosaur: undefined
		});
	});
});
