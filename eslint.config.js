import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';

const reactCodeFiles = ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'];

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
        files: reactCodeFiles,
        plugins: { 'react-refresh': reactRefresh },
        rules: {
            'react-refresh/only-export-components': 'warn',
        },
    },
    {
        // This is in beta, so it will probably change. Keep an eye on it.
        files: reactCodeFiles,
        ...reactHooks.configs.recommended,
        plugins: { 'react-hooks': reactHooks },
    },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/method-signature-style': ['error', 'property'],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
            '@typescript-eslint/restrict-template-expressions': ['warn', { allowNumber: true }],
            '@typescript-eslint/unbound-method': 'warn',
        }
    }
);
