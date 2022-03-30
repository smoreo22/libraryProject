function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;

  let result = books.filter((book) => {
    if (book.borrows[0].returned === false) total++;
  });
  return total;
}

function getMostCommonGenres(books) {
  let genres = books.reduce((acc, book) => {
    acc.push(book.genre);
    return acc;
  }, []);

  let count = genres.reduce((acc, genre) => {
    if (acc[genre]) {
      acc[genre]++;
    } else {
      acc[genre] = 1;
    }
    return acc;
  }, {});

  let common = [];
  for (const [key, value] of Object.entries(count)) {
    common.push({ name: key, count: value });
  }

  common.sort((a, b) => b.count - a.count);

  return common.slice(0, 5);
}

function getMostPopularBooks(books) {
  let pop = books.map((book) => ({
    ["name"]: book.title,
    ["count"]: book.borrows.length,
  }));

  pop.sort((a, b) => (b.count > a.count ? 1 : -1));

  return pop.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let bookCount = [];
  for (let i in authors) {
    bookCount.push(_booksWrittenByAuthor(books, authors[i]));
  }
  bookCount.sort((a, b) => (b.count > a.count ? 1 : -1));

  return bookCount.slice(0, 5);
}

// helper function to find all book written by author.
//filter all book that have authors authorId
function _booksWrittenByAuthor(books, author) {
  let authorsBooks = {};

  books.filter((book) => {
    if (book.authorId === author.id) {
      authorsBooks = {
        name: `${author.name.first} ${author.name.last}`,
        count: book.borrows.length,
      };
    }
  });

  return authorsBooks;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
