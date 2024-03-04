import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import deadFile from 'vite-plugin-deadfile';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react({ jsxImportSource: '@emotion/react' }),
		svgrPlugin(),
		{
			name: 'custom-hmr-control',
			handleHotUpdate({ file, server }) {
				if (file.includes('src/app/configs/')) {
					server.ws.send({
						type: 'full-reload'
					});
					return [];
				}
				return;
			}
		},
		deadFile({
			root: 'src'
		})
	],
	build: {
		rollupOptions: {
			external: new RegExp('.*~$')
		}
	},
	server: {
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:5000',
				changeOrigin: true
				// rewrite: (path) => path.replace(/^\/api/, ''),
			}
		}
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: 'src/setupTests',
		mockReset: true
	},
	define: {
		global: 'window'
	},
	resolve: {
		alias: {
			'@': '/src',
			src: '/src',
			'@fuse': '/src/@fuse',
			'@history': '/src/@history',
			'@lodash': '/src/@lodash',
			'@mock-api': '/src/@mock-api',
			'@schema': '/src/@schema',
			'app/AppContext': '/src/app/AppContext',
			'app/auth': '/src/app/auth',
			'app/config': '/src/app/config',
			// typo in some fuse files
			'app/configs': '/src/app/config',
			'app/shared-components': '/src/app/shared-components',
			'app/store': '/src/app/store',
			'app/theme-layouts': '/src/app/theme-layouts'
		}
	},
	optimizeDeps: {
		include: [
			'@emotion/cache',
			'@emotion/react',
			'@emotion/styled',
			'@mui/base',
			'@mui/icons-material',
			'@mui/material',
			'@mui/styles',
			'@mui/system',
			'@mui/utils',
			'lodash'
		],
		exclude: [],
		esbuildOptions: {
			loader: {
				'.js': 'jsx'
			}
		}
	}
});
