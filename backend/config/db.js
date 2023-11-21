import { Sequelize } from "sequelize";

const sequelize = new Sequelize("reservasDB", "root", "mis-reservas", {
  host: "mysql-reservas", 
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: false,
  },
});
sequelize 
  .authenticate()
  .then(function (err) {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

export default sequelize;