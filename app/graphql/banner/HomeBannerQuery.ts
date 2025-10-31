export const HOME_BANNER_QUERY = `#graphql
query HomeBanner {
  homeBanner: metaobject(handle: { handle: "home-hero", type: "home_banner" }) {
    homeimg: field(key: "homeimg") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
  }
}
`;
