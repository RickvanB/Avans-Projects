let express = require('express');
let router = express.Router();
let mysql = require('../config/mysql');

router.get('/tasks', function(req, res, next) {
    mysql.query('SELECT * FROM tasks', function(error, results, fields) {
        if (error) {
            res.status(500).json(JSON.parse(error));
        }

        // Convert int to boolean for frontend
        for (let index = 0; index < results.length; index++) {
            results[index].isDone = Boolean(Number(results[index].isDone));
        }

        res.status(200).json(results);
    });
});

router.get('/tasks/:id', function(req, res, next) {
    mysql.query('SELECT * FROM tasks WHERE id = ?', [req.params.id], function(error, results, fields) {
        if (error) {
            res.status(500).json(JSON.parse(error));
        }

        res.status(200).json(results);
    });
});

router.post('/task', function(req, res) {
    let post = { text: req.body.text, isDone: req.body.isDone };
    let query = mysql.query('INSERT INTO tasks SET ?', post, function(error, results, fields) {
        if (error) {
            res.status(500).json(JSON.parse(error));
        }

        res.status(200).json({ "success": true });
    });

});

router.put('/task/:id', function(req, res) {
    let query = mysql.query('UPDATE tasks SET isDone = ? WHERE id = ?', [req.body.isDone, req.params.id], function(error, results, fields) {
        if (error) {
            res.status(500).json(JSON.parse(error));
        }

        res.status(200).json({ "success": true });
    });
});

router.delete('/task/:id', function(req, res) {
    let query = mysql.query('DELETE FROM tasks WHERE id = ?', req.params.id, function(error, results, fields) {
        if (error) {
            res.status(500).json(JSON.parse(error));
        }

        res.status(200).json({ "success": true });
    });
});

router.get('/task/table/create', function(req, res) {

    mysql.query('create table tasks (id int auto_increment, text varchar(255) null, isDone tinyint(1) default 0 null, constraint tasks_pk primary key (id));', function(error, results, fields) {
        if (error) {
            res.status(500).json(JSON.parse(error));
        }
    });

    res.status(200).json({ "success": "Tabel is geinitialiseerd!" });
});

module.exports = router;