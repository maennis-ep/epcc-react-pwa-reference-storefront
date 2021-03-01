
export const config = {
  clientId: process.env.REACT_APP_CLIENT_ID || 'CLIENT_ID',
  clientSecret: 'CLIENT_SECRET',
  stripeKey: process.env.REACT_APP_STRIPE_KEY || 'pk_test_YknKfRnn0FyonEJnRe4RClIp00k5zLjbOG',
  categoryPageSize: 8,
  maxCompareProducts: 4,
  algoliaAppId: process.env.REACT_APP_ALGOLIA_APP_ID || 'IE1ZNF8WAA',
  algoliaApiKey: process.env.REACT_APP_ALGOLIA_API_KEY || 'c8202a58b1ce81a1b7dc06e78d869d35',
  algoliaPlacesAppId: process.env.REACT_APP_ALGOLIA_PLACES_APP_ID || 'plFT2ZOVWLZD',
  algoliaPlacesApiKey: process.env.REACT_APP_ALGOLIA_PLACES_API_KEY || '5d635833ca18c279c60d69b06efc66ae',
  algoliaIndexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME || '2517043716422632107_product',
  compareKeys: process.env.REACT_APP_COMPARE_KEYS?.split(',') || [],
  endpointURL: process.env.REACT_APP_ENDPOINT_URL || 'epcc-integration.global.ssl.fastly.net',
  b2b: process.env.REACT_APP_B2B_ENABLE || false,
  supportedLocales: process.env.REACT_APP_SUPPORTED_LOCALES?.split(',').map(el => JSON.parse(el)) || [
    {
      "key": "en",
      "name": "english"
    },
    {
      "key": "fr",
      "name": "french"
    }
  ],
  defaultLanguage: process.env.REACT_APP_DEFAULT_LANGUAGE || "en",
  defaultCurrency: process.env.REACT_APP_DEFAULT_CURRENCY || "GBP",
};
