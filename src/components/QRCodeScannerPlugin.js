import React from 'react'
import QRCodeScanner from './QRCodeScanner'
import "./css/QRCodeContainer.css"

export default function QRCodeScannerPlugin() {
  return (
    <div className='QRCodeScannerContainer' >
          <QRCodeScanner/>
    </div>
  )
}
