const chai = require('chai');
const chaienzyme = require('chai-enzyme');
const {expect} = chai;
chai.use(chaienzyme());

describe('this is a test', () => {
	it('test1', ()=>{
		expect(true).to.equal(true);
	});
});
