export const LEARN_FROM_ANYWHERE_QUERY = `#graphql
query LearnFromAnywhere {
  learnFromAnywhere: metaobject(
    handle: { handle: "learn-from-anywhere", type: "learning" }
  ) {
    mobile: field(key: "mobile") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    desktop: field(key: "desktop") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    learntitle: field(key: "learntitle") {
      value
    }
    learncont: field(key: "learncont") {
      value
    }
  }
}
` as const;
