import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    plugins: [pluginTypeCheck(), pluginReact()],
    output: {
      filename: isBuild
        ? {
            js: '[contenthash].js',
            css: '[contenthash].css',
            svg: '[contenthash].svg',
            font: '[contenthash][ext]',
            image: '[contenthash][ext]',
            media: '[contenthash][ext]',
            assets: '[contenthash][ext]',
          }
        : undefined,
      target: 'web',
    },
    html: {
      template: './index.html',
    },
    performance: {
      bundleAnalyze: process.env.BUNDLE_ANALYZE
        ? {
            analyzerMode: 'server',
            openAnalyzer: true,
          }
        : {
            analyzerMode: 'disabled',
          },
    },
  };
});
