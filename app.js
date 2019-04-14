const assignColor=(color)=>{
    const colorDiv = document.getElementById("color");
    colorDiv.setAttribute("style", `width:200px;height:200px;top:200px;position:absolute;background:${color}`)
}

const drawColorPicker = (color1, color2, color3) => {
    const container = document.getElementById("container");
    let width = container.offsetWidth;
    width=width%2===0?width+1:width;
    let x = 0;
    const y3 = Math.sqrt(Math.pow(width, 2)-Math.pow(width/2, 2));
    let q = width +1;

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext('2d'); 
    ctx.strokeStyle = "white";
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.moveTo(1, 1);
    ctx.lineTo( width-1, 1);
    ctx.lineTo(width / 2-1, y3);
    ctx.lineTo(1, 1 );
    ctx.stroke(); 
    ctx.closePath();
    ctx.save();

    const centroid = [(0+width+width/2)/3  , (0+0+y3)/3];
    const w = Math.pow(width/2, 2)+Math.pow(centroid[1], 2);
    const add = (width/parseInt(y3));
    const maxDistance = Math.sqrt(w);
    
    for(let i=0;i<parseInt(y3);i++){
        x=i%2===0?x:x+add;
        const xNew=parseInt(x);
        console.log(xNew, add)
        for(let j=0;j<parseInt(q)-1;j++){
            const b1 = i/(width-1);
            const b2 = parseInt(q)>2?j/(parseInt(q)-2):1;
            const c1=(parseInt(q)-2)-j;
            const c2=(width-1)-i;
            const c3 = c2/(width-1);
            const c4 = parseInt(q)>2?c1/(parseInt(q)-2):1;
            const x1 = centroid[0];
            const y1 = centroid[1];
            const x2 = xNew+j;
            const y2 = i;
            const x3=x2-x1;
            const y3=y2-y1;
            const val = Math.pow(x3, 2)+Math.pow(y3, 2);
            const D=Math.sqrt(val);
            const a = D/maxDistance;
            const r = (color1[0]*c4 + color3[0]*b2)/(c4+b2)*c3 + color2[0] * b1;
            const g = (color1[1]*c4 + color3[1]*b2)/(c4+b2)*c3 + color2[1] * b1;
            const b = (color1[2]*c4 + color3[2]*b2)/(c4+b2)*c3 + color2[2] * b1;  
            const color="rgba("+r+","+g+","+b+","+a+")";
            const colorButton = document.createElement("div")
            colorButton.setAttribute("style",`background:${color}; position:absolute; left:${xNew+j}px; top:${i}px;width:1px;height:1px;`)
            colorButton.setAttribute('onclick',`assignColor(${color});`); // for FF
            colorButton.onclick = function() {assignColor(color);}; // for IE
            container.appendChild(colorButton);
        }
        q-=add;
        
    }
}