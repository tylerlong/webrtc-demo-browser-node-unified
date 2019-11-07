import HtmlWebpackPlugin from 'html-webpack-plugin'

const config = {
  entry: {
    index: './index.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}

export default [config]
