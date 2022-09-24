/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 *
 * base64,aspectRatio,src,srcSet,srcSetType,sizes,originalImg,originalName,density,presentationWidth,presentationHeight,tracedSVG
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Centre for Ideology and Discourse Analysis",
  },
  /* Your site config here */
  pathPrefix: "",
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/src/content/`,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1000,
              showCaptions: ["title", "alt"],
              // Make sure that images are not too high
              wrapperStyle: fluidResult =>
                `max-width:${
                  fluidResult.aspectRatio * 600
                }px; margin: auto; text-align: center`,
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "nofollow noopener noreferrer",
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: videoId =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ], //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
          "gatsby-remark-responsive-iframe", //Optional: Must be loaded after gatsby-remark-embed-video
        ],
      },
    },
    "gatsby-plugin-image",
    {
      resolve: "gatsby-plugin-sharp",
      options: {
        defaults: {
          quality: 100,
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-twitter",
      options: {
        credentials: {
          consumer_key: process.env.TWITTER_API_KEY,
          consumer_secret: process.env.TWITTER_API_SECRET,
          bearer_token: process.env.TWITTER_BEARER_TOKEN,
        },
        queries: {
          timeline: {
            endpoint: "statuses/user_timeline",
            params: {
              screen_name: "cIDA_essex",
              include_rts: true,
              exclude_replies: true,
              tweet_mode: "extended",
            },
          },
        },
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sass",
  ],
}
