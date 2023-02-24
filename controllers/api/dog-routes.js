const router = require('express').Router();
const { Owner, Dog } = require('../../models');

// The `/api/dogs` endpoint

router.get('/', (req, res) => {
  // find all dogs, include their owners
  Dog.findAll({
    include: Owner
  })
  .then((dogs) => {
    res.status(200).json(dogs);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one dog by its `id` value, include their owners
  Dog.findOne({
    where: {id: req.params.id},
    include: Owner
  })
  .then((dog) => {
    res.status(200).json(dog);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new dog
  Dog.create(req.body)
  .then((dog) => {
    res.status(200).json(dog);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a dog by its `id` value
  Dog.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((dog) => {
    res.status(200).json(dog);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a dog by its `id` value
  Dog.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dog) => {
    res.status(200).json(dog);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

module.exports = router;