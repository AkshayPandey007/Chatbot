const { Configuration } = require("openai");

require("dotenv").config()


 const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPENAI_ORAGANIZATION_ID,
  });
  return config;
};

module.exports ={
  configureOpenAI
}
