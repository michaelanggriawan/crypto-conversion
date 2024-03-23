export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3001,
  URI: process.env.URI || 'https://api.coingecko.com/api/v3/',
});
