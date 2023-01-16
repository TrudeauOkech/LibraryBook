const express = require('express')
const bodyParser = require('body-parser')
const books = [{
		bookTitle: "Harry Potter",
		bookAuthor: "JK Rowling",
		bookPages: 450,
		bookPrice: 2040,
		bookState: "Available"
	},
	{
		bookTitle: "How To Be a Leader",
		bookAuthor: "Marcus Rashford",
		bookPages: 200,
		bookPrice: 450,
		bookState: "Issued"
	}
]

const app = express()

// This section is used to set a template for the view engine to have sample values
app.set('view engine', 'ejs')


// Read data from  the form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

// Send the the EJS file
app.get("/", function (req, res) {
	res.render("home", {
		data: books
	})
})

// Fetch data from form & push to app
app.post("/", (req, res) => {
	const inputBookTitle = req.body.bookTitle
	const inputBookAuthor = req.body.bookAuthor
	const inputBookPages = req.body.bookPages
	const inputBookPrice = req.body.bookPrice

	books.push({
		bookTitle: inputBookTitle,
		bookAuthor: inputBookAuthor,
		bookPages: inputBookPages,
		bookPrice: inputBookPrice,
		bookState: "Available"
	})

	res.render("home", {
		data: books
	})
})

app.post('/issue', (req, res) => {
	var requestedBookTitle = req.body.bookTitle;
	books.forEach(book => {
		if (book.bookTitle == requestedBookTitle) {
			book.bookState = "Issued";
		}
	})
	res.render("home", {
		data: books
	})
})

app.post('/return', (req, res) => {
	var requestedBookTitle = req.body.bookTitle;
	books.forEach(book => {
		if (book.bookTitle == requestedBookTitle) {
			book.bookState = "Available";
		}
	})
	res.render("home", {
		data: books
	})
})

app.post('/delete', (req, res) => {
	var requestedBookTitle = req.body.bookTitle;
	var j = 0;
	books.forEach(book => {
		j = j + 1;
		if (book.bookTitle == requestedBookTitle) {
			books.splice((j - 1), 1)
		}
	})
	res.render("home", {
		data: books
	})
})

app.listen(3000, (req, res) => {
	console.log("App is running on port 3000")
})
