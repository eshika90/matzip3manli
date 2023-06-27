const express = require('express');
const app = express();

// router
const router = require('./router/index.js');

// config
const config = require('./config.js');

// cookie - parser
const cookieParser = require('cookie-parser');

// DB - mysql
const mysql = require('./database/db.js');
const models = require('./database/Models/index.js');

// request data middleware
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res, next) => {
  res.status(200).json({
    path: {
      user: {
        1: 'POST /signup 회원가입',
        2: 'POST /login 로그인',
        3: 'GET /logout 로그아웃',
      },
      post: {
        1: 'GET /posts 게시글 전체 조회',
        2: 'GET /posts?zone= 지역별 조회',
        3: 'GET /posts/:postId 게시글 상세 조회',
        4: 'POST /posts 게시글 작성',
        5: 'PUT /posts/:postId 게시글 수정',
        6: 'DELETE /posts/:postId 게시글 삭제',
      },
      comment: {
        1: 'GET /comments/:postId 게시글 상세 댓글 조회',
        2: 'GET /comments/:userId 유저가 작성한 댓글 조회',
        3: 'POST /comments/:postId 댓글 작성',
        4: 'PUT /comments/:commentId 댓글 수정',
        5: 'DELETE /comments/:commentId 댓글 삭제',
      },
    },
  });
});

app.use('/', router);

(async () => {
  await mysql.sync().then(() => {
    app.listen(config.port, () => {
      console.log(`${config.port} is running..`);
    });
  });
})();
