var express = require('express');
var assert = require('assert');
var restify = require('restify-clients');
var router = express.Router();

// Creates a JSON client
var client = restify.createJsonClient({
  url: 'http://localhost:4000'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  //client.basicAuth('$login', '$password');

  client.get('/users', function(err, request, response, users) {
    assert.ifError(err);

    res.end(JSON.stringify(users, null, 2));
  });
});

router.get('/:id', function(req, res, next) {
  //client.basicAuth('$login', '$password');

  client.get(`/users/${req.params.id}`, function(err, request, response, user) {
    assert.ifError(err);

    res.json(user);
  });
});

router.put('/:id', function(req, res, next) {
  //client.basicAuth('$login', '$password');

  client.put(`/users/${req.params.id}`, req.body, function(err, request, response, user) {
    assert.ifError(err);

    res.json(user);
  });
});

router.delete('/:id', function(req, res, next) {
  //client.basicAuth('$login', '$password');

  client.del(`/users/${req.params.id}`, function(err, request, response, user) {
    assert.ifError(err);

    res.json(user);
  });
});

router.post('/', function(req, res, next) {
  //client.basicAuth('$login', '$password');

  client.post('/users/', req.body, function(err, request, response, user) {
    assert.ifError(err);

    res.json(user);
  });
});

module.exports = router;
