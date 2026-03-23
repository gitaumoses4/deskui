'use client'

import { useCallback } from 'react'
import { useOSStore } from '@/store/windowStore'
import { useOSContext } from '@/context/OSContext'
import type { AppDefinition } from '@/types'

interface DockItemProps {
  app: AppDefinition
}

export function DockItem({ app }: DockItemProps) {
  const { theme, apps } = useOSContext()
  const windows = useOSStore((s) => s.windows)
  const openWindow = useOSStore((s) => s.openWindow)
  const focusWindow = useOSStore((s) => s.focusWindow)
  const minimizeWindow = useOSStore((s) => s.minimizeWindow)
  const restoreWindow = useOSStore((s) => s.restoreWindow)

  const appWindows = Object.values(windows).filter((w) => w.appId === app.id)
  const hasWindow = appWindows.length > 0
  const focusedWindow = appWindows.find((w) => w.isFocused)
  const minimizedWindow = appWindows.find((w) => w.status === 'minimized')

  const onClick = useCallback(() => {
    if (!hasWindow) {
      openWindow(app.id, apps)
    } else if (minimizedWindow) {
      restoreWindow(minimizedWindow.id)
    } else if (focusedWindow) {
      minimizeWindow(focusedWindow.id)
    } else {
      focusWindow(appWindows[0].id)
    }
  }, [
    hasWindow,
    minimizedWindow,
    focusedWindow,
    appWindows,
    app.id,
    apps,
    openWindow,
    focusWindow,
    minimizeWindow,
    restoreWindow,
  ])

  return (
    <button
      onClick={onClick}
      title={app.label}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      <img
        src={app.icon}
        alt={app.label}
        style={{
          width: theme.dock.itemSize,
          height: theme.dock.itemSize,
          objectFit: 'contain',
          borderRadius: theme.dock.itemSize * 0.2,
          transition: 'transform 0.15s ease',
        }}
        draggable={false}
      />
      {hasWindow && (
        <div
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: theme.dock.runningIndicatorColor,
          }}
        />
      )}
    </button>
  )
}
