import User from '../models/User';

const baseRoute = '/api/v1';

export default app => {
  app.get(`${baseRoute}/users`, async (req, res) => {
    try {
      const data = await User.find();
      res.status(200).json(data);
    } catch (err) {
      res.json({ error: true });
    }
  });

  app.get(`${baseRoute}/users/:id`, async (req, res) => {
    const id = req.params.id;
    let data = null;
    try {
      const data = await User.findById(id);
      res.status(200).json(data);
    } catch (err) {
      res.json({ error: true });
    }
  });

  app.post('/api/v1/users', (req, res) => {
    console.log(req.body);
    res.json(req.body);

    /* const data = {
      firstName: req.params.firstName,
      lastName: req.params.lastName
    };
    console.log(req.params);
    try {
      await User.create(data);
      res.status(200).json(data);
    } catch (err) {
      res.json({ error: true });
    } */
  });
};
