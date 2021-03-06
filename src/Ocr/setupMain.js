function setupMain(dictionary,imageData){
    let
        main=document.getElementById('main'),
        canvas=document.createElement('canvas')
    canvas.width=imageData.width
    canvas.height=imageData.height
    let context=canvas.getContext('2d')
    context.putImageData(imageData,0,0)
    main.appendChild(canvas)
    !function(){
        let
            div,
            boundingRectOfMain=main.getBoundingClientRect(),
            leftOfMain=boundingRectOfMain.left,
            topOfMain=boundingRectOfMain.top,
            startX,
            startY
        canvas.onclick=e=>{
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
                if(!div)
                    return
                let
                    endX=e.pageX-leftOfMain,
                    endY=e.pageY-topOfMain
                dictionary.push(imageData,{
                    left:startX,
                    top:startY,
                    right:endX,
                    bottom:endY,
                })
                main.removeChild(div)
                div=undefined
                onclick=null
                onmousemove=null
            }
            onmousemove=function(e){
                if(!div)
                    return
                let
                    currentX=e.pageX-leftOfMain,
                    currentY=e.pageY-topOfMain
                div.style.width=currentX-startX+'px'
                div.style.height=currentY-startY+'px'
            }
        }
    }()
}
setupMain
