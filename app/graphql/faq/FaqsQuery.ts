export const FAQS_QUERY = `#graphql
  query FaqSection {
    faqSection: metaobjects(type: "faqs", first: 7) {
      edges {
        node {
          id
          handle
          question: field(key: "question") {
            value
          }
          answer: field(key: "answer") {
            value
          }
        }
      }
    }
  }
` as const;
