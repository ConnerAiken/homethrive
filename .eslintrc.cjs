module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-explicit-any': 0,
        'react/no-multi-comp': 2,
        'react/jsx-pascal-case': 2,
        'react/react-in-jsx-scope': 0,
        'no-console': 0,
        'react/no-unescaped-entities': 0,
        'max-len': ['error', { code: 100 }],
    },
    plugins: ['mozilla', 'react', '@typescript-eslint', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:mozilla/recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    settings: {
        react: {
            version: 'detect',
        },
    },
};
