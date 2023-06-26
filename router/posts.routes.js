const router = require('express').Router();
const Post = require('../database/Models/post');
const { Op } = require('sequelize');
// 게시글 작성
router.post('/', async (req, res) => {
  const { restaurantName, zone, menu, content, like } = req.body;
  await Post.create({
    restaurantName,
    zone,
    menu,
    content,
    like,
  });
  res.status(200).json({ messeage: '게시글 업로드 성공!' });
});
// 게시글 조회
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'restaurantName', 'like', 'createdAt'],
      order: [['like', 'DESC']],
    });
    return res.status(200).json({ data: posts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});
// 게시글 상세 조회
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({
      attributes: [
        'id',
        'restaurantName',
        'zone',
        'menu',
        'content',
        'like',
        'createdAt',
        'updatedAt',
      ],
      where: { id },
    });
    return res.status(200).json({ data: post });
  } catch (err) {
    console.log(err);
    res
      .status(400)
      .json({ errorMessage: '게시글 상세 조회에 실패하였습니다.' });
  }
});

// 게시글 수정
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { restaurantName, zone, menu, content } = req.body;

  try {
    const [updatePost] = await Post.update(
      { restaurantName, zone, menu, content },
      {
        where: { id },
      }
    );
    return res.status(200).json({ message: '게시글을 수정하였습니다.' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
  }
});

// 게시글 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Post.destroy({
      where: { id },
    });
    res.status(200).json({ message: '게시글을 삭제하였습니다.' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
  }
});
module.exports = router;
