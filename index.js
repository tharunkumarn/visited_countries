import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new  pg.Client({
  host:"localhost",
  database:"mylove",
  user:"postgres",
  password:"postgres",
  port:5432,
});

db.connect();



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const result = await db.query("select country_code from visited_countries");
  let countrys = [];
  result.rows.forEach((country)=>{
    countrys.push(country.country_code);
    console.log(country)
  });
  res.render("index.ejs",{countries:countrys,total:countrys.length});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
