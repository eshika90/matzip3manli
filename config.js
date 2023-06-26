const variable = {
  db: {
    host: 'express-database.chsegd7gavec.ap-northeast-2.rds.amazonaws.com',
    username: 'root',
    password: 'sparta1234',
    database: 'matzip_3manli',
  },
  jwt: {
    secretKey: 'matzip-3manli',
    expireIn: '1d',
  },
  port: 3030,
};

module.exports = variable;
