module.exports = {
  default: {
    require: [
      'tests/steps/*.ts',
      'tests/support/*.ts' // include hooks and world
    ],
    format: ['@cucumber/pretty-formatter'],
    paths: ['tests/features/*.feature'],
    requireModule: ['ts-node/register']
  }
};