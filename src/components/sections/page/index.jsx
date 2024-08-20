import React from 'react'

function PageSection({ customCss, children }) {
  return (
    <div className={`min-h-[100vh] py-5 md:py-10 ${customCss}`}>
      {children}
    </div>
  )
}

export default PageSection
