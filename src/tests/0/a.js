(async()=>{
    module.rootScript.parentNode.removeChild(module.rootScript)
    let Ocr=await module.shareImport('../../Ocr.js')
    new Ocr
})()
