function createBook(title, author, year) {
    return {
        title: title,
        author: author,
        year: year,
        available: true,
        ratings: [],
        addRating: function(user, rating) {
            if (!this.available && user.borrowedBooks.includes(this)) {
                this.ratings.push(rating);
            } else {
                console.log("Рейтинг можна додати тільки після видачі книги користувачеві.");
            }
        },
        getAverageRating: function() {
            if (this.ratings.length === 0) return 0;
            const sum = this.ratings.reduce((total, rating) => total + rating, 0);
            return sum / this.ratings.length;
        },
        toggleAvailability: function() {
            this.available = !this.available;
        }
    };
}

function createUser(name) {
    return {
        name: name,
        borrowedBooks: [],
        borrowBook: function(title, library) {
            const book = library.findBooksByTitle(title);
            if (book && book.available) {
                this.borrowedBooks.push(book);
                book.toggleAvailability();
                console.log(`${this.name} взяв книгу "${title}".`);
            } else {
                console.log(`Книга "${title}" недоступна для позики.`);
            }
        },
        returnBook: function(title, library) {
            const index = this.borrowedBooks.findIndex(book => book.title === title);
            if (index !== -1) {
                const book = this.borrowedBooks[index];
                library.returnBook(book);
                this.borrowedBooks.splice(index, 1);
                console.log(`${this.name} повернув книгу "${title}".`);
            } else {
                console.log(`Книга "${title}" не була взята цим користувачем.`);
            }
        }
    };
}

function createLibrary() {
    const books = [];
    return {
        addBook: function(book) {
            books.push(book);
            console.log(`Додано книгу "${book.title}" до бібліотеки.`);
        },
        removeBook: function(book) {
            const index = books.indexOf(book);
            if (index !== -1) {
                books.splice(index, 1);
                console.log(`Книга "${book.title}" видалена з бібліотеки.`);
            } else {
                console.log(`Книга "${book.title}" не знайдена в бібліотеці.`);
            }
        },
        findBooksByAuthor: function(author) {
            return books.filter(book => book.author === author);
        },
        findBooksByTitle: function(title) {
            return books.find(book => book.title === title);
        },
        listAvailableBooks: function() {
            const availableBooks = books.filter(book => book.available);
            if (availableBooks.length === 0) {
                console.log("Усі книги в бібліотеці в даний момент видані.");
            } else {
                console.log("Доступні книги:");
                availableBooks.forEach(book => console.log(`- ${book.title} (${book.author}, ${book.year})`));
            }
        },
        returnBook: function(book) {
            book.toggleAvailability();
            console.log(`Книга "${book.title}" повернута в бібліотеку.`);
        }
    };
}

// Приклад використання
const library = createLibrary();
const title = prompt("Введіть назву книги:");
const book = createBook(title, "Автор", 2020);
library.addBook(book);

const user = createUser("Ім'я");
user.borrowBook(title, library);
console.log(book.available);
user.returnBook(title, library);
console.log(book.available);