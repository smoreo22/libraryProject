function findAccountById(accounts, id) {
  return accounts.find((account) => id === account.id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
    accountA.name.last > accountB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    for (let i in book.borrows) {
      if (account.id === book.borrows[i].id) {
        total++;
      }
    }
    return total;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksCheckedOut = [];
  
  books.filter((book) => {
    for (let i in book.borrows) {
      if (
        account.id === book.borrows[i].id &&
        book.borrows[i].returned === false
      ) {
        booksCheckedOut.push(book);
      }
    }
  });

  for (let j in booksCheckedOut) {
    for (let k in authors) {
      if (booksCheckedOut[j].authorId === authors[k].id) {
        booksCheckedOut[j].author = authors[k];
      }
    }
  }
  return booksCheckedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
