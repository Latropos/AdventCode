const http = require("http");

const hostname = "127.0.0.1";
const port = 8000; 

const server = http.createServer((req, res) => {

   // Set the response HTTP header with HTTP status and Content type
    res.setHeader('Content-Type', 'text/plain');
    res.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body "Hello World"
    res.end('Hello World\n');

});

server.listen(port, hostname, () => {
    const fs = require('fs');

    try {
        const data = fs.readFileSync('input2.txt', 'utf8')
        var input = data.split("\n");
        
        var len = input.length;
        var noValidPasswords = 0;

        //TASK_1

    
        for (var i = 0; i<len-1; i++){
            var rule = input[i].split(":")[0];
            var passwd = input[i].split(":")[1];
            
            var rule_letter = (rule.trim()).split(" ")[1];
            var rule_nums = (rule.trim()).split(" ")[0];
            
            var rule_min = rule_nums.split("-")[0];
            var rule_max = rule_nums.split("-")[1];
            
            var occurences = passwd.split(rule_letter).length - 1;
            
            if (occurences <= rule_max && occurences >= rule_min) {
                    noValidPasswords ++;
            }        
        }
        console.log(noValidPasswords);

            
        //TASK_2
        var noValidPasswords = 0;
        
            for (var i = 0; i<len-1; i++){
                
                var rule = input[i].split(':')[0];
                var passwd = input[i].split(':')[1];
                
                var rule_letter = (rule.trim()).split(" ")[1];
                var rule_nums = (rule.trim()).split(" ")[0];
                
                var rule_dig1 = rule_nums.split("-")[0];
                var rule_dig2 = rule_nums.split("-")[1];
                        
                if ((passwd[rule_dig1] == rule_letter && passwd[rule_dig2] != rule_letter) ||
                    (passwd[rule_dig1] != rule_letter && passwd[rule_dig2] == rule_letter)) {
                        noValidPasswords ++;
                }        
            }
            console.log(noValidPasswords);
    
        
    } catch (err) {
        console.error(err)
    }
        
 //  console.log(`Server running at http://${hostname}:${port}/`);
})



