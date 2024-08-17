import React from 'react'

function PageSection({ customCss, children }) {
  return (
    <div className={`min-h-[100vh] ${customCss}`}>
      {children}
    </div>
  )
}

export default PageSection
