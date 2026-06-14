class Database {
  static instance;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = this.connect();
    Database.instance = this;
  }

  connect() {
    console.log("Membuat koneksi database...");
    return {
      status: "connected",
      time: new Date()
    };
  }

  getConnection() {
    return this.connection;
  }
}

// Pemakaian
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); 
// true (hanya 1 instance)

console.log(db1.getConnection());
console.log(db2.getConnection());