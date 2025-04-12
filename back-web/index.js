import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";


const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(express.static("C:/Users/HP/Desktop/areen shop/front-web/public"));

app.use(express.urlencoded({ extended: true }));

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/cart', (req, res) => {
  res.render('cart'); 
});

app.get('/cart/checkout', (req, res) => {
  res.render('checkout'); 
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
