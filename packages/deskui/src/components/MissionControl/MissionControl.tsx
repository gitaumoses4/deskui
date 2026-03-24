'use client'

import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOSStore } from '@/store/windowStore'
import { useOSContext } from '@/context/OSContext'
import { AppIcon } from '@/components/shared/AppIcon'

const PADDING = 40
const GAP = 20
const TITLE_HEIGHT = 28

function computeGrid(count: number, containerW: number, containerH: number) {
  if (count === 0) return { cols: 0, rows: 0, cellW: 0, cellH: 0 }

  // Find the grid that best fills the space
  let bestCols = 1
  let bestScore = 0

  for (let cols = 1; cols <= count; cols++) {
    const rows = Math.ceil(count / cols)
    const cellW = (containerW - GAP * (cols - 1)) / cols
    const cellH = (containerH - GAP * (rows - 1) - TITLE_HEIGHT * rows) / rows
    const scale = Math.min(cellW, cellH)
    const score = scale * Math.min(cols, count)

    if (score > bestScore) {
      bestScore = score
      bestCols = cols
    }
  }

  const rows = Math.ceil(count / bestCols)
  const cellW = (containerW - GAP * (bestCols - 1)) / bestCols
  const cellH = (containerH - GAP * (rows - 1) - TITLE_HEIGHT * rows) / rows

  return { cols: bestCols, rows, cellW, cellH }
}

export function MissionControl() {
  const active = useOSStore((s) => s.missionControlActive)
  const toggleMissionControl = useOSStore((s) => s.toggleMissionControl)
  const focusWindow = useOSStore((s) => s.focusWindow)
  const windows = useOSStore((s) => s.windows)
  const zStack = useOSStore((s) => s.zStack)
  const { theme, apps } = useOSContext()
  const cp = theme.commandPalette

  const visibleWindows = useMemo(
    () => zStack.filter((id) => windows[id]?.status !== 'minimized').map((id) => windows[id]),
    [zStack, windows],
  )

  const containerW = typeof window !== 'undefined' ? window.innerWidth - PADDING * 2 : 800
  const containerH = typeof window !== 'undefined' ? window.innerHeight - PADDING * 2 : 600

  const grid = computeGrid(visibleWindows.length, containerW, containerH)

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={toggleMissionControl}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9980,
            background: cp.overlayBg,
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: PADDING,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${grid.cols}, ${grid.cellW}px)`,
              gap: GAP,
              maxWidth: containerW,
              maxHeight: containerH,
            }}
          >
            {visibleWindows.map((win) => {
              const app = apps.find((a) => a.id === win.appId)
              const aspect = win.size.w / win.size.h
              const previewW = Math.min(grid.cellW, grid.cellH * aspect)
              const previewH = previewW / aspect

              return (
                <motion.div
                  key={win.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                  onClick={(e) => {
                    e.stopPropagation()
                    focusWindow(win.id)
                    toggleMissionControl()
                  }}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                  }}
                  whileHover={{ scale: 1.04 }}
                >
                  {/* Window preview */}
                  <div
                    style={{
                      width: previewW,
                      height: previewH,
                      background: theme.windowChrome.glassBg,
                      border: theme.windowChrome.border,
                      borderRadius: theme.windowChrome.borderRadius,
                      boxShadow: win.isFocused
                        ? theme.windowChrome.shadowFocused
                        : theme.windowChrome.shadow,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {/* Mini titlebar */}
                    <div
                      style={{
                        height: Math.max(16, previewH * 0.08),
                        background: theme.windowChrome.titlebarBg,
                        borderBottom: theme.windowChrome.border,
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 6px',
                        gap: 4,
                      }}
                    >
                      {app && (
                        <div style={{ width: 12, height: 12 }}>
                          <AppIcon icon={app.icon} size={12} />
                        </div>
                      )}
                      <span
                        style={{
                          fontSize: 8,
                          color: theme.windowChrome.titlebarTextColor,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {win.title}
                      </span>
                    </div>
                    {/* Content placeholder */}
                    <div
                      style={{
                        flex: 1,
                        background: theme.windowChrome.contentBg,
                      }}
                    />
                  </div>

                  {/* Label */}
                  <span
                    style={{
                      fontSize: 12,
                      color: cp.itemColor,
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    {win.title}
                  </span>
                </motion.div>
              )
            })}
          </div>

          {visibleWindows.length === 0 && (
            <span style={{ color: cp.hintColor, fontSize: 14 }}>No open windows</span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
