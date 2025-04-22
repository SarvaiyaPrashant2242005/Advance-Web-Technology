const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pos-system')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => {
      console.log('Server running on http://localhost:5000');
    });
  })
  .catch(err => console.error(err));
