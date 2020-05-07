import axios from 'axios';

module.exports = app => {

    const Products = app.db.models.Products;

    app.route('/products')
        .get((req, res) => {
            Products.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        })
        .post((req, res) => {
            axios.get(`${req.body.image}`)
                .then( () =>
                    Products.create(req.body)
                        .then(result => { response => res.json(result) })
                        .catch(error => {
                            res.status(412).json({ message: error.message });
                        })
                )
                .catch(error => {
                    res.status(412).json({ message: 'Imagem inválida' });
                })

        })

    app.route('/products/:id')
        .get((req, res) => {
            Products.findOne({ where: req.params })
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
        .put((req, res) => {
            Products.update(req.body, { where: req.params })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })
        .delete((req, res) => {
            Products.destroy({ where: req.params })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ message: error.message });
                });
        })


};