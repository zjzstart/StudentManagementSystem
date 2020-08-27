const fs = require('fs')
let dbPath= './db.json'

// 查找学生信息
exports.find = function(callback){
  fs.readFile(dbPath, (err, data) => {
    if(err){
      return callback(err)
    }
    callback(null, JSON.parse(data).students)
  })
}

// 保存学生信息
exports.save = function(student, callback){
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if(err){
      return callback(err)
    }
    let students = JSON.parse(data).students
    student.id = students[students.length-1].id + 1
    students.push(student)
    let fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, (err, data) => {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}

exports.updateById = function(student, callback){
  fs.readFile(dbPath, 'utf8', function(err, data){
    if(err){
      return callback(err)
    }
    student.id = parseInt(student.id)
    let students = JSON.parse(data).students
    let stu = students.find(function (item) {
      return item.id === student.id
    })
    console.log(stu);
    for (let key in student) {
      stu[key] = student[key]
    }

    let fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, (err, data) => {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}

exports.findById = function(id, callback) {
  fs.readFile(dbPath, 'utf8', function(err, data){
    if(err){
      return callback(err)
    }

    let students = JSON.parse(data).students
    let ret = students.find(function(item){
      return item.id === id
    })
    callback(null, ret)
  })
}

exports.deleteById = function(id, callback) {
  fs.readFile(dbPath, (err, data) => {
    if(err){
      return callback(err)
    }
    let students = JSON.parse(data).students
    let deleteId = students.findIndex(function (item) {
      return item.id === parseInt(id)
    })

    students.splice(deleteId, 1)
    let fileData = JSON.stringify({
      students: students
    })
    fs.writeFile(dbPath, fileData, (err, data) => {
      if(err){
        return callback(err)
      }
      callback(null)
    })
  })
}