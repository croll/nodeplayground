module.exports.users = {
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

module.exports.pets = {
	list: function(req, res){
		res.send('user ' + req.params.uid + '\'s pets');
	},

	del: function(req, res){
		res.send('delete ' + req.params.uid + '\'s pet ' + req.params.pid);
	}
};
