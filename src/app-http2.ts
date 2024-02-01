import http2 from "http2";
import fs from "fs";

const server = http2.createSecureServer({
    key: fs.readFileSync("./keys/server.key") ,
    cert: fs.readFileSync("./keys/server.crt")
}, (req, res) => {
    console.log(req.url);

    /*res.writeHead(200, {"Content-type": "text/html"});
    res.write("<h1> Sitio web en progreso...</h1>");
    res.write(`<h3> Url: ${req.url} </h3>`)
    res.end();*/

    /*const data = {name: "Antonio", age: "20", city: "Lima"}
    res.writeHead(200, {"Content-type": "application/json"}) //format Json
    res.end(JSON.stringify(data));*/

    if (req.url === "/") {
        const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
        res.writeHead(200, {"Content-type": "text/html"});
        res.end(htmlFile);
        return;
    };
    
    if (req.url?.endsWith(".js")) {
        res.writeHead(200, {"Content-type": "application/javascript"});
    } else if (req.url?.endsWith(".css")){
        res.writeHead(200, {"Content-type": "text/css"});
    }

    try {
        const resContent = fs.readFileSync(`./public${req.url}`, "utf-8");
        res.end(resContent);
    } catch (error) {
        res.writeHead(404, {"Content-type": "text/html"}) //format Json
        res.end(    );
    }
    
});

server.listen(8080, () => {
    console.log("Server running on port 8080");
});