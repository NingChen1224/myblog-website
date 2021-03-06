/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-12-19
 * Time: 下午3:00
 * To change this template use File | Settings | File Templates.
 */
var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;
function ChildTag(child_tag) {
    this.id = child_tag.id;
    this.name = child_tag.name;
}
module.exports = ChildTag;
ChildTag.prototype.save = function (callback) {
    var temp = {
        id: this.id,
        name: this.name
    };
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close(function () {
                return callback(err);
            });
        } else {
            db.collection('my_blog_childtag', function (err, collection) {
                if (err) {
                    mongodb.close(function () {
                        return callback(err);
                    });
                } else {
                    collection.insert(temp, {safe: true}, function (err, childTag) {
                        mongodb.close(false, function () {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, childTag);
                        });
                    });
                }
            });
        }
    });
};
ChildTag.getAll = function (callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close(function () {
                return callback(err);
            });
        } else {
            db.collection("my_blog_childtag", function (err, collection) {
                if (err) {
                    mongodb.close(function () {
                        return callback(err);
                    });
                } else {
                    collection.find().toArray(function (err, childTags) {
                        mongodb.close(false, function () {
                            if (err) {
                                return callback(err);
                            }
                            return callback(null, childTags);
                        });
                    });
                }
            });
        }
    });
};