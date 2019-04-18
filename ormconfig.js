module.exports = [
    {
        "type": "mssql",
        "url": process.env.DATABASE_URL,
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