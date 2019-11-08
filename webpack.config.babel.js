import HtmlWebpackPlugin from 'html-webpack-plugin'

const config = {
  entry: {
    alice: './alice.js',
    bob: './bob.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['alice'],
      filename: 'alice.html',
      template: './alice.html'
    }),
    new HtmlWebpackPlugin({
      chunks: ['bob'],
      filename: 'bob.html',
      template: './bob.html'
    })
  ]
}

export default [config]
