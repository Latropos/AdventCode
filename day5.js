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
        const data = fs.readFileSync('input5.txt', 'utf8')
        var input = data.trim().split("\n");
        
        var len = input.length;

        var noValidPasseports = 0;
        
        var highest_seat_id = 0;

        //TASK_1
        for (var i = 0; i<input.length; i++){
            var row_code = input[i].slice(0, 7);
            var binary_row = (row_code.replace(/F/g, 0)).replace(/B/g, 1);
            var row = parseInt(binary_row, 2);
            
            var col_code = input[i].slice(-3);
            var binary_col = (col_code.replace(/L/g, 0)).replace(/R/g, 1);
            var col = parseInt(binary_col, 2);
            
            var seat_id = row * 8 + col;
            if (highest_seat_id < seat_id) highest_seat_id = seat_id;
        }
        
        console.log(highest_seat_id);
        
        //TASK_2
        
        var seat_ids = [];
            
        for (var i = 0; i<input.length; i++){
            var row_code = input[i].slice(0, 7);
            var binary_row = (row_code.replace(/F/g, 0)).replace(/B/g, 1);
            var row = parseInt(binary_row, 2);
            
            var col_code = input[i].slice(-3);
            var binary_col = (col_code.replace(/L/g, 0)).replace(/R/g, 1);
            var col = parseInt(binary_col, 2);
            
            var seat_id = row * 8 + col;
            seat_ids.push(seat_id);
        }
        
        seat_ids.sort(function(a, b){return a-b});
        var idx = seat_ids[0];
        
        for (i in seat_ids){
            if (seat_ids[i] != idx){
                console.log(idx);
                idx = seat_ids[i];
            }
            idx ++;
        }
        
    } catch (err) {
        console.error(err)
    }

   console.log(`Server running at http://${hostname}:${port}/`);
})
 
