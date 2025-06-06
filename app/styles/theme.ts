export const theme = {
  colors: {
    brand: {
        bg: 'rgba(181, 255, 77, 0.2)',
        content: '#B5FF4D'
    },
    bg: {
        main: '#030303',
        secondaryDark: '#121212',
        secondary: '#171717',
        tertiaryShadow: '#262624',
        foreground: '#141414',
    },
    borderAlpha: {
        subtle: '#FFFFFF33',
        normal: '#FFFFFF33',
        strong: '#FFFFFF3D',
    },
    bgAlpha: {
        subtle: '#FFFFFF1A',
        normal: '#FFFFFF26',
        strong: '#FFFFFF33',
    },
    content: {
        disabled: '#666662',
        subdued: '#9D9D95',
        normal: '#CCCCC5',
        muted: '#E5E5DD',
        strongWhite: '#FFFFF6',
        loud: '#FFFFF6',
        black: '#030303',
        accent: '#B5FF4D',
    },
    success: {
        bg: 'rgba(73, 90, 242, 0.3)',
        content: '#495BF2',
    },
    error: {
        bg: 'rgba(254, 71, 74, 0.2)',
        content: '#FE474A',
    },
    alert:{
        bg: 'rgba(255, 173, 51, 0.2)',
        content: '#FFAD33',
    },
  },
  font: {
    heading: {
        fontWeight: '400',
        large: {
            fontSize: 36,
            lineHeight: 40,
        },
        medium: {
            fontSize: 30,
            lineHeight: 32,
        },
        small: {
            fontSize: 24,
            lineHeight: 28,
        },
        xSmall: {
            fontSize: 20,
            lineHeight: 24,
        },
    },
    label: {
        fontWeight: '500',
        large: {
            fontSize: 18,
            lineHeight: 20,
        },
        medium: {
            fontSize: 16,
            lineHeight: 20,
        },
        small: {
            fontSize: 14,
            lineHeight: 18,
        },
        xSmall: {
            fontSize: 12,
            lineHeight: 18,
        },
    },
    body: {
        fontWeight: '400',
        large: {
            fontSize: 18,
            lineHeight: 28,
        },
        medium: {
            fontSize: 16,
            lineHeight: 24,
        },
        small: {
            fontSize: 14,
            lineHeight: 20,
        },
        xSmall: {
            fontSize: 12,
            lineHeight: 18,
        },
    },
    mono: {
        fontWeight: '400',
        large: {
            fontSize: 18,
            lineHeight: 28,
        },
        medium: {
            fontSize: 16,
            lineHeight: 24,
        },
        small: {
            fontSize: 14,
            lineHeight: 20,
        },
        xSmall: {
            fontSize: 12,
            lineHeight: 18,
        },
    }
  }
} as const; 