import React from 'react'
import { footerText } from '../constants'

function Footer() {
  return (
    <div className="w-full h-[50px] flex justify-center bg-[#383b47] text-slate-100 items-center">{footerText}</div>
  )
}

export default Footer