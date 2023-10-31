import sqlite3 from "sqlite3";

const sqllite = sqlite3.verbose();
const db = new sqllite.Database("./db");

class UserOperations {
  postUser(login) {
    db.run("INSERT OR IGNORE INTO user (login) VALUES(?)", [login]);
  }
}

export default new UserOperations();
