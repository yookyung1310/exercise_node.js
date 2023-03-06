const db = require('../../../config/db'); //db설정 호출
const conn = db.init(); //db 연결

// exports.list = (req, res) => { //리스트 모듈 router 에서 호출
//     conn.query("select * from tb_board", (err, row) => { //쿼리 실행
//         if (err) throw err;
//         res.send({ success: true, data: row })
//     })
// };


exports.list = (req, res) => { //리스트 모듈
    let ipp = 10;
    let totalCount = 0;
    let block = 10;
    let total_page = 0;
    let page = 1;
    let start = 0;
    let end = ipp;
    let start_page = 1;
    let end_page = block;
    let where = "";

    body = req.query; //get

    // console.log(`body: ${body}`)
    // console.log(`body[0]: ${body[0]}`)
    // console.log(`body proeprties: ${Object.keys(body)}`)
    // console.log(`body.keyword: ${body.keyword}`)
    // console.log(`body.board_code: ${body.board_code}`)

    if (body.keyword) where += ` AND subject like '%${body.keyword}%' `;
    sql = ` SELECT  count(*) cnt FROM tb_board WHERE board_code = ? ${where} `;
    conn.query(sql, [body.board_code], (err, data) => {
        if (err) throw err;
        // console.log(`data in conn.query: ${data}`)
        // console.log(`data[0] in conn.query: ${data[0]}`)
        // console.log(`data[0].cnt in conn.query: ${data[0].cnt}`)

        totalCount = data[0].cnt;

        total_page = Math.ceil(totalCount / ipp);

        if (body.page) page = body.page;
        start = (page - 1) * 10;
        start_page = Math.ceil(page / block);
        end_page = start_page * block;

        if (total_page < end_page) end_page = total_page;

        let paging = {
            "totalCount": totalCount
            , "total_page": total_page
            , "page": page
            , "start_page": start_page
            , "end_page": end_page
            , "ipp": ipp
        }

        sql = ` SELECT * FROM tb_board WHERE board_code = ? ${where} ORDER BY num DESC LIMIT ?, ? `;
        conn.query(sql, [body.board_code, start, end], (err, list) => {
            if (err) throw err;

            res.send({ success: true, list: list, paging: paging });
        })
    })
}

exports.add = (req, res) => {
    body = req.body; //전송된 데이터를 받는다.
    sql = " INSERT INTO  tb_board (board_code, subject, cont, id, regdate) values (?, ?, ?, ?,now()) ";
    conn.query(sql,
        [body.board_code,
        body.subject,
        body.cont,
        body.id]
        , (err, result) => {
            if (err) throw err;

            res.send({ success: true });
        })
};

exports.view = (req, res) => {
    // body = req.body; // undefiend
    body = req.query;
    num = req.params.num;
    sql = " SELECT * FROM tb_board WHERE board_code = ? AND num = ? ";
    conn.query(sql, [body.board_code, num], (err, view) => {
        if (err) throw err;

        res.send({ success: true, view: view });
    })
}

exports.mod = (req, res) => { //수정 모듈
    body = req.body; //post
    // body = req.query;
    sql = " UPDATE tb_board SET subject = ?, cont = ?, editdate = now() WHERE num = ? ";
    // console.log(req)
    // console.log(body)
    // console.log(req.params)
    conn.query(sql, [body.subject, body.cont, body.num], (err, result) => {
        if (err) throw err;
        res.send({ success: true });
    })
}

exports.delete = (req, res) => {
    body = req.query;
    // console.log(body.num)
    sql = " DELETE FROM tb_board WHERE num = ? ";
    conn.query(sql, [body.num], (err, result) => {
        if (err) throw err;
        res.send({ success: true, result: result });
    })
}