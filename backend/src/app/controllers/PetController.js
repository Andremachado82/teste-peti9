const Pet = require("../models/Pet");
const moment = require("moment");

module.exports = {
  async store(req, res) {
    const { nome, especie, porte } = req.body;

    const nascimento = moment(
      `${req.body.nascimento}`,
      "DD/MM/YYYY HH:mm"
    ).format("MM/DD/YYYY HH:mm");

    if (nome.length < 2) {
      return res.status(401).json("Insira mais de uma letra");
    }
    const pet = await Pet.create({ nome, especie, porte, nascimento });

    return res.json(pet);
  },

  async find(req, res) {
    const id = req.params.id;
    const pet = await Pet.findOne({ where: { id } });

    pet.dataValues.nascimentoFormatado = new Date(
      pet.dataValues.nascimento
    ).toLocaleDateString("pt-BR");

    return res.json(pet);
  },

  async index(req, res) {
    try {
      const pets = await Pet.findAll();

      const newPets = pets.map(pet => {
        pet.dataValues.nascimentoFormatado = new Date(
          pet.dataValues.nascimento
        ).toLocaleDateString("pt-BR");

        const dateStart = moment(pet.nascimento);
        const dateEnd = moment();

        const diff = moment.duration(dateEnd.diff(dateStart));

        pet.dataValues.idade = `${diff._data.years} anos, ${diff._data.months} meses e ${diff._data.days} dias`;

        return pet;
      });
      return res.json(newPets);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  async update(req, res) {
    const id = req.params.id;
    const petUpdated = await Pet.findOne({ where: { id } });

    if (petUpdated === null || petUpdated.status !== "Ativo") {
      return res.status(401).json("Pet não encontrado");
    }

    req.body.nascimento = moment(
      `${req.body.nascimento}`,
      "DD/MM/YYYY HH:mm"
    ).format("MM/DD/YYYY HH:mm");

    await petUpdated.update(req.body, {
      new: true
    });

    return res.json({ message: "Pet atualizado com sucesso", petUpdated });
  },

  async delete(req, res) {
    const deleted = await Pet.destroy({ where: { id: req.params.id } });

    if (deleted) {
      return res.status(200).json("Pet deletado");
    }
    return res.status(500).json("Pet não encontrado");
  }
};
