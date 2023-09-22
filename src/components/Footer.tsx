import React from 'react'
import { bgColors, footerText } from '../constants'

function Footer() {
  return (
    <div className={`w-full h-[50px] flex justify-center bg-[${bgColors.FOOTER_BACKGROUND}] text-slate-100 items-center`}>{footerText}</div>
  )
}

export default Footer