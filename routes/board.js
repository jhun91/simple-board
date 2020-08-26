var express = require('express');
var router = express.Router();
var dbc = require('../config/database')();
var connection = dbc.init();

dbc.test_open(connection);

//글 목록
router.get('/list', function (req, res, next) {
    
    var params  = '';
    var sql = `SELECT SEQ, TITLE, AUTHOR, DATE_FORMAT(INPT_DTTM, '%y-%m-%d %H:%i:%s') AS INPT_DTTM FROM t_board`;
    connection.query(sql, params, function (error, rtnData, fields) {
        if (!error) {                         
            res.render('board/board_list.ejs', { boardList: rtnData });
        } else {
            console.log('query error : ' + error);
        }
    });    
});

//글 상세보기
router.get('/detail/:id', function (req, res, next) {
    res.send(`board id : ${req.params.id}`);
});

//글 쓰기 페이지
router.get('/write', function (req, res, next) {
    res.render('board/board_write.ejs');
});

//글 쓰기 처리
router.post('/writeProc', function (req, res, next) {
    res.send(`writeProc`);
});

//글 수정 페이지
router.get('/update/:id', function (req, res, next) {
    res.render('board/board_update.ejs');
});

//글 수정 처리
router.put('/updateProc', function (req, res, next) {
    res.send(`updateProc`);
});

//글 삭제 처리
router.delete('/deleteProc/:id', function (req, res, next) {
    res.send(`board id : ${req.params.id}`);
});

module.exports = router;
