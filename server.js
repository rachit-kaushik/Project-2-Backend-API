const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

// Dummy Database
let users = [
    {
        id: 1,
        name: "Rachit Kaushik",
        email: "rachitkaushik88@gmail.com"
    }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Project 2 Backend API");
});

// GET Single User Info
app.get("/api/user", (req, res) => {
    res.json({
        name: "Rachit Kaushik",
        course: "CSE AI & ML",
        internship: "Decode Labs"
    });
});

// GET All Users
app.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

// GET User By ID
app.get("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    res.status(200).json(user);

});

// POST User
app.post("/api/users", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and Email are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User Added Successfully",
        data: newUser
    });

});

// PUT Update User
app.put("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    const { name, email } = req.body;

    if (name) user.name = name;
    if (email) user.email = email;

    res.status(200).json({
        message: "User Updated Successfully",
        data: user
    });

});

// DELETE User
app.delete("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User Not Found"
        });
    }

    users.splice(index, 1);

    res.status(200).json({
        message: "User Deleted Successfully"
    });

});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});