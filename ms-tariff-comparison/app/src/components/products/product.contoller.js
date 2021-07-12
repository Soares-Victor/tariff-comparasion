const service = require('./product.service')

exports.createProduct = (req, res) => {
    service.createProduct(req.body)
        .then(value => res.send('Product created!'))
        .catch(reason => res.status(500).message('Error: ' + reason));
}

exports.findAllProduct = (req, res) => {
    service.findAllProduct()
        .then(value => res.send(value))
        .catch(reason => res.status(500).message('Error: ' + reason));
}

exports.deleteById = (req, res) => {
    service.deleteById(req.params.id)
        .then(r => {
            if (!r)
                return res.send(`Id ${req.params.id} not found!`)
            res.send(`Id ${req.params.id} deleted!`)
        })
        .catch(reason => res.status(500).send('Error: ' + reason));
}

exports.updateById = async (req, res) => {
    return await service.update(req.params.id, req.body)
        .then(value => {
            if (!value)
                return res.status(404).message(`Id ${req.params.id} not found!`)
            res.send(`Product ${req.params.id} updated!`)
        }).catch(reason => res.status(500).send('Error: ' + reason));
}