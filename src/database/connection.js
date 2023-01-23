const mongoose = require("mongoose");

class Connection {
  constructor() {
    this.dataBaseConnectionMongoDB();
  }

  dataBaseConnectionMongoDB() {
    mongoose.set("strictQuery", true);
    this.mongoDBConnection = mongoose
      .connect("mongodb://localhost:27017/nodejsjwt", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(
          "Conexão ao Banco de Dados MongoDB estabelecida com Sucesso!!!"
        );
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  dataBaseConnectionMySQL() {}
}

module.exports = new Connection();
