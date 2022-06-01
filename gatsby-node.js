const { graphql } = require("gatsby")
const path = require("path")

exports.onCreateNode = async ({
  node,
  actions,
  store,
  getCache,
  createNodeId,
}) => {
  const { createNode, createNodeField } = actions

  const contentDir = path.resolve("./src/content")

  if (node.internal.type === "MarkdownRemark") {
    const fields = {
      category: path.dirname(path.relative(contentDir, node.fileAbsolutePath)),
      slug: path.basename(node.fileAbsolutePath, ".md").replace("_", "-"),
      sortYear: node.frontmatter.year || "1970",
    }
    for (const [name, value] of Object.entries(fields)) {
      createNodeField({ node, name, value })
    }
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const membersTemplate = require.resolve(`./src/templates/memberPage.js`)
  const eventsTemplate = require.resolve(`./src/templates/eventPage.js`)

  const queryResults = await graphql(`
    {
      members: allMarkdownRemark(
        filter: { fields: { category: { eq: "members" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      events: allMarkdownRemark(
        filter: { fields: { category: { eq: "whatson" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

  queryResults.data.members.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: membersTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })

  queryResults.data.events.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: eventsTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
