export const QUALITY_NECKLACE_QUERY = `#graphql
query QualityNecklace {
  qualityNecklace: metaobject(handle: {handle: "quality-necklace", type: "quality"}) {
    qtitle: field(key: "qtitle") {
      value
    }
    microphone: field(key: "microphone") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    speakerone: field(key: "speakerone") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    notify: field(key: "notify") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    locket: field(key: "locket") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    speakertwo: field(key: "speakertwo") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    volume: field(key: "volume") {
      reference {
        ... on MediaImage {
          image {
            url
            altText
          }
        }
      }
    }
    light: field(key: "light") {
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
` as const;
