let http = require('http');
let url = require('url');

const functions = {
    "+" : (a, b) => a + b,
    "-" : (a, b) => a - b,
    "*" : (a, b) => a * b,
    "/" : (a, b) => a / b
}

http.createServer((req, res) => {
    res.writeHead(
                    200, 
                    {
                     'Content-Type': 
                     'text/html', 
                     'Access-Control-Allow-Origin': '*'
                    }
    );
    let obj = url.parse(req.url, true);

    res.end(
        JSON.stringify(
                        functions[decodeURIComponent(obj.query.operator)]
                        (Number(obj.query.op1), Number(obj.query.op2))
                      )
    );
}).listen(1000);