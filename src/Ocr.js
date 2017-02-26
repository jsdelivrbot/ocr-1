(async()=>{
    let
        Dictionary= await module.shareImport('Ocr/Dictionary.js'),
        ocr=        await module.shareImport('Ocr/ocr.js'),
        setupMain=  await module.shareImport('Ocr/setupMain.js'),
        extractImage=   await module.shareImport('Ocr/extractImage.js')
    function Ocr(){
        let
            imageData,
            dictionary,
            main
        {
            let n=document.createElement('input')
            n.type='file'
            n.id='file'
            document.body.appendChild(n)
        }
        document.body.appendChild(document.createTextNode('Threshold: '))
        {
            let n=document.createElement('input')
            n.id='input_threshold'
            n.type='text'
            n.value='0.02'
            document.body.appendChild(n)
        }{
            let n=document.createElement('button')
            n.id='button_go'
            n.innerHTML='Go'
            document.body.appendChild(n)
        }{
            let n=document.createElement('div')
            n.id='main'
            n.style.position='relative'
            n.style.border='1px solid black'
            document.body.appendChild(n)
        }
        function purgeMain(){
            let main=document.getElementById('main')
            main.innerHTML=''
        }
        function Main(){
        }
        Main.prototype.installDiv=function(){
            this.div=document.getElementById('main')
        }
        Main.prototype.purgeDiv=function(){
            this.div.innerHTML=''
        }
        dictionary=new Dictionary
        main=new Main
        main.installDiv()
        document.getElementById('file').addEventListener('change',e=>{
            let files=e.target.files
            for(let i=0;i<files.length;i++)
                extractImage(files[i]).then(d=>{
                    imageData=d
                    setupMain(dictionary,imageData)
                })
        })
        document.getElementById('button_go').addEventListener(
            'click',
            function(){
                main.purgeDiv()
                setupMain(dictionary,imageData)
                ocr(
                    parseFloat(input_threshold.value),
                    dictionary,
                    imageData
                )
            }
        )
        document.body.appendChild(document.createTextNode('Dictionary:'))
        document.body.appendChild(dictionary.div)
    }
    return Ocr
})()