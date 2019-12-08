//Define models
module.exports = function(Sequelize, db) {
    const item = db.define('item', {
        'id': {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        'item_unique_id': Sequelize.STRING,
        'name': Sequelize.STRING,
        'rfid_tag': Sequelize.STRING,
        'client_id': Sequelize.INTEGER,
            createdAt: {
                 field: 'created_at',
                 type: 'TIMESTAMP',
             },
             updatedAt: {
                 field: 'updated_at',
                 type: 'TIMESTAMP',
             }
     
    });
    return item;
};