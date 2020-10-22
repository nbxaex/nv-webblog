module.exports = (sequelize, DataTypes) => {
    const Buy = sequelize.define('Buy', {
        itemid: DataTypes.STRING,
        userid: DataTypes.STRING,
        qty: DataTypes.STRING,
        status: DataTypes.STRING,
        itemtitle: DataTypes.STRING,
        username: DataTypes.STRING,
        userlastname: DataTypes.STRING,
    })
    return Buy
}