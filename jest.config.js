module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/styleMock.js',
        'nav-(.*)-style': '<rootDir>/styleMock.js',
    },
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },
};
