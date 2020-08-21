const { request } = require('express');

const fileDAO = new (require('../../models/File'))();

module.exports = {

	async upload(req, res) {

		const { originalname: name, size, filename: key } = req.file;

		const now = new Date();
		try {

			file = {
				name: name,
				size: size,
				key: key,
				url: '',
			}
			await fileDAO.inserir({ createdAt: now, ...file });

		
			res.send();
		} catch (err) {
			console.log(err);
			res.status(500).send(err);
		}


	},
}