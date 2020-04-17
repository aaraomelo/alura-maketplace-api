require('dotenv').config()
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

module.exports = app => {

    const Users = app.db.models.Users;

    app.route('/users')
        .post((req, res) => {
            if (req.body.password.length>=6)
                req.body.password = bcrypt.hashSync(req.body.password, 8);
            Users.create(req.body)
                .then(user => {
                    const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SUPERSECRET, { expiresIn: 86400 });
                    res.status(200).send({ token })
                })
                .catch(error => {
                    res.status(412).json({  token: null, message: error.message });
                });
        })

    app.route('/users/login')
        .post((req, res) => {
            Users.findOne({ where: { email: req.body.email } })
                .then(async user => {
                    const passwordIsValid = await bcrypt.compare(req.body.password, user.password)
                    if (!passwordIsValid)
                        return res.status(401).send({ auth: false, token: null, message: 'Senha inválida' });
                    const token = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SUPERSECRET, { expiresIn: 86400 });
                    res.status(200).send({ token });
                })
                .catch(error => {
                    res.status(401).json({ message: 'Este email não está cadastrado' });
                });
        })

    app.get('/users', app.authenticationToken, (req, res) => {
        Users.findOne({ where: { email: req.user.email } })
            .then(user => res.json(user))
            .catch(error => {
                res.status(412).json({ message: error.message });
            });

    })

    // app.route('/users/:id')
    //     .get((req, res) => {
    //         Users.findOne({ where: req.params })
    //             .then(result => res.json(result))
    //             .catch(error => {
    //                 res.status(412).json({ message: error.message });
    //             });

    //     })
    //     .delete((req, res) => {
    //         Users.destroy({ where: req.params })
    //             .then(result => res.sendStatus(204))
    //             .catch(error => {
    //                 res.status(412).json({ message: error.message });
    //             });
    //     })
    //     .put((req, res) => {
    //         Users.update(req.body, { where: req.params })
    //             .then(result => res.sendStatus(204))
    //             .catch(error => {
    //                 res.status(412).json({ message: error.message });
    //             });
    //     })
};