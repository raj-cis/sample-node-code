const dbUrl = "mongodb://localhost:27017/codeTest";
const testDbUrl = "mongodb://localhost:27017/codeTestTesting";

const settings = env => {
  const StorageConnectionString = env === 'test' ? testDbUrl : dbUrl;
  return { StorageConnectionString };
}
const config = process.env.NODE_ENV === 'dev' ? settings('dev') : settings('test');

module.exports = config