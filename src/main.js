(async()=>{
    module.rootScript.parentNode.removeChild(module.rootScript)
    let Dictionary=await module.shareImport('Dictionary.js')
    var
        imageData,
        dictionary,
        main
    function ocr(){
        var threshold
        threshold=parseFloat(input_threshold.value)
        dictionary.content.forEach(function(word){
            var x,y,score
            for(x=0;x+word.image.width<=imageData.width;x++)
                for(y=0;y+word.image.height<=imageData.height;y++){
                    score=matchingScore(
                        word.image,
                        imageData,
                        x,
                        y
                    )
                    if(score<threshold){
                        console.log(x,y,score)
                        drawRect(x,y,word.image.width,word.image.height)
                    }
                }
        })
        function matchingScore(a,b,x,y){
            var result,width,height,i,j,k
            width=a.width
            height=a.height
            result=0
            for(i=0;i<width;i++){
                if(result/(3*width*height)>threshold)
                    return 1
                for(j=0;j<height;j++)
                    for(k=0;k<3;k++)
                        result+=
                            Math.pow(Math.abs(
                                a.data[4*(j*width+i)+k]-
                                b.data[4*((y+j)*b.width+(x+i))+k]
                            ),2)/Math.pow(255,2)
            }
            result/=3*width*height
            return result
        }
    }
    function handleFileSelect(e){
        !function(files){
            var i
            for(i=0;i<files.length;i++)
                extractImage(files[i])
        }(e.target.files)
    }
    function extractImage(file){
        var img=new Image
        img.crossOrigin='Anonymous'
        img.onload=function(){
            var
                canvas=document.createElement('CANVAS'),
                ctx=canvas.getContext('2d')
            canvas.width=this.width
            canvas.height=this.height
            ctx.drawImage(this,0,0)
            imageData=ctx.getImageData(0,0,this.width,this.height)
            onImageDataChanged()
        }
        img.src=URL.createObjectURL(file)
    }
    function onImageDataChanged(){
        setupMain()
    }
    function setupMain(){
        var main,canvas,context
        main=document.getElementById('main')
        canvas=document.createElement('canvas')
        canvas.width=imageData.width
        canvas.height=imageData.height
        context=canvas.getContext('2d')
        context.putImageData(imageData,0,0)
        main.appendChild(canvas)
        !function(){
            var div
            var
                boundingRectOfMain=main.getBoundingClientRect(),
                leftOfMain=boundingRectOfMain.left,
                topOfMain=boundingRectOfMain.top
            var
                startX,
                startY
            canvas.onclick=function(e){
                if(div)
                    return
                div=document.createElement('div')
                div.style.position='absolute'
                startX=e.pageX-leftOfMain
                startY=e.pageY-topOfMain
                div.style.left=startX+'px'
                div.style.top=startY+'px'
                div.style.backgroundColor='rgba(0,0,0,0.5)'
                main.appendChild(div)
                e.preventDefault()
                e.stopPropagation()
                onclick=function(e){
                    var
                        endX,
                        endY
                    if(!div)
                        return
                    endX=e.pageX-leftOfMain
                    endY=e.pageY-topOfMain
                    dictionary.push(imageData,{
                        left:startX,
                        top:startY,
                        right:endX,
                        bottom:endY,
                    })
                    main.removeChild(div)
                    div=undefined
                }
            }
            onmousemove=function(e){
                var
                    currentX,
                    currentY
                if(!div)
                    return
                currentX=e.pageX-leftOfMain
                currentY=e.pageY-topOfMain
                div.style.width=currentX-startX+'px'
                div.style.height=currentY-startY+'px'
            }
        }()
    }
    function purgeMain(){
        var main
        main=document.getElementById('main')
        main.innerHTML=''
    }
    function Main(){
    }
    Main.prototype.installDiv=function(){
        this.div=document.getElementById('main')
    }
    Main.prototype.setupDiv=function(){
    }
    Main.prototype.purgeDiv=function(){
        this.div.innerHTML=''
    }
    function drawRect(x,y,w,h){
        var
            main,
            div
        main=document.getElementById('main')
        div=document.createElement('div')
        div.style.position='absolute'
        div.style.left=x+'px'
        div.style.top=y+'px'
        div.style.width=w+'px'
        div.style.height=h+'px'
        div.style.border='1px solid blue'
        main.appendChild(div)
    }
    dictionary=new Dictionary
    main=new Main
    main.installDiv()
    document.getElementById('file').addEventListener(
        'change',
        handleFileSelect
    )
    document.getElementById('button_go').addEventListener(
        'click',
        function(){
            main.purgeDiv()
            setupMain()
            ocr()
        }
    )
    document.body.appendChild(document.createTextNode('Dictionary:'))
    document.body.appendChild(dictionary.div)
})()
