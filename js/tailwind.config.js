tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "rgb(var(--color-primary) / <alpha-value>)",
                "on-primary": "rgb(var(--color-on-primary) / <alpha-value>)",
                "primary-container": "rgb(var(--color-primary-container) / <alpha-value>)",
                "on-primary-container": "rgb(var(--color-on-primary-container) / <alpha-value>)",
                "background": "rgb(var(--color-background) / <alpha-value>)",
                "on-background": "rgb(var(--color-on-background) / <alpha-value>)",
                "surface": "rgb(var(--color-surface) / <alpha-value>)",
                "surface-variant": "rgb(var(--color-surface-variant) / <alpha-value>)",
                "on-surface": "rgb(var(--color-on-surface) / <alpha-value>)",
                "on-surface-variant": "rgb(var(--color-on-surface-variant) / <alpha-value>)",
                "outline": "rgb(var(--color-outline) / <alpha-value>)",
                "outline-variant": "rgb(var(--color-outline-variant) / <alpha-value>)",
                "secondary": "rgb(var(--color-secondary) / <alpha-value>)",
                "on-secondary": "rgb(var(--color-on-secondary) / <alpha-value>)"
            },
            fontFamily: {
                "headline": ["Montserrat", "sans-serif"],
                "body": ["Plus Jakarta Sans", "Poppins", "sans-serif"],
                "label": ["Plus Jakarta Sans", "sans-serif"]
            }
        }
    }
}
