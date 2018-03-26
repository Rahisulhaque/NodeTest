// ***************************************************************************************** //
//                                                                                           //
//                                                                                           //
//   server.js                                                       __    _            __   //
//                                                       _________ _/ /_  (_)______  __/ /   //
//   By: rahisul <rahisul@icloud.com>                   / ___/ __ `/ __ \/ / ___/ / / / /    //
//                                                     / /  / /_/ / / / / (__  ) /_/ / /     //
//   Created: 2018/03/25 23:01:25 by rahisul          /_/   \__,_/_/ /_/_/____/___,_/_/      //
//   Updated: 2018/03/25 23:42:52 by rahisul                                                 //
//                                                                                           //
// ***************************************************************************************** //

var http = require("http");
var path = require("path");
var url = require("url");
var fs = require("fs");


//This all above are node modules we need. Now we gonna work about fileExtention

var file_extension_type = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg"  : "image/jpg",
	"png"  : "image/png",
	"js"   : "text/javascript",
	"css"  : "text/css"
};

http.createServer((req, res)=>{
	var uri = url.parse(req.url).pathname;
	var filename = path.join(process.cwd(), unescape(uri));

	console.log('Loading ' + uri);

	var status;
	try
	{
		status = fs.lstatSync(filename);
	}
	catch(e)
	{
		res.writeHead(404,{ 'Content-type' : 'text/plain'});
		res.write('404 NOt found');
		res.end();
		return;
	}

	if(status.isFile())
	{
		var file_extension_type = file_extension_type[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200, {"Content-type": file_extension_type});

		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	}
	else if(status.isDirectory())	
	{	
		res.writeHead(302, {"Location" : 'index.html'});
	}
	else
	{
		res.writeHead(500, {"Content-type": "text/plain"});
		res.write("500 internal error");
		res.end();
	}
}).listen(3000);
				
