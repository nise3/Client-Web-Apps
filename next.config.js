const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  const env = {
    title: (() =>
      isDev
        ? 'NISE3 - National Intelligence for Skills, Education, Employment and Entrepreneurship'
        : 'Nise3')(),
  };

  const images = {
    domains: ['images.unsplash.com'],
  };

  const rewrite = async () => {
    return [
      {
        source: '/hello',
        destination: 'youth',
      },
    ];
  };

  const typescript = {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  };

  const webpack = (config) => {
    config.module.rules.push({
      test: /\.cv.svg$/,
      type: 'asset/source',
    });
    return config;
  };

  return {
    env,
    images,
    rewrite,
    typescript,
    webpack,
  };
};
