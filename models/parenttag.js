/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-12-19
 * Time: 下午3:00
 * To change this template use File | Settings | File Templates.
 */
var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function ParentTag(parent_tag) {
    this.id = parent_tag.id;
    this.name = parent_tag.name;
}

module.exports = ParentTag;

ParentTag.prototype.save = function (callback) {
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
            db.collection('my_blog_parenttag', function (err, collection) {
                if (err) {
                    mongodb.close(function () {
                        return callback(err);
                    });
                } else {
                    collection.insert(temp, {safe: true}, function (err, parent_tag) {
                        mongodb.close(function () {
                            return callback(err, parent_tag);
                        });
                    });
                }
            });
        }
    });
};

ParentTag.remove = function (_id, callback) {
    mongodb.open(function (err, db) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            else {
                db.collection('my_blog_parenttag', function (err, collection) {
                        if (err) {
                            mongodb.close();
                            return callback(err);
                        } else {
                            collection.remove({_id: new ObjectID(_id)}, {w: 1}, function (err, modifiedValue) {
                                mongodb.close(function () {
                                        if (err) {
                                            return callback(err);
                                        } else {
                                            return callback(err, modifiedValue);
                                        }
                                    }
                                );
                            })
                        }
                    }
                );
            }
        }
    );
};

ParentTag.get = function (callback) {
    mongodb.open(function (err, db) {
        if (err) {
            mongodb.close();
            return callback(err);
        } else {
            db.collection('my_blog_parenttag', function (err, collection) {
                if (err) {
                    mongodb.close();
                    return callback(err);
                } else {
                    collection.find().toArray(function (err, parentTags) {
                        mongodb.close(false, function () {
                            if (parentTags) {
                                return callback(err, parentTags);
                            }
                            else {
                                return callback(err, null);
                            }
                        });
                    });
                }
            });
        }
    });
};