var should = require('chai').should(),
	expect = require('Chai').expect,
    chai = require('chai'),
    sinon = require('sinon'),
    http = require('http'),
    Pushetta = require('../pushetta'),
    pushetta = new Pushetta("{API_KEY_HERE}");


describe('pushetta', function(){
	beforeEach(function() {
		this.request = sinon.stub(http, 'request');
		sinon.stub(pushetta, 'pushMessage').yields(null, true);
	});
 
	afterEach(function() {
		http.request.restore();
		pushetta.pushMessage.restore();
	});


	// Test chiamata reale
	/*describe('#pushMessage', function() {
		it('push a message', function(done){
			pushetta.pushMessage("WebPush", "hello world", function(result){
				try {
					expect(result).to.equal(true);
					done();
				}
				catch(e){
					done(e);
				}
			});
		});
	});*/

	
	describe('#pushMessage-mockup', function() {

		it('push a message parameters ok', function(done){

			pushetta.pushMessage("WebPush", "hello world", function(err, result){
				try {
					expect(result).to.equal(true);
					done();
				}
				catch(e){
					done(e);
				}
			});
		});

		it('push a message wrong parameters ', function(done){

			pushetta.pushMessage(null, "hello world", function(err, result){
				expect(result).to.equal(false);
				done();
	
			});
		});

	});
});