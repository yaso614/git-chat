const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD, NODE_ENV } = process.env;
const MONGO_URL = `mongodb+srv://${MONGO_ID}:${MONGO_PASSWORD}@cluster0-a2ure.mongodb.net/test?retryWrites=true`;

module.exports = () => {
  const connect = () => {
    (NODE_ENV !== 'production') && mongoose.set('debug', true);
    mongoose.connect(MONGO_URL, {
      dbName: 'gifchat',
      useNewUrlParser: true
    }, (err) => {
      err && console.error("몽고디비 연결에러: ", err);
      err || console.log("몽고디비 연결성공");
    });
  };

  connect();

  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 error', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겨서 재연결 시도!');
    connect();
  });

  require('./chat');
  require('./room');
}

