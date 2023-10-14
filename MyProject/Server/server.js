const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const cors = require("cors");
app.use(cors());

//CONNECT TO DATABASE MYSQL

const mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "123456",
  database: "data_account",
});

connection.connect(function (err) {
  if (err) throw err;
  let sql =
    "CREATE TABLE IF NOT EXISTS users (id int NOT NULL UNIQUE AUTO_INCREMENT, fullname VARCHAR(255), user_name VARCHAR(255), password VARCHAR(255), confirmPassword VARCHAR(255), email VARCHAR(255))";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
  console.log("Connected!");
});


//Login
app.post("/login", (req, res) => {
  if (req.body.user_name && req.body.password) {
    let sqlUserSelect =
      "SELECT * FROM users WHERE user_name = ? AND password = ?";
    connection.query(
      sqlUserSelect,
      [req.body.user_name, req.body.password],
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).json({ success: false, msg: "Lỗi máy chủ" });
          return;
        }
        if (result && result.length > 0) {
          res.status(200).json({ success: true, msg: "Đăng nhập thành công" });
          return;
        } else {
          res.status(400).json({ success: false, msg: "Đăng nhập không thành công" });
          return;
        }
      }
    );
  }
});

//Xử lý yêu cầu đăng ký
app.post("/register", async (req, res) => {
  try {
    const { fullName, user_name, password, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Mật khẩu và mật khẩu xác nhận không khớp' });
    }
    // Tạo câu truy vấn SQL INSERT để chèn dữ liệu người dùng vào bảng Users
    const query = `INSERT INTO Users (fullName, user_name, password, confirmPassword, email) VALUES (?, ?, ?, ?, ?)`;
    const values = [fullName, user_name, password, confirmPassword, email];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, msg: "Đăng ký không thành công" });
      } else {
        res.status(200).json({ success: true, msg: "Đăng ký thành công" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Đã xảy ra lỗi' });
  }
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
