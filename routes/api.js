const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({data: 'Received a GET HTTP method'})
});

router.post('/', (req, res) => {
    return res.json({
        body: req.body
    })
});

router.put('/', (req, res) => {
    return res.json({ data: 'Received a PUT HTTP method'})
});

router.delete('/', (req, res) => {
    return res.json({ data: 'Received a DELETE HTTP method'})
})


module.exports = router;