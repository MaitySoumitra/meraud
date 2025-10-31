export const BANNER_GRID_QUERY = `#graphql
  query BannerGrid {
    bannerGrid: metaobject(handle: { handle: "banner-grid", type: "banner_grid" }) {
      gridoneimg: field(key: "gridoneimg") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
      gridtwoimg: field(key: "gridtwoimg") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
` as const;
