'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useOSStore } from '@/store/windowStore'
import { useOSContext } from '@/context/OSContext'

export function SnapPreview() {
  const snapPreview = useOSStore((s) => s.snapPreview)
  const { theme } = useOSContext()
  const dockHeight = theme.dock.height

  if (!snapPreview) return null

  const vw = window.innerWidth
  const vh = window.innerHeight - dockHeight
  const halfW = Math.round(vw / 2)
  const halfH = Math.round(vh / 2)

  const zoneStyles: Record<string, React.CSSProperties> = {
    left: { left: 0, top: 0, width: halfW, height: vh },
    right: { left: halfW, top: 0, width: halfW, height: vh },
    top: { left: 0, top: 0, width: vw, height: vh },
    'top-left': { left: 0, top: 0, width: halfW, height: halfH },
    'top-right': { left: halfW, top: 0, width: halfW, height: halfH },
    'bottom-left': { left: 0, top: halfH, width: halfW, height: halfH },
    'bottom-right': { left: halfW, top: halfH, width: halfW, height: halfH },
  }

  const style = zoneStyles[snapPreview]
  if (!style) return null

  return (
    <AnimatePresence>
      <motion.div
        key={snapPreview}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute',
          ...style,
          zIndex: 99,
          background: theme.tokens['accent-color']
            ? `${theme.tokens['accent-color']}20`
            : 'rgba(99, 102, 241, 0.12)',
          border: `2px solid ${theme.tokens['accent-color'] ?? 'rgba(99, 102, 241, 0.4)'}`,
          borderRadius: 8,
          pointerEvents: 'none',
          margin: 4,
        }}
      />
    </AnimatePresence>
  )
}
