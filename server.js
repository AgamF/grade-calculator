const express = require('express')

const server = express()

// Middleware
server.set('view engine', 'ejs')
server.use(express.static('public'))

// Routes
server.get('/', (req, res) => {
  res.render('index')
});

server.get('/grades', (req, res) => {
  const { gradecount } = req.query;
  const parsedGradecount = parseInt(gradecount)
  if (isNaN(parsedGradecount)) {
    res.render('typeerror')
  } else if (parsedGradecount <= 0) {
    res.send(`
    <link href="/styles.css" rel="stylesheet">
    <br>
    <h1>Whoops, that's not a valid number!</h1>
    <button><a href="/">Back to home page</a></button>
    `)
  } else {
    res.render('grades', { gradecount })
  }
});

server.get('/result', (req, res) => {
  let total = 0;
  Object.values(req.query).forEach(grade => {
    total += parseInt(grade);
  });
  let gradeCount = Object.keys(req.query).length;
  const result = Math.floor(total / gradeCount);
  res.render('result', { result })
});

server.use((req, res) => {
  res.status(404).render('404')
});

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});