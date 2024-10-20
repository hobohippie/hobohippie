  module.exports = {
    apps: [
      {
        name: 'Hobohippie-Backend',
        script: './server.js',
        instances: '1',
        exec_mode: 'cluster', 
        watch: process.env.NODE_ENV !== 'production',
        env: {
          NODE_ENV: 'development',
          PORT: 3000,
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 3000,
        },
      },
    ],
  };