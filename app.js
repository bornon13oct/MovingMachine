var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    methodOverride  = require("method-override");
    
mongoose.connect(process.env.DATABASE_URL);
// mongodb://bornon13oct:skay13oct@ds239128.mlab.com:39128/brainworks
// mongodb://localhost/Motor
var motorSchema = new mongoose.Schema({
    name: String,
    isOn: Boolean,
    currentSpeed: Number
});

var Motor = mongoose.model("Motor", motorSchema);

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function(req, res){
    Motor.find({}, function(err, allMotors){
        if(err){
            console.log(err);
        } else {
            res.render("index",{motors:allMotors});
        }
    });
});

app.post("/", function(req, res){
    var num;
    Motor.find().count(function(err, count){
        if(err){
            console.log(err);
        } else {
            num = count+1;
            var name = "Motor"+pad_with_zeroes(num, 3),
                isOn = false,
                currentSpeed = 0;
            var addMotor = {name : name, isOn : isOn, currentSpeed : currentSpeed};
            Motor.create(addMotor, function(err, motor){
                if(err){
                    console.log(err);
                } else {
                    res.redirect("/");
                }
            });
        }
    });
});

app.post("/switch/:id", function(req, res){
    Motor.findById(req.params.id, function(err, foundMotor){
        if(!foundMotor.isOn){
            var name= foundMotor.name,
                isOn= true, 
                currentSpeed= 5;
            var updateMotor = {name: name, isOn: isOn, currentSpeed: currentSpeed};
            Motor.findByIdAndUpdate(foundMotor._id, updateMotor, function(err, newMotor){
                if(err)
                    console.log(err);
            });
        }
    });
    res.redirect("/");
});

app.put("/switch/:id", function(req, res){
    Motor.findById(req.params.id, function(err, foundMotor){
        var name= foundMotor.name,
            isOn= false, 
            currentSpeed= 0;
        var updateMotor = {name: name, isOn: isOn, currentSpeed: currentSpeed};
        Motor.findByIdAndUpdate(foundMotor._id, updateMotor, function(err, newMotor){
            if(err)
                console.log(err);
        });
    });
    res.redirect("/");
});

app.post("/increase/:id", function(req, res){
    Motor.findById(req.params.id, function(err, foundMotor){
        if(foundMotor.isOn&&foundMotor.currentSpeed!=0){
            var name= foundMotor.name,
                isOn= true, 
                currentSpeed= foundMotor.currentSpeed+1;
            var updateMotor = {name: name, isOn: isOn, currentSpeed: currentSpeed};
            Motor.findByIdAndUpdate(foundMotor._id, updateMotor, function(err, newMotor){
                if(err)
                    console.log(err);
            });
        } else {
            var name= foundMotor.name,
                isOn= false, 
                currentSpeed= 0;
            var updateMotor = {name: name, isOn: isOn, currentSpeed: currentSpeed};
            Motor.findByIdAndUpdate(foundMotor._id, updateMotor, function(err, newMotor){
                if(err)
                    console.log(err);
            });
        }
    });
    res.redirect("/");
});

app.put("/increase/:id", function(req, res){
    Motor.findById(req.params.id, function(err, foundMotor){
        if(foundMotor.currentSpeed>=1){
            var name= foundMotor.name,
                isOn= true, 
                currentSpeed= foundMotor.currentSpeed-1;
            var updateMotor = {name: name, isOn: isOn, currentSpeed: currentSpeed};
            Motor.findByIdAndUpdate(foundMotor._id, updateMotor, function(err, newMotor){
                if(err)
                    console.log(err);
            });
        } else {
            var name= foundMotor.name,
                isOn= false, 
                currentSpeed= 0;
            var updateMotor = {name: name, isOn: isOn, currentSpeed: currentSpeed};
            Motor.findByIdAndUpdate(foundMotor._id, updateMotor, function(err, newMotor){
                if(err)
                    console.log(err);
            });
        }
    });
    res.redirect("/");
});

app.get("/health", function(req, res){
    Motor.find({}, function(err, allMotors){
        if(err){
            console.log(err);
        } else {
            res.render("health",{motors:allMotors});
        }
    });
});

app.post("/health/:id", function(req, res) {
    Motor.findById(req.params.id, function(err, foundMotor){
        if(foundMotor.currentSpeed>10){
            var name= foundMotor.name,
                isOn= true, 
                currentSpeed= 5;
            var updateMotor = {name: name, isOn: isOn, currentSpeed: currentSpeed};
            Motor.findByIdAndUpdate(foundMotor._id, updateMotor, function(err, newMotor){
                if(err)
                    console.log(err);
            });
        }
    });
    res.redirect("/health");
});

function pad_with_zeroes(number, length) {
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }
    return my_string;
}
    
    


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started.");
});

