const express = require("express");
const app = express();
const user = require("./src/routers/user.router");

const port = 3000;

app.use(express.json());

app.use("/user", user);

app.get("/", (req, res) => {
    res.send("hello hello");
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost: ${port}`);
});