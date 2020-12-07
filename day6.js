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
        const data = fs.readFileSync('input6.txt', 'utf8')
        var input = data.trim().split("\n\n");
        
        var len = input.length;
        var total = 0;

        //TASK_1
        for (var i = 0; i<input.length; i++){
            var set = new Set();
            var letters = input[i].replace(/\n/g, "").split("");
//             console.log(letters);
            for (letter of letters) set.add(letter);
            total += set.size;
        }
        console.log(total);
        
        //TASK_2
        
        var total = 0;

        for (var i = 0; i<input.length; i++){
//             console.log(input[i]);
            personal_ans = input[i].split("\n");
            var set_prev = new Set();
            
            for (idx in personal_ans) {
                var letters = personal_ans[idx].replace(/\n/g, "").split("");
                
                var new_set = new Set();
                for (letter of letters) new_set.add(letter);
              
                if (idx > 0) 
                    var new_set = new Set([...new_set].filter(x => set_prev.has(x))); //intersection
                
                set_prev = new_set;
//                 console.log(new_set);           
            }
            total += new_set.size;
        }
        console.log(total);
    } catch (err) {
        console.error(err)
    }

   console.log(`Server running at http://${hostname}:${port}/`);
})
 
