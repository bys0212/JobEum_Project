//회원가입
const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// 회원가입 API
router.post('/signup', async (req, res) => {
  const {
    userType,
    username,
    password,
    name,
    birth,
    gender,
    email,
    phone,
    company,
    bizNumber,
    manager
  } = req.body;

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: '이미 존재하는 아이디입니다.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      user_type: userType,
      username,
      password: hashedPassword,
      email,
      phone,
      name: userType === '회원' ? name : null,
      birth: userType === '회원' ? birth : null,
      gender: userType === '회원' ? gender : null,
      company: userType === '기업' ? company : null,
      biz_number: userType === '기업' ? bizNumber : null,
      manager: userType === '기업' ? manager : null,
    };

    const [result] = await db.query('INSERT INTO users SET ?', userData);
    res.status(201).json({ success: true, userId: result.insertId });
  } catch (err) {
    console.error('회원가입 오류:', err);
    res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;
