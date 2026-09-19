const BaseRepository = require("./BaseRepository");

class UserRepository extends BaseRepository {

    async create(user) {

        const result = await this.query(
            `
            INSERT INTO users
            (
                first_name,
                last_name,
                email,
                password_hash,
                role,
                is_verified,
                is_active
            )
            VALUES
            (
                ?,?,?,?,?,?,?
            )
            `,
            [
                user.first_name,
                user.last_name,
                user.email,
                user.password_hash,
                user.role,
                user.is_verified,
                user.is_active
            ]
        );

        return result.insertId;
    }

    async findByEmail(email) {

        return await this.findOne(
            `
            SELECT *
            FROM users
            WHERE email=?
            `,
            [email]
        );

    }

    async findById(id) {

        return await this.findOne(
            `
            SELECT *
            FROM users
            WHERE id=?
            `,
            [id]
        );

    }

    async updateLastLogin(id) {

        await this.query(
            `
            UPDATE users
            SET last_login_at=NOW()
            WHERE id=?
            `,
            [id]
        );

    }

}

module.exports = new UserRepository();