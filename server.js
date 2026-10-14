
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
    res.send('hello api is working');
});

let students = [
    {
        id: 1,
        name: "John",
        email: "john@gmail.com",
        program: "BSCS"
    },
    {
        id: 2,
        name: "Ali",
        email: "ali@gmail.com",
        program: "BSSE"
    }
];

let nextid = 3;

app.get('/students', function (req, res) {
    res.json(students);
});

app.get('/students/:id', function (req, res) {
    const id = Number(req.params.id);

    const student = students.find(function (s) {
        return s.id === id;
    });

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

app.post('/students', function (req, res) {
    const body = req.body || {};
    const { name, email, program } = body;

    if (!name || !email || !program) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            message: "Invalid email format"
        });
    }

    const student = {
        id: nextid++,
        name: name,
        email: email,
        program: program
    };

    students.push(student);

    res.status(201).json(student);
});

app.listen(3000, function () {
    console.log("running at http://localhost:3000");
});
