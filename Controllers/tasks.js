const Tasks = require("../models/Tasks");
const path = require("path");
const badWord = require("bad-words");
const filter = new badWord();

const initalize = ()=>{
    filter.addWords("gay", "bsdk", "saale", "chutiya", "kamina", "Maderchod", "Bosdika", "Behen", "chod", "Randwa", "maa", "Bhadwa", "chuth", "randi", "ma", "lavda", "lavde");
}

const getAllTasks = async(req, res)=>{
    try {
        let task = await Tasks.find({}).sort("_id");
        const pin = task[0];
        task = task.slice(1);
        task.push(pin);
        task.reverse();
        // console.log(task);
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({sucess: false,
            msg: error
        })
    }
}

const createTasks = async(req, res)=>{
    try {
        // console.log(req.body);
        let {author, body} = req.body;
        author = filter.clean(author);
        body = filter.clean(body);
        const task = await Tasks.create({author, body});
        res.status(201).json({task});
        // res.status(201).sendFile(path.join(__dirname, "../public/index.html"));
    } catch (error) {
        res.status(500).json({sucess: false,
            msg: error
        });
    }
}

const updateTask = async(req, res)=>{
    const {id:taskID} = req.params;
    const {meta} = req.body;
    try {
        const task = await Tasks.findByIdAndUpdate(taskID, {meta});
        if(task)
            res.status(200).json({task});
        else
            res.status(404).json({sucess: false,
                msg: "kya bhai galat id deta hai!!!!"
            });
    } catch (error) {
        res.status(500).json({sucess: false,
            msg: error
        });
    }
}


module.exports = {
    getAllTasks, 
    createTasks,
    updateTask,
    initalize
};