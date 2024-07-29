const express = require("express");
const app = express();
app.use(express.json());

const Users = require("./routes/users");
const Products = require("./routes/products");

app.use("/users", Users);
app.use("/products", Products);

const PORT = 800;
app.listen(PORT, () => console.log(`${PORT} is listened`));
