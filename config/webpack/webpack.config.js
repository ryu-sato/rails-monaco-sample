// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const { generateWebpackConfig, merge } = require('shakapacker')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const customConfig = {
    module: {
        rules: [
            // Monaco Editor専用のCSS処理
            {
                test: /\.css$/,
                include: /node_modules\/monaco-editor/,
                use: ['style-loader', 'css-loader']
            },
            // Monaco EditorのTTFフォント処理
            {
                test: /\.ttf$/,
                include: /node_modules\/monaco-editor/,
                type: 'asset/resource'
            }
        ],
    },
    resolve: {
        extensions: ['.css']
    },
    plugins: [new MonacoWebpackPlugin()]
}

// generateWebpackConfigを呼び出す
const baseConfig = generateWebpackConfig()

// デフォルトのCSS処理からMonaco Editorを除外
const webpackConfig = merge(baseConfig, customConfig)

// デフォルトのCSSルールを修正
const cssRule = webpackConfig.module.rules.find(rule => 
    rule.test && rule.test.toString().includes('css')
)
if (cssRule && cssRule.exclude) {
    // 既存のexcludeがある場合は配列に変換
    cssRule.exclude = [].concat(cssRule.exclude, /node_modules\/monaco-editor/)
} else if (cssRule) {
    // excludeがない場合は新規作成
    cssRule.exclude = /node_modules\/monaco-editor/
}

module.exports = webpackConfig