(async()=>{
    let[
        Dictionary,
        ocr,
        setupMain,
        extractImage,
    ]=await Promise.all([
        module.shareImport('Ocr/Dictionary.js'),
        module.shareImport('Ocr/ocr.js'),
        module.shareImport('Ocr/setupMain.js'),
        module.shareImport('Ocr/extractImage.js'),
    ])
    function Ocr(){
        this.dictionary=new Dictionary
    }
    Object.defineProperty(Ocr.prototype,'node',{get(){
        let n=document.createElement('div')
        {
            let o=document.createElement('input')
            o.type='file'
            o.id='file'
            o.addEventListener('change',e=>{
                let files=e.target.files
                for(let i=0;i<files.length;i++)
                    extractImage(files[i]).then(d=>{
                        this.imageData=d
                        setupMain(this.dictionary,this.imageData)
                    })
            })
            n.appendChild(o)
        }
        n.appendChild(document.createTextNode('Threshold: '))
        {
            let o=document.createElement('input')
            o.id='input_threshold'
            o.type='text'
            o.value='0.02'
            n.appendChild(o)
        }{
            let o=document.createElement('button')
            o.id='button_go'
            o.innerHTML='Go'
            o.addEventListener(
                'click',
                ()=>{
                    this.mainDiv.innerHTML=''
                    setupMain(this.dictionary,this.imageData)
                    ocr(
                        parseFloat(input_threshold.value),
                        this.dictionary,
                        this.imageData
                    )
                }
            )
            n.appendChild(o)
        }{
            let o=document.createElement('div')
            o.id='main'
            o.style.position='relative'
            o.style.border='1px solid black'
            this.mainDiv=o
            n.appendChild(o)
        }
        n.appendChild(document.createTextNode('Dictionary:'))
        n.appendChild(this.dictionary.div)
        return n
    }})
    return Ocr
})()
