var app;

module.exports.init = function(expressInstance) {
	app = expressInstance;
	app.map = function(a, route){
		var route = route || '';
		for (var key in a) {
			switch (typeof a[key]) {
				case 'object':
					app.map(a[key], route + key);
					break;
				case 'function':
					console.log('%s %s', key, route);
					app[key](route, a[key]);
					break;
			}
		}
	};
};

module.exports.add = function(a, route) {
	app.map(a, route);
}
