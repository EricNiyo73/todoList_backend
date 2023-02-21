"use strict";

var jwt = require("jsonwebtoken");

var User = require("../app/models/user.model.js");

function Authorization(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function Authorization$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          //   console.log(req.headers);
          token = req.headers.authorization;

          if (!token) {
            _context.next = 14;
            break;
          }

          decoded = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findById(decoded.id));

        case 6:
          user = _context.sent;

          if (!(user.userType === "admin")) {
            _context.next = 11;
            break;
          }

          next();
          _context.next = 12;
          break;

        case 11:
          return _context.abrupt("return", res.status(401).json({
            message: "Only admin can do this operation"
          }));

        case 12:
          _context.next = 15;
          break;

        case 14:
          return _context.abrupt("return", res.status(401).json({
            status: "failed",
            message: "Unauthorized"
          }));

        case 15:
          _context.next = 20;
          break;

        case 17:
          _context.prev = 17;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(400).json({
            message: "Invalid token"
          }));

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 17]]);
}

module.exports = Authorization;