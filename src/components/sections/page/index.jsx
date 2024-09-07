import React from 'react'

function PageSection({ customCss, children }) {
  return (
    <div className={`min-h-[60vh] lg:min-h-[100vh] py-5 md:py-10 ${customCss}`}>
      {children}
    </div>
  )
}

export default PageSection
