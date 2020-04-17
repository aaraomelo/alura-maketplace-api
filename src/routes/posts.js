module.exports = app => {

    const Posts = app.db.models.Posts;

    app.route('/posts')
        .get((req, res) => {
            Posts.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
        .post((req, res) => {
            Posts.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })

    app.route('/posts/:id')
        .get((req, res) => {
            Posts.findOne({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
        .put((req, res) => {
            Posts.update(req.body, { where: req.params })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
        .delete((req, res) => {
            Posts.destroy({ where: req.params })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
};