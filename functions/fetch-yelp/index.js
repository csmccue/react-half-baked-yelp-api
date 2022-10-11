const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.search;

  try {
    const response = await fetch(`https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&term=${search}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
      },
    });
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data.businesses)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      // body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
  // add code here to fetch data from yelp API
  // be sure to include the parameters from event.queryStringParameters
};

module.exports = { handler };
