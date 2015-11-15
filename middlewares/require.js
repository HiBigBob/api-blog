module.exports = function(req, res, next){
	if (!req.user) {
		res.status(401).json({error:'Not authorized'});
	}	else {
		next()
	}
}
