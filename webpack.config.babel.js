import HtmlWebpackPlugin from 'html-webpack-plugin'

const config = {
  entry: {
    alice: './alice.js',
    bob: './bob.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['alice'],
      filename: 'alice.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['bob'],
      filename: 'bob.html'
    })
  ]
}

export default [config]
