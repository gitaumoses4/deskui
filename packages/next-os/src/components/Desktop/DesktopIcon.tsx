'use client'

import { useState, useCallback } from 'react'
import { useOSStore } from '@/store/windowStore'
import { useOSContext } from '@/context/OSContext'
import type { AppDefinition } from '@/types'

interface DesktopIconProps {
  app: AppDefinition
  isSelected: boolean
  onSelect: () => void
}

export function DesktopIcon({ app, isSelected, onSelect }: DesktopIconProps) {
  const { theme, apps } = useOSContext()
  const openWindow = useOSStore((s) => s.openWindow)
  const { iconSize, iconLabelColor, iconLabelShadow, iconSelectedBg } = theme.desktop

  const onDoubleClick = useCallback(() => {
    openWindow(app.id, apps)
  }, [app.id, apps, openWindow])

  return (
    <button
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        padding: 8,
        border: 'none',
        background: isSelected ? iconSelectedBg : 'transparent',
        borderRadius: 8,
        cursor: 'pointer',
        width: iconSize + 32,
      }}
    >
      <img
        src={app.icon}
        alt={app.label}
        style={{
          width: iconSize,
          height: iconSize,
          objectFit: 'contain',
          pointerEvents: 'none',
        }}
        draggable={false}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: iconLabelColor,
          textShadow: iconLabelShadow,
          textAlign: 'center',
          wordBreak: 'break-word',
          lineHeight: 1.3,
          maxWidth: iconSize + 16,
        }}
      >
        {app.label}
      </span>
    </button>
  )
}
