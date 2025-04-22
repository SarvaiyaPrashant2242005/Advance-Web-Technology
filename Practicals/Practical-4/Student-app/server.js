const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  department: String,
});

const Student = mongoose.model('Student', studentSchema);

app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

app.get('/students/:id', async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).send({ error: 'Student not found' });
      }
      res.send(student);
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  });
  
// UPDATE a student by ID
app.put('/students/:id', async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,           // Return the updated document
        runValidators: true, // Validate the update against the schema
      });
  
      if (!student) {
        return res.status(404).send({ error: 'Student not found' });
      }
  
      res.send(student);
    } catch (error) {
      res.status(400).send({ error: 'Invalid update' });
    }
  });
  
  // DELETE a student by ID
  app.delete('/students/:id', async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
        return res.status(404).send({ error: 'Student not found' });
      }
  
      res.send({ message: 'Student deleted successfully', student });
    } catch (error) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  });
  
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
