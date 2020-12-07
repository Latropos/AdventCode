const http = require("http");

const hostname = "127.0.0.1";
const port = 8000; 


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
        const data = fs.readFileSync('input3.txt', 'utf8')
        var input = data.split("\n");
        
        var len = input.length;

        input.sort(function(a, b){return a-b});
        var width = input[0].length;
        
        //TASK_1

        var noTrees = 0;
        var hor_idx = 0;
        
        for (var i = 0; i<len-1; i++){
        
            var object = input[i][hor_idx];
            hor_idx += 3;
            hor_idx %= width;
            
            var first = (input[i]).slice(0, hor_idx);
            var second = (input[i]).slice(hor_idx+1, width);
            
            if (object == "#" ) {
                    noTrees++;
                }
        }
        console.error(noTrees)

        
        //TASK_2
        var noTrees = 0;
        
        var hor_idx = 0;
        
        function countTrees(rigth, down) {
            var noTrees = 0;
            var i = 0;
            var hor_idx = 0;
            
            while (i<len-1){
                var object = input[i][hor_idx];
                if (object == "#" ) 
                    noTrees++;
                i += down;
                hor_idx += rigth;
                hor_idx %= width;        
            }
            
            return noTrees;
        }
        
        var slope11 = countTrees(1,1);
        var slope31 = countTrees(3,1);
        var slope51 = countTrees(5,1);
        var slope71 = countTrees(7,1);
        var slope12 = countTrees(1,2);
        
        console.log(slope11*slope31*slope51*slope71*slope12);    

        
    } catch (err) {
        console.error(err)
    }
        
   console.log(`Server running at http://${hostname}:${port}/`);
})
