var users = {
	list: function(req, res){
		res.send('user list');
	},

	get: function(req, res){
		res.send('user ' + req.params.uid);
	},

	del: function(req, res){
		res.send('delete users');
	}
};

var books = {
	list: function(req, res){
		res.send('user ' + req.params.uid + '\'s books');
	},

	get: function(req, res){
		res.send('user ' + req.params.uid +'\'s book id '+req.params.pid);
	},

	del: function(req, res){
		res.send('delete ' + req.params.uid + '\'s book ' + req.params.pid);
	}
};

var os = require('os');

module.exports.routes = {
	"/" : {
		get: function(req, res) {
			res.render('index', {'platform': os.platform(), 'os': os});
		}
	},
	"/users": {
		get: users.list,
		del: users.del,
		"/:uid" : {
			get: users.get,
			"/books" : {
				get : books.list,
				"/:pid" : {
					get : books.get,
					del : books.del
				}
			}
		}
	}
}
