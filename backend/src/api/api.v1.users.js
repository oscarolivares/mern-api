import User from '../models/User';

const baseRoute = '/api/v1/users';

export default app => {
  // Get all users
  app.get(`${baseRoute}`, async (req, res) => {
    try {
      const result = await User.find();
      res.status(200).json(result);
    } catch (err) {
      res.json(err);
    }
  });

  // Get user by id
  app.get(`${baseRoute}/:id`, async (req, res) => {
    const id = req.params.id;
    if (id) {
      try {
        const result = await User.findById(id);
        res.status(200).json(result);
      } catch (err) {
        res.json(err);
      }
    } else {
      res.json({
        errors: true,
        message: 'Required data was not provided'
      });
    }
  });

  // Create an user
  app.post(`${baseRoute}`, async (req, res) => {
    // Check if required data by the model is set
    if (req.body.firstname) {
      const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
      };

      try {
        const result = await User.create(data);
        res.status(200).json(result);
      } catch (err) {
        res.json(err);
      }
    } else {
      res.json({
        errors: true,
        message: 'Required data was not provided'
      });
    }
  });

  // Replace an entire user with the input data
  // or create if not exist
  app.put(`${baseRoute}/:id`, async (req, res) => {
    const id = req.params.id;

    // Check if required data by the model is set
    if (id && req.body.firstname) {
      const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
      };

      try {
        const result = await User.replaceOne({ _id: id }, data, {
          upsert: true
        });
        res.status(200).json(result);
      } catch (err) {
        res.json(err);
      }
    } else {
      res.json({
        errors: true,
        message: 'Required data was not provided'
      });
    }
  });

  // Update some fields of an user
  app.patch(`${baseRoute}/:id`, async (req, res) => {
    const id = req.params.id;

    if (id) {
      const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age
      };

      try {
        const result = await User.findByIdAndUpdate(id, data, {
          // return the new object
          new: true,
          // skip empty fields before sending them to the db
          omitUndefined: true
        });
        res.status(200).json(result);
      } catch (err) {
        res.json(err);
      }
    } else {
      res.json({
        errors: true,
        message: 'Required data was not provided'
      });
    }
  });

  // Delete an user
  app.delete(`${baseRoute}/:id`, async (req, res) => {
    const id = req.params.id;

    try {
      const result = await User.findByIdAndDelete(id);
      res.status(200).json(result);
    } catch (err) {
      res.json(err);
    }
  });
};
