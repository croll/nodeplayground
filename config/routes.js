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

	del: function(req, res){
		res.send('delete ' + req.params.uid + '\'s book ' + req.params.pid);
	}
};

module.exports.routes = {
	"/users": {
		get: users.list,
		del: users.del,
		"/:uid" : {
			get: users.get,
			"/books" : {
				get : books.list,
				"/:pid" : {
					get : books.del
				}
			}
		}
	}
}
