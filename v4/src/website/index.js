let express = require("express");

let app = express();

app.use((req, res, next) => {
	console.log(req.method + " " + req.url);
	next();
});

app.get('/invite', (req, res) => {
   res.redirect("https://discordapp.com/oauth2/authorize?client_id=317145148901556234&scope=bot&permissions=271633518");
});

app.use(express.static(`${__dirname}/static`));

app.use("*", (req, res) => {
	res.status(404).sendFile(`${__dirname}/static/404.html`);
});

app.listen(80, (err) => {
	if (err) return throw new Error(err);
	console.log("Listening on Port 80");
});

/* Meh. Credit: https://github.com/PassTheMayo/passthemayo.space/blob/master/index.js */
