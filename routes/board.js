var express = require('express');
var router = express.Router();
var dbc = require('../config/database')();
var connection = dbc.init();

dbc.test_open(connection);

//글 목록
router.get('/list', function (req, res, next) {
    
    var params  = '';
    var sql = `SELECT SEQ, TITLE, AUTHOR, DATE_FORMAT(INPT_DTTM, '%y-%m-%d %H:%i:%s') AS INPT_DTTM FROM t_board`;
    connection.query(sql, params, function (error, rows, fields) {
        if (!error) {                         
            res.render('board/board_list.ejs', { boardList: rows });
        } else {
            console.log('query error : ' + error);
        }
    });    
});

//글 상세보기
router.get('/detail/:id', function (req, res, next) {

    //detail에 받은 글번호를 params에 추가합니다.
    var params = [req.params.id];
    var sql = `SELECT SEQ, TITLE, AUTHOR, CONTENTS FROM t_board WHERE SEQ = ?`;    
    connection.query(sql, params, function (error, rows, fields) {
        if (!error) {                         
            res.render('board/board_detail.ejs', { board: rows });
        } else {
            console.log('query error : ' + error);
        }
    });
});

//글 쓰기 페이지
router.get('/write', function (req, res, next) {
    res.render('board/board_write.ejs');
});

//글 쓰기 처리
router.post('/writeProc', function (req, res, next) {

    const author = req.body.author;
    const title = req.body.title;
    const contents = req.body.contents;

    //입력할 데이터를 배열에 담아 준비합니다.
    var params  = [author, title, contents];

    //T_BOARD에 데이터를 입력합니다. 위에서 만든 params의 순서에 맞게 ? 에 변수가 들어갑니다.
    //NOW()를 통해 현재 시각을 입력합니다.
    var sql = `INSERT INTO T_BOARD (TITLE, AUTHOR, CONTENTS, INPT_DTTM) VALUES (?, ?, ?, NOW())`;
   
    connection.query(sql, params, function (error, rows, fields) {
        if (!error) {            
            res.redirect(`/board/detail/${rows.insertId}`);
        } else {
            console.log('query error : ' + error);
        }
    }); 
});

//글 수정 페이지
router.get('/update/:id', function (req, res, next) {
    res.render('board/board_update.ejs');
});

//글 수정 처리
router.put('/updateProc', function (req, res, next) {
    res.send('updateProc');
});

//글 삭제 처리
router.delete('/deleteProc/:id', function (req, res, next) {
    res.send(`board id : ${req.params.id}`);
});

module.exports = router;
