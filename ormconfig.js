module.exports = [
    {
        "type": "mssql",
        "host": process.env.DATABASE_HOST,
        "username": process.env.DATABASE_USERNAME,
        "password": process.env.DATABASE_PASSWORD,
        "port": parseInt(process.env.DATABASE_PORT, 10),
        "database": process.env.DATABASE_DATABASE,
        "extra": {
            "options": {
                "encrypt": process.env.DATABASE_ENCRYPY === "yes" ? true: false
            }
        },
        "synchronize": false,
        "migrationsRun": true,
        "logging": true,
        "logger": "simple-console",
        "entities": ["src/server/**/*.entity.ts"],
        "migrations": ["dist/db/migrations/**/*.js"],
        "subscribers": ["dist/db/subscribers/**/*.js"],
        "cli": {
            "migrationsDir": "src/db/migrations",
            "subscribersDir": "src/db/subscribers"
        }
    }
]