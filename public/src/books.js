function findAuthorById(authors, id) {
  return authors.find((author) => id === author.id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let bookStatus = [[], []];

  for (let i in books) {
    if (books[i].borrows[0].returned === false) {
      bookStatus[0].push(books[i]);
    } else {
      bookStatus[1].push(books[i]);
    }
  }
  return bookStatus;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  
  for (let i in book.borrows) {
    result.push(_findAccountById(accounts, book.borrows[i].id));
  }
  for (let i in result) {
    for (let j in book.borrows) {
      result[i]["returned"] = book.borrows[j].returned;
    }
  }

  return result.slice(0, 10);
}


 function _findAccountById(accounts, id) {
  return accounts.find((account) => id === account.id);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
