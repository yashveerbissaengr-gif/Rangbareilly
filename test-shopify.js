const domain = "rangbareilly.myshopify.com";
const publicToken = "cc1146ec02462ffb8b8fdd46f0fd1ed6";
const version = "2024-01";

const query = `
  query getProducts {
    products(first: 5) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

fetch(`https://${domain}/api/${version}/graphql.json`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': publicToken,
  },
  body: JSON.stringify({ query }),
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
