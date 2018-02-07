const path = require('path');
const express = require('express');

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// Middleware for static files; display index.html
app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`Server is started on port ${port}`);
});
