const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};
var data = [];
// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( (err, numberString) => {
    fs.writeFile(exports.dataDir + '/' + numberString + '.txt', text, (err) => {
      if (err) {
        console.log(err);
      } else {
        callback(err, {text: text, id: numberString});
      }
    });
  });
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      var fileArray = [];
      files.forEach ( (file) => {
        fileArray.push({id: path.basename(file, '.txt'), text: path.basename(file, '.txt') });
      });
      callback(err, fileArray);
    }
  });
};

exports.readOne = (id, callback) => {
  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, data) => {
    if (err) {
      callback(err);
    } else {
      var fileObj = {id: id, text: data.toString()};
      callback(err, fileObj);
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readFile(exports.dataDir + '/' + id + '.txt', (err, data) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(exports.dataDir + '/' + id + '.txt', text, (err) => {
        if (err) {
          console.log(err);
        } else {
          callback(err, {text: text, id: id});
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  fs.unlink(exports.dataDir + '/' + id + '.txt', (err, data) => {
  if (err) {
    callback(err);
  } else {
    callback(err, {text: id, id: id});
    }
  })
}

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
