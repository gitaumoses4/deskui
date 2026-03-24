'use client'

import type { IconSource } from '@/types'

interface AppIconProps {
  icon: React.ReactNode
  size: number
  borderRadius?: number
  className?: string
}

export function AppIcon({ icon, size, borderRadius, className }: AppIconProps) {
  // String URL
  if (typeof icon === 'string') {
    return (
      <img
        src={icon}
        alt=""
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          borderRadius: borderRadius ?? size * 0.2,
        }}
        className={className}
        draggable={false}
      />
    )
  }

  // { src, src2x } object for high-DPI
  if (
    icon &&
    typeof icon === 'object' &&
    !Array.isArray(icon) &&
    'src' in icon &&
    typeof (icon as IconSource).src === 'string'
  ) {
    const source = icon as unknown as IconSource
    return (
      <img
        src={source.src}
        srcSet={source.src2x ? `${source.src} 1x, ${source.src2x} 2x` : undefined}
        alt=""
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          borderRadius: borderRadius ?? size * 0.2,
        }}
        className={className}
        draggable={false}
      />
    )
  }

  // React node
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
      className={className}
    >
      {icon}
    </div>
  )
}
