import React from 'react'

function PageSection({ customCss, children }) {
  return (
    <div className={`lg:min-h-[100vh] py-5 md:py-8 ${customCss} min-h-[60vh]`}>
      {children}
    </div>
  )
}

export default PageSection
