const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// 임시 데이터베이스 대신 배열 사용
let posts = [];

// Body parser 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 정적 파일 제공 (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// 전체 게시물 조회
app.get('/posts', (req, res) => {
  res.json(posts);
});

// 게시물 생성
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// 특정 게시물 조회
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  if (!post) {
    res.status(404).send('게시물을 찾을 수 없습니다.');
  } else {
    res.json(post);
  }
});

// 게시물 수정
app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex === -1) {
    res.status(404).send('게시물을 찾을 수 없습니다.');
  } else {
    posts[postIndex] = { ...posts[postIndex], title, content };
    res.json(posts[postIndex]);
  }
});

// 게시물 삭제
app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex(post => post.id === postId);
  if (postIndex === -1) {
    res.status(404).send('게시물을 찾을 수 없습니다.');
  } else {
    posts.splice(postIndex, 1);
    res.status(204).send();
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
