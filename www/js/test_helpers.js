function _getQ() {
    var $q;
    inject(function(_$q_) {
        $q = _$q_;
    });

    return $q;
}

function _getHttpBackend() {
    var $httpBackend;
    inject(function(_$httpBackend_) {
        $httpBackend = _$httpBackend_;
    });
    
    return $httpBackend;
}

function _getRootScope() {
    var $rootScope;
    inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
    });
    return $rootScope;
}

function _get() {
    var $rootScope;
    inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
    });
    return $rootScope;
}

function _deferred() {
    return _getQ().defer();
}

function resolved(value) {
    var def = _deferred();
    def.resolve(value);
    return def.promise;
}

function rejected(value) {
    var def = _deferred();
    def.reject(value);
    return def.promise;
}

function flush() {
    _getHttpBackend().flush();
}

function digest() {
    _getRootScope().$digest();
}
