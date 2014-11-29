'use strict';

describe('Service: Authtoken', function () {

  // load the service's module
  beforeEach(module('jobApp'));

  // instantiate service
  var Authtoken;
  beforeEach(inject(function (_Authtoken_) {
    Authtoken = _Authtoken_;
  }));

  it('should do something', function () {
    expect(!!Authtoken).toBe(true);
  });

});
