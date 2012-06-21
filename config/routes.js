module.exports.init = function(captain) {

	captain.app.get('/', function(req, res) {
		res.render('index', {'toto' :'yabon'});
	});

	captain.app.get('/login', function(req, res) {
		//captain.i18n.setLocale('fr');
		res.render('auth/login');
	});

	captain.app.post('/login', function(req, res) {
    var form = new captain.formidable.IncomingForm();
		form.parse(req, function(err, fields, files) {
			console.log(fields);
			console.log(files);
		});
		res.render('auth/login');
	});

};
