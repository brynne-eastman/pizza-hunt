const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
      Pizza.find({})
        .populate({
          path: 'comments',
          select: '-__v'
      })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one pizza by id
    getPizzaById({ params }, res) {
      Pizza.findOne({ _id: params.id })
        .populate({
          path: 'comments',
          select: '-__v'
      })
        .select('-__v')
        .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },

    // createPizza - POST /api/pizzas
    createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
    },

    // update pizza by id - PUT /api/pizzas/:id
    updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true }) //If we don't set that third parameter, { new: true }, it will return the original document. By setting the parameter to true, we're instructing Mongoose to return the new version of the document.
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
    },

    // delete pizza - DELETE /api/pizzas/:id
    deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
    }
}

module.exports = pizzaController;