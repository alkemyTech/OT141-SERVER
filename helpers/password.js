const bcrypt = require("bcryptjs");

const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const compare = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = {encrypt, compare}