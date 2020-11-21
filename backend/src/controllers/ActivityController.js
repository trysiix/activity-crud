const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async create(request, response) {
        const { name, type, priority, description, date } = request.body;

        const activity_id = crypto.randomBytes(4).toString('HEX');

        if(name.length > 25 || description.length > 120){
            return response.status(401).json({ error: 'Operation not permitted, name or description exceeded character limit' });
        }

        const [id] = await connection('activitys').insert({
            activity_id,
            name,
            type,
            priority,
            description,
            date,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('activitys').where('activity_id', id).delete();

        return response.status(204).send({sucess:`Activity:${id} successfully deleted`});
    },

    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('activitys').count();

        const activitys = await connection('activitys').select('*')
        .limit(10)
        .offset((page - 1) * 10);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(activitys);
    },

    async update(request, response) {
        const { id } = request.params;
        const { name, type, priority, description, date } = request.body;

        const activity = await connection('activitys').where('activity_id', id).update({
            name,
            type,
            priority,
            description,
            date,
        });

        return response.json(activity);
    },
}