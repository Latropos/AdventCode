const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

function searchFor (len, searched, input) {
    _from = 0;
    _to = len;
    while(_to - _from > 1){
        var _md = Math.floor((_from + _to)/2);
        
        if (input[_md] == searched){
            return[_md]
            break
        }
        else if (input[_md] > searched){
            _to = _md;
        }
        else _from = _md;
    }
    return -1;
}

// Create HTTP server 
const server = http.createServer((req, res) => {

   // Set the response HTTP header with HTTP status and Content type
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body "Hello World"
    res.end('Hello World\n');

});

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
    const fs = require('fs');

    try {
        const data = fs.readFileSync('input1.txt', 'utf8')
        var input = data.split("\n");
        
        var len = input.length;

        input.sort(function(a, b){return a-b});

        //TASK_1
        var output1;

        for (var i = 0; i<len; i++){
            var searched = 2020 - input[i];

    
            var _from = 0; var _to = len;
            if (searchFor(len, searched, input)!= -1) {
                output1 = input[searchFor(len, searched, input)] * input[i];
            }
        }
        console.log(output1);
        
        //TASK_2
        var output2;
        console.log(len);

        for (var i = 0; i<len; i++){
            var first = input[i];
            for (var j = i; j<len; j++){
                var second = input[j];
                //if (first + second > 2020) break;
                searched = 2020 - input[i] - input[j];
                if (searched < 0) break;
                
                if (searchFor(len, searched, input)!= -1) {
                    output2 = input[searchFor(len, searched, input)] * input[i] * input[j];
                }               
            }
        }
        console.log(output2);
        
    } catch (err) {
        console.error(err)
    }
        
   console.log(`Server running at http://${hostname}:${port}/`);
})


