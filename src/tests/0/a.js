module.rootScript.parentNode.removeChild(module.rootScript)
;(async()=>{
    let Ocr=await module.shareImport('../../Ocr.js')
    document.body.appendChild((new Ocr).node)
})()
