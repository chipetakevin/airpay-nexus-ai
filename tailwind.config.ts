
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'montserrat': ['Montserrat', 'sans-serif'],
				'roboto': ['Roboto', 'sans-serif'],
				'open-sans': ['Open Sans', 'sans-serif'],
				'source-sans': ['Source Sans Pro', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				toggle: {
					enabled: 'hsl(var(--toggle-enabled))',
					'enabled-foreground': 'hsl(var(--toggle-enabled-foreground))',
					disabled: 'hsl(var(--toggle-disabled))',
					'disabled-foreground': 'hsl(var(--toggle-disabled-foreground))',
					background: 'hsl(var(--toggle-background))',
					'track-enabled': 'hsl(var(--toggle-track-enabled))',
					'track-disabled': 'hsl(var(--toggle-track-disabled))',
					thumb: 'hsl(var(--toggle-thumb))'
				},
				feature: {
					'enabled-bg': 'hsl(var(--feature-enabled-bg))',
					'enabled-border': 'hsl(var(--feature-enabled-border))',
					'enabled-text': 'hsl(var(--feature-enabled-text))',
					'disabled-bg': 'hsl(var(--feature-disabled-bg))',
					'disabled-border': 'hsl(var(--feature-disabled-border))',
					'disabled-text': 'hsl(var(--feature-disabled-text))',
					'pending-bg': 'hsl(var(--feature-pending-bg))',
					'pending-border': 'hsl(var(--feature-pending-border))',
					'pending-text': 'hsl(var(--feature-pending-text))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
				'safe-left': 'env(safe-area-inset-left)',
				'safe-right': 'env(safe-area-inset-right)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: any) {
			addUtilities({
				'.safe-area-pt': {
					'padding-top': 'env(safe-area-inset-top)'
				},
				'.safe-area-pb': {
					'padding-bottom': 'env(safe-area-inset-bottom)'
				},
				'.safe-area-pl': {
					'padding-left': 'env(safe-area-inset-left)'
				},
				'.safe-area-pr': {
					'padding-right': 'env(safe-area-inset-right)'
				}
			})
		}
	],
} satisfies Config;
