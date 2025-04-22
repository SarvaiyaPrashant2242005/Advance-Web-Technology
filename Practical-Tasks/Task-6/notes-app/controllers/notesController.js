const Note = require('../models/Note');

// Get all notes
exports.getNotes = async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
};

// Get single note
exports.getNoteById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) res.json(note);
  else res.status(404).json({ message: 'Note not found' });
};

// Create note
exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  const savedNote = await note.save();
  res.status(201).json(savedNote);
};

// Update note
exports.updateNote = async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  res.json(note);
};

// Delete note
exports.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Note deleted' });
};
