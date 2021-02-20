const http=require("http");
const path=require("path");
const fs=require("fs");
const { type } = require("os");

const server=http.createServer( (req,res)  => {
    let fPath=path.join(
        __dirname,
        'TravCrash',
        req.url==='/' ? 'index.html' : req.url);
        let extname=path.extname(fPath);
        let cType='text/html';

    
    switch (extname) {
        
        case '.js':
            cType='text/javascript';
            break;
        case '.css':
            cType='text/css';
            break;
        case '.json':
            cType='application/json';
            break;
        case '.jpg':
            cType='image/jpg';
            break;
         case '.png':
            cType='image/png';
            break;           
    }

    fs.readFile(fPath, (err, content) => {
        if(err) {
            if(err.code=='ENOENT') { //Page not found
                fs.readFile(path.join(__dirname,'TravCrash','pnp.html'), (err,content) => {
                    res.writeHead(200,{'Content-Type':'text/html'})
                    res.end(content,'utf8')
                })
            }else {
                res.writeHead(500)
                res.end(`Server error: ${err.code}`)
            }
        } else {
            res.writeHead(200,{'Content-Type':cType})
            res.end(content, 'utf8')
        }
    })
})

const p=process.env.port || 5000
server.listen(p, () => {
     console.log("Server is listening ->",p)
})