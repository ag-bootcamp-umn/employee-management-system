const db = require('../config/connect');

class Queries {
    constructor() {

    }

    async retrieve(table) {
        const retrieval = await db.promise().query(`SELECT * FROM ${table};`, (err, data) => {
            if (err) console.log(err);
            console.log(data);
            return data;
        });
        return retrieval;
    }

    
}

module.exports = Queries;