"use strict";

var Note = require('../models/note.model.js'); // const authpage = require('../../middlewares/middlewires');
// Create and Save a new Note


exports.create = function (req, res) {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  } // Create a Note


  var note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content
  }); // Save Note in the database

  note.save().then(function (data) {
    return res.send(data);
  })["catch"](function (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the Note."
    });
  });
}; // =====================findall===================
// Retrieve and return all notes from the database.


exports.findAll = function (req, res) {
  Note.find().then(function (notes) {
    return res.send(notes);
  })["catch"](function (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while retrieving notes."
    });
  });
}; // ==========================find single========================


exports.findOne = function (req, res) {
  Note.findById(req.params.noteId).then(function (note) {
    if (!note) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }

    res.send(note);
  })["catch"](function (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }

    return res.status(500).send({
      message: "Error retrieving note with id " + req.params.noteId
    });
  });
}; // ==============================updating=======================
// Update a note identified by the noteId in the request


exports.update = function (req, res) {
  // Validate Request
  // if(!req.body.content) {
  //     return res.status(400).send({
  //         message: "Note content can not be empty"
  //     });
  // }
  // Find note and update it with the request body
  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
  }, {
    "new": true
  }).then(function (note) {
    if (!note) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    } else {
      return res.send(note).json({
        message: "Note updated successfully!"
      });
    }
  })["catch"](function (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    } else {
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
      });
    }
  });
}; // ====================delete==========
// Delete a note with the specified noteId in the request


exports["delete"] = function (req, res) {
  Note.findByIdAndRemove(req.params.noteId).then(function (note) {
    if (!note) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }

    res.send({
      message: "Note deleted successfully!"
    });
  })["catch"](function (err) {
    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Note not found with id " + req.params.noteId
      });
    }

    return res.status(500).send({
      message: "Could not delete note with id " + req.params.noteId
    });
  });
}; // ========mark as done===================


exports.patch = function (req, res) {
  // Validate Request
  // if(!req.body.content) {
  //     return res.status(400).send({
  //         message: "content is empty"
  //     });
  // }
  Note.findById(req.params.noteId, function (err, notes) {
    try {
      if (err) {
        return res.status(500).json({
          message: "note not found with id " + req.params.noteId
        });
      } else {
        notes.done = true;
        notes.save(function (err, notes) {
          if (err) {
            return res.status(500).send(err || "error occured");
          } else {
            return res.status(200).json({
              message: "Note Found and Done successfully!!!"
            });
          }
        });
      }
    } catch (error) {
      return res.status(500).send(error);
    }
  });
};