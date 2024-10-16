module.exports = {
    apps: [
      {
        name: 'hobohippie',
        script: './server.js',
        instances: 'max',
        exec_mode: 'cluster',
        watch: true,
        env: {
          NODE_ENV: 'development',
          PORT: 5000,
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 5000,
        },
      },
    ],
  };
  
