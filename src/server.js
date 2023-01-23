const app = require("./app");

var PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  try {
    console.log(`Servidor rodando no endereço: http://localhost:${PORT}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});
