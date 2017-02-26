function ocr(threshold,dictionary,imageData){
    dictionary.content.map(word=>{
        for(let x=0;x+word.image.width<=imageData.width;x++)
            for(let y=0;y+word.image.height<=imageData.height;y++){
                let score=matchingScore(word.image,imageData,x,y)
                if(score<threshold){
                    console.log(x,y,score)
                    drawRect(x,y,word.image.width,word.image.height)
                }
            }
    })
    function matchingScore(a,b,x,y){
        let
            width=a.width
            height=a.height
            result=0
        for(let i=0;i<width;i++){
            if(result/(3*width*height)>threshold)
                return 1
            for(let j=0;j<height;j++)
                for(let k=0;k<3;k++)
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
function drawRect(x,y,w,h){
    let
        main=document.getElementById('main'),
        div=document.createElement('div')
    div.style.position='absolute'
    div.style.left=x+'px'
    div.style.top=y+'px'
    div.style.width=w+'px'
    div.style.height=h+'px'
    div.style.border='1px solid blue'
    main.appendChild(div)
}
ocr
