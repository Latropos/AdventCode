const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

function conterOfFields(){
    var dict = {
        "byr": 0,
        "iyr": 0,
        "eyr": 0,
        "hgt": 0,
        "hcl": 0,
        "ecl": 0,
        "pid": 0,
    };
    return dict;
}

function acceptPassport(counter){
    for (var key in counter){
        if(counter[key] < 1){
            return 0;
        }
    }
    return 1;
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
        const data = fs.readFileSync('input4.txt', 'utf8')
        var input = data.split("\n\n");
        
        var len = input.length;

        var noValidPasseports = 0;

        //TASK_1
        for (var i = 0; i<len; i++){
            var fieldsInPasseport = input[i].split(/[\s\n]+/);
            var counter = conterOfFields();
                
            for (field of fieldsInPasseport){
                var fieldType = field.split(":")[0];
                counter[fieldType] ++;
            }
            
            noValidPasseports += acceptPassport(counter);  

        }
        console.log(noValidPasseports);
        
        //TASK_2
        noValidPasseports = 0;
        
        for (var i = 0; i<len; i++){
            var fieldsInPasseport = input[i].split(/[\s\n]+/);
            var counter = conterOfFields();
                
            for (field of fieldsInPasseport){
                var fieldType = field.split(":")[0];
                var value = field.split(":")[1];
                switch(fieldType){
                    case "byr":
                        var val = parseInt(value);
                        if (val >= 1920 && val <= 2002)
                            counter["byr"]++;
                        
                        //console.log(value);
                        //console.log((val >= 1920 && val <= 2002));
                        break;                        
                    case "iyr":
                        var val = parseInt(value);
                        if (val >= 2010 && val <= 2020)
                            counter["iyr"]++;
                        
                        //console.log(value);
                        //console.log((val >= 2010 && val <= 2020));
                        break;
                    case "eyr":
                        var val = parseInt(value);
                        if (val >= 2020 && val <= 2030)
                            counter["eyr"]++;
                        
                        //console.log(value);
                        //console.log((val >= 2020 && val <= 2030));
                        break;
                    case "hgt":
                        var unit = value.slice(-2);
                        var measure = parseInt(value.slice(0, value.length-2));
                        //console.log(value);
                    
                        if (unit == "cm"){
                            if (measure >= 150 && measure <= 193){
                                counter["hgt"]++;
                                //console.log(true);
                            }
                        }
                        else if (unit == "in"){
                            if (measure >= 59 && measure <= 76){
                                counter["hgt"]++;
                                //console.log(true);
                            }
                        }
                        
                        break;
                    case "hcl":
                        var regex = /#[0-f]{6}/;
                        if(regex.test(value))
                            counter["hcl"]++;
                        //console.log(value);
                        //console.log(regex.test(value));
                        break;
                    case "ecl":
                        var regex = /(amb|blu|brn|gry|grn|hzl|oth)/;
                        if(regex.test(value))
                            counter["ecl"]++;
                        
                        //console.log(value);
                        //console.log(regex.test(value));
                        break;
                    case "pid":
                        var regex = /[0-9]{9}/;
                        if(regex.test(value))
                            counter["pid"]++;
                        
                        //console.log(value);
                        //console.log(regex.test(value));
                        break;
                }
            }
            
            noValidPasseports += acceptPassport(counter);  
            //console.log(acceptPassport(counter));

        }

        console.log(noValidPasseports);
        
    } catch (err) {
        console.error(err)
    }
        
   console.log(`Server running at http://${hostname}:${port}/`);
})
 
