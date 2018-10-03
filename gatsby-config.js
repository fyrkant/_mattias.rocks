// Prism.languages.typescript = Prism.languages.extend('javascript', {
// 	// From JavaScript Prism keyword list and TypeScript language spec: https://github.com/Microsoft/TypeScript/blob/master/doc/spec.md#221-reserved-words
// 	'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield|false|true|module|declare|constructor|namespace|abstract|require|type)\b/,
// 	'builtin': /\b(?:string|Function|any|number|boolean|Array|symbol|console)\b/
// });

// Prism.languages.ts = Prism.languages.typescript;

module.exports = {
  siteMetadata: {
    title: 'mattias.rocks'
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-less',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {           
              classPrefix: "language-",
            },
          },
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src`,
      }
    },
    // {
    //   resolve: `gatsby-source-graphcms`,
    //   options: {
    //     endpoint: `https://api.graphcms.com/simple/v1/cjcxxfzrv2avm0124y7molwz2`,
    //     token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MTcwOTI2OTQsImNsaWVudElkIjoiY2l2Z29zNmNqMDE5MjAxODRucDAxZGRkMiIsInByb2plY3RJZCI6ImNqY3h4ZnpydjJhdm0wMTI0eTdtb2x3ejIiLCJwZXJtYW5lbnRBdXRoVG9rZW5JZCI6ImNqY3h4dGo0bjI2ZDUwMTI3em9ubHNoaTkifQ.sbRHpzbPRkGedcQnyuaxlLnmRTzTJRN49dhZuz9m50E',
    //     query: `{
    //       allPosts {
    //         id
    //         title
    //         content
    //       }
    //     }`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: "GTM-TS37J8J",
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
      },
    },
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: "UA-67513221-1",
    //     // anonymize: true,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "mattias.rocks",
        short_name: "mattias.rocks",
        start_url: "/",
        background_color: "#6699cc",
        theme_color: "#f99157",
        display: "minimal-ui",
        icons: [
          {
            src: `/favicons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ]
      }
    },
    // {
    //   resolve: "gatsby-source-strava-activities",
    //   options: {
    //     // This is the "Access Token" from:
    //     // https://www.strava.com/settings/api
    //     authToken: 'f36dfd8911b584d0876e290390139ef871f723b1',
    //     // [Optional] An epoch timestamp to use for filtering activities that have taken place after a certain time.
    //     after: '',
    //     // An epoch timestamp to use for filtering activities that have taken place before a certain time.
    //     before: '',
    //    }
    // }
  ]
};
