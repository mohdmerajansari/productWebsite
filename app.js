const express = require('express');
const  userRouter  = require('./routes/homeRouter');
const path = require('path');
const rootDir = require('./Utils/pathUtils')


const port = process.env.PORT || 3000;


const app = express();

app.set('view engine','ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);

app.use(express.static(path.join(rootDir,'public')));

// Add error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});


app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});

module.exports = app;