import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// إعداد محرك العرض
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// تقديم الملفات الثابتة من مجلد public
app.use(express.static(join(__dirname, '..', 'front-web', 'public')));

// فك تشفير بيانات الفورم
app.use(express.urlencoded({ extended: true }));

// الراوتات
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cart', (req, res) => {
  res.render('cart'); 
});

app.get('/cart/checkout', (req, res) => {
  res.render('checkout'); 
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
