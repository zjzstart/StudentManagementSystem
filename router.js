const fs = require('fs')
const express = require('express')
const Student = require('./student')


const router = express.Router()

router.get('/', (req, res) => {
  // fs.readFile('./db.json', 'utf8', (err, data) => {
    
  // })
  Student.find((err, students) => {
    if(err){
      return res.status(500).send('server error!')
    }

    res.render('index.html', {
      fruits: [
        '一代目',
        '二代目',
        '三代目',
        '四代目',
      ],
      students: students
    })
  })


})

router.get('/students/new', (req, res) => {
  res.render('students.html')
})


router.post('/students/new', (req, res) => {
  Student.save(req.body, (err) => {
    if(err){
      return res.status(500).send('server error!')
    }
    res.redirect('/')
  })
})

router.get('/students/edit', (req, res) => {
  let id = parseInt(req.query.id)
  Student.findById(id, function(err, student){
    if(err){
      return res.status(500).send('server error!')
    }
    res.render('edit.html', {
      student: student
    })
  })
})

router.post('/students/edit', (req, res) => {
  Student.updateById(req.body, (err) => {
    if(err){
      return res.status(500).send('server error!')
    }
    res.redirect('/')
  })
})

router.get('/students/delete', (req, res) => {
  let id = req.query.id
  Student.deleteById(id, err => {
    if(err){
      return res.status(500).send('server error!')
    }
    res.redirect('/')
  })
})

module.exports = router