  module.exports = {
    apps: [
      {
        name: 'hobohippie',
        script: './server.js',
        instances: 'max',
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