import { useEffect } from 'react'

const CustomCursor = ({ cursor, customCursor }) => {
  useEffect(() => {
    if (cursor === 'custom' && customCursor) {
      document.body.style.cursor = `url(${customCursor}), auto`
    } else if (cursor !== 'default') {
      document.body.style.cursor = cursor
    } else {
      document.body.style.cursor = 'default'
    }

    return () => {
      document.body.style.cursor = 'default'
    }
  }, [cursor, customCursor])

  return null
}

export default CustomCursor
