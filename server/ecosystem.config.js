module.exports = {
  apps: [
    {
      name: 'Hobohippie-Backend',
      script: './server.js', 
      instances: 'max',
      exec_mode: 'cluster',
      watch: process.env.NODE_ENV !== 'production',
      ignore_watch: ['uploads', 'package-lock.json', 'node_modules'],
      env: {
        NODE_ENV: 'development', 
        PORT: 3000, 
        MONGODB_URI: process.env.MONGODB_URI
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        MONGODB_URI: process.env.MONGODB_URI
      },
    },
  ],
};
