import { useEffect } from 'react'

// opdater page title 
export const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [title])
}