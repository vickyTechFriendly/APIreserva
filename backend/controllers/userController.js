import User from "../models/users.js";
import bcrypt from "bcrypt";
import Reservation from "../models/reservations.js";

const getAll = async (req, res) => {
    try {
        let users = await User.findAll({
            attributes: [
                "user_id",
                "email",
                "name",
                "role",
                "lastName",
                "telephone",
                "organization",
            ],
        });
        res.send(users);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving users",
        });
    }
};

const getById = async (req, res) => {
    try {
        const user_id = req.params.id;
        let users = await User.findByPk(user_id,{
            attributes: [
                "user_id",
                "email",
                "name",
                "role",
                "lastName",
                "telephone",
                "organization",
            ],
            include: [{
                model: Reservation,
                attributes: [
                    "reservation_id",
                    "participants",
                    "status",
                    "notification",
                    "startReservation",
                    "length",
                    "frequency",
                    "daysOfWeek",
                    "endReservation",
                    "comment",
                    "room_id",
                ],
            }],
        });
        res.send(users);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Error retrieving users",
        });
    }
};

//create user
const create = async (req, res) => {
    {
        try {
          const oldUser = await User.findOne({ where: { email: req.body.email } });
          if (oldUser) {
            res.status(400).send("El usuario ya existe");
            return;
          }
          // Verificar si el correo electrónico es válido
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(req.body.email)) {
            res.status(400).send("Por favor, introduce un correo electrónico válido");
            return;
          }
          // Verificar si la contraseña cumple los requisitos
          const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
          if (!passwordRegex.test(req.body.password)) {
            res
              .status(400)
              .send(
                "La contraseña debe contener al menos una letra mayúscula, un número y tener una longitud mínima de 6 caracteres"
              );
            return;
          }
      
          const password = await bcrypt.hash(req.body.password, 10);
      
          const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
            telephone: req.body.telephone,
            lastName: req.body.lastName,
            organization: req.body.organization,
            role: req.body.role,
          });
          res.send(user);
        } catch (error) {
          res.status(500).send({
            message: error.message || "Ocurrió un error al obtener los usuarios.",
          });
        }
      };
    }

//edit user
const edit = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.telephone = req.body.telephone;
            user.lastName = req.body.lastName;
            user.organization = req.body.organization;
            user.role = req.body.role;
            const updatedUser = await user.save();
            res.send(updatedUser);
        }
        else {
            res.status(404).send({
                message: `User with id ${req.params.id} is not found`,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: error.message || `Error updating user with id ${req.params.id}`,
        });
    }
};

//delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.send({
                message: `User with id ${req.params.id} deleted successfully`,
            });
        }
        else {
            res.status(404).send({
                message: `User with id ${req.params.id} is not found`,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: error.message || `Error deleting user with id ${req.params.id}`,
        });
    }
}

export default {
    getAll,
    getById,
    create,
    edit,
    deleteUser,
};