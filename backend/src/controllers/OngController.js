const generationUniqueId = require('../utils/generationUniqueId');
const connection = require('../database/connection');

module.exports = {

	async index(req, res) {
		const ongs = await connection('ongs').select('*')
		res.json(ongs);
	},

	async create(req, res) {
		const { name, email, whatsapp, city, uf } = req.body;

		const id = generationUniqueId();

		await connection('ongs').insert({
			id,
			name,
			email,
			whatsapp,
			city,
			uf,
		});

		return res.json({ id });
	}
};