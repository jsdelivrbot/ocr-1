function Dictionary(){
    this.content=[]
    this.div=document.createElement('div')
    this.table=document.createElement('table')
    this.div.style.border='1px solid black'
    this.div.appendChild(this.table)
}
Dictionary.prototype.push=function(imageData,range){
    let
        div_dictionary=this.div,
        table_dictionary=this.table
    range.image=crop(
        imageData,
        range.left,
        range.top,
        range.right-range.left,
        range.bottom-range.top
    )
    this.content.push(range)
    table_dictionary.appendChild(createTr())
    function createTr(){
        let tr=document.createElement('tr')
        tr.appendChild(createTd())
        tr.appendChild(createTd0())
        return tr
    }
    function createTd(){
        let td=document.createElement('td')
        td.style.border='1px solid black'
        td.appendChild(createCanvas())
        return td
    }
    function createCanvas(){
        var canvas,image
        canvas=document.createElement('canvas')
        canvas.width=range.right-range.left
        canvas.height=range.bottom-range.top
        canvas.getContext('2d').putImageData(range.image,0,0)
        return canvas
    }
    function createTd0(){
        let td=document.createElement('td')
        td.innerHTML='<input>'
        return td
    }
}
function crop(imageData,x,y,w,h){
    var canvas,context
    canvas=document.createElement('canvas')
    canvas.width=imageData.width
    canvas.height=imageData.height
    context=canvas.getContext('2d')
    context.putImageData(imageData,0,0)
    return context.getImageData(x,y,w,h)
}
Dictionary
