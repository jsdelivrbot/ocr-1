(async()=>{
    module.rootScript.parentNode.removeChild(module.rootScript)
    let Ocr=await module.shareImport('../../Ocr.js')
    document.body.appendChild((new Ocr).node)
})()
