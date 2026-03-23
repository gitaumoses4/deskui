import type { OSTheme } from './types'

export const defaultTheme: OSTheme = {
  name: 'deskui',

  windowChrome: {
    borderRadius: '12px',
    titlebarHeight: 42,
    titlebarBg: 'rgba(255, 255, 255, 0.82)',
    titlebarBgUnfocused: 'rgba(255, 255, 255, 0.65)',
    titlebarTextColor: '#1c1c1e',
    controlStyle: 'traffic-lights',
    controlsPosition: 'left',
    shadow: '0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
    shadowFocused: '0 8px 40px rgba(0, 0, 0, 0.14), 0 1px 3px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    glassBg: 'rgba(255, 255, 255, 0.72)',
    glassBlur: 'blur(24px)',
  },

  dock: {
    position: 'bottom',
    height: 64,
    itemSize: 44,
    gap: 6,
    bg: 'rgba(255, 255, 255, 0.18)',
    blur: 'blur(24px)',
    borderRadius: '18px',
    padding: '6px 10px',
    magnification: false,
    runningIndicatorColor: 'rgba(255, 255, 255, 0.7)',
  },

  taskbar: {
    position: 'bottom',
    height: 44,
    bg: 'rgba(255, 255, 255, 0.12)',
    blur: 'blur(24px)',
    itemActiveBg: 'rgba(255, 255, 255, 0.12)',
    textColor: '#ffffff',
  },

  desktop: {
    iconSize: 56,
    iconLabelColor: '#ffffff',
    iconLabelShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
    iconSelectedBg: 'rgba(255, 255, 255, 0.15)',
    gridGap: 14,
    gridPadding: '24px',
  },

  animation: {
    windowOpen: {
      initial: { opacity: 0, scale: 0.92, y: 12 },
      animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] },
      },
    },
    windowClose: {
      exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.12, ease: 'easeIn' },
      },
    },
    windowMinimize: {
      exit: { opacity: 0, scale: 0.5, y: 150, transition: { duration: 0.2 } },
    },
    dockBounce: {
      animate: {
        y: [0, -16, 0, -8, 0],
        transition: { duration: 0.4, ease: 'easeInOut' },
      },
    },
  },

  tokens: {
    'font-family': 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    'accent-color': '#6366f1',
  },
}
