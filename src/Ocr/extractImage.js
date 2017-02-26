function extractImage(file){
    return new Promise(rs=>{
        let img=new Image
        img.crossOrigin='Anonymous'
        img.onload=function(){
            let
                canvas=document.createElement('canvas'),
                ctx=canvas.getContext('2d')
            canvas.width=this.width
            canvas.height=this.height
            ctx.drawImage(this,0,0)
            rs(ctx.getImageData(0,0,this.width,this.height))
        }
        img.src=URL.createObjectURL(file)
    })
}
extractImage
