const Pet = require('../models/Pet');

module.exports = {
  async store(req, res) {
    const { nome, especie, porte, nascimento } = req.body;    

    if(nome.length < 2 ) {
      return res.status(401).json('Insira mais de uma letra');
    }  
    const pet = await Pet.create({ nome, especie, porte, nascimento});
    
    return res.json(pet);
  },

  async find(req, res) {
    const id  = req.params.id;
    const pet = await Pet.findOne({where: {id}});

    pet.dataValues.nascimentoFormatado = new Date(pet.dataValues.nascimento)
    .toLocaleDateString('pt-BR');
        
    return res.json(pet)
  },

  async index(req,res) {
    const pets = await Pet.findAll();
    const newPets = pets.map(pet => {
      pet.dataValues.nascimentoFormatado = new Date(pet.dataValues.nascimento)
      .toLocaleDateString('pt-BR');

      return pet;
    })
    return res.json(newPets)

  },

  async update(req, res) {  
    const id = req.params.id;
    const petUpdated = await Pet.findOne({where: {id}});
    
    if(petUpdated === null || petUpdated.status !== 'Ativo') {
      return res.status(401).json('Pet não encontrado');
    }

    await petUpdated.update(req.body, {
      new: true,
    });    
    
    return res.json({message: 'Pet atualizado com sucesso', petUpdated});
  },

  async delete(req, res) {
    const deleted = await Pet.destroy({where: {'id': req.params.id}});

    if(deleted) {
      return res.status(200).json('Pet deletado');
    }
      return res.status(500).json('Pet não encontrado');
  },
  
}