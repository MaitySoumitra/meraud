export const TESTIMONIALS_QUERY = `#graphql
  query Testimonials {
    testimonials: metaobjects(type: "testimonials", first: 10) {
      edges {
        node {
          id
          handle
          testimg: field(key: "testimg") {
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
          testcont: field(key: "testcont") {
            value
          }
          testauth: field(key: "testauth") {
            value
          }
        }
      }
    }
  }
` as const;
