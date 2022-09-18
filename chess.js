//import login from './chess_input';

//login();
function buttononclick(x)
{
    x.style.visibility="hidden";
    var tab=document.getElementById("wrapper");
    tab.style.visibility="visible";
    tab.style.transform="translate(0,40%)";
    //document.getElementsByTagName("table")[0].style.transform= "rotate(180deg)";
    var body=document.getElementsByTagName("body")[0];
    body.style.backgroundImage="url(chess.jpg)";
    body.style.backgroundRepeat="no-repeat";
}
function tooltip(x)
{
    var tipMessage = x.innerText;
    var Div = document.getElementsByTagName("td")[x.cellIndex+x.parentNode.rowIndex*8];
    var tip = document.createElement("span");
    tip.className = "Txt";
    switch(tipMessage)
    {
        case '♕':tip.innerText="Queen";
                    break;
        case '♛':tip.innerText="Queen";break;
        case '♟':tip.innerText="Pawn";break;
        case '♙':tip.innerText="Pawn";break;
        case '♜':tip.innerText="Rook";break;
        case '♖':tip.innerText="Rook";break;
        case '♔':tip.innerText="King";break;
        case '♚':tip.innerText="King";break;
        case '♘':tip.innerText="Knight";break;
        case '♞':tip.innerText="Knight";break;
        case '♝':tip.innerText="Bishop";break;
        case '♗':tip.innerText="Bishop";break;

    }
    Div.appendChild(tip);
    if(tipMessage.trim()=="")
    {
        
        tip.style.visibility="hidden";
    }
    else{
        tip.style.visibility="visible";
    }
    x.onmouseout=function()
    {
        tip.style.visibility="hidden";
        tip.remove();
    }
        
}
var track=0;
function change(src)
{
    //window.history.back();
    var first=localStorage.getItem("first_turn");
    console.log(first);
    if(src.draggable==true)
    {
        if(src.innerText.trim() == "")
        {
            src.style.backgroundColor="";
        }
        var flag=true;
        var temp=document.getElementsByTagName("td");
        for(var i=0;i<temp.length;i++)
        {
            if(temp[i].style.backgroundColor=="green")
            {
                flag=false;
                break;
            }
        }
        var dec;
        if(first=="White")
        {
            var second="Black";
        }
        else
        {
            var second="White";
        }
        if(track%2==0)
        {
            console.log(track);
            dec=first;
            label(dec);
        }
        else if(track%2==1)
        {
            console.log(track);
            dec=second;
            label(dec);
        }
        if(flag==true && src.id==dec)
        {
            src.draggable = false;
            src.style.backgroundColor="green";
            //src.style.opacity=0.5;
            var coins = src.childNodes[0].nodeValue;
        
            switch(coins)
            {
                case '♕':queen(src);break;
                case '♛':queen(src);break;
                case '♟':pawn(src);break;
                case '♙':pawn(src);break;
                case '♜':rook(src);break;
                case '♖':rook(src);break;
                case '♔':king(src);break;
                case '♚':king(src);break;
                case '♘':knight(src);break;
                case '♞':knight(src);break;
                case '♝':bishop(src);break;
                case '♗':bishop(src);break;

            }
        }
        else if(src.style.backgroundColor=="red" && src.innerText.trim()!="")
        {
            var temp=document.getElementsByTagName("td");
            for(var i=0;i<temp.length;i++)
            {
                if(temp[i].style.backgroundColor=="green" && src.id!=temp[i].id)
                {
                    console.log(src.childNodes[0].nodeValue.trim());
                    if(src.childNodes[0].nodeValue.trim()=="♚" || src.childNodes[0].nodeValue.trim()=="♔")
                    {
                        alert(temp[i].id+" Wins");
                        src.innerText=temp[i].innerText;
                        src.id=temp[i].id;
                        temp[i].innerText="";
                        temp[i].id="";
                        temp[i].style.backgroundColor="";
                        src.style.backgroundColor="";
                        temp[i].draggable=false;
                        src.draggable=false;
                        clear_board(temp);
                        window.location.href='chess_input.html';
                        
                    }
                    src.innerText=temp[i].innerText;
                    src.id=temp[i].id;
                    temp[i].innerText="";
                    temp[i].id="";
                    temp[i].style.backgroundColor="";
                    src.style.backgroundColor="";
                    temp[i].draggable=false;
                    src.draggable=true;
                    track++;
                    clear_board(temp);
                    return true;   
                }
            }
        }
    }
    
    
    else if((src.innerText.trim()=="") )
    {
        console.log(src.style.backgroundColor);
        var temp=document.getElementsByTagName("td");
        for (var i=0;i<temp.length;i++)
        {
            if((temp[i].style.backgroundColor=="green")&&src.style.backgroundColor=="yellow")
            {
                temp[i].draggable=false;
                src.innerText=temp[i].innerText;
                temp[i].innerText="";
                temp[i].style.backgroundColor="";
                src.draggable=true;
                src.id=temp[i].id;
                src.style.backgroundColor="";
                track++;
                clear_board(temp);
                return true;
                    
            }
        }
            
    }
    

}
function label(dec)
{
    document.getElementById("turn").innerHTML=dec+" 's turn";
    console.log(document.getElementById("turn").innerText);
}
function clear_board(temp)//doc.get... should be passed
{
    for(var i=0;i<temp.length;i++)
    {
        if(temp[i].style.backgroundColor=="yellow" || temp[i].style.backgroundColor=="red")
        {
            temp[i].style.backgroundColor="";
        }
    }
}
function pawn(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    //console.log(i,j);
    var temp=document.getElementsByTagName("table")[0];
    if(row_ind+1<=7)
    {
        if(temp.rows[row_ind+1].cells[col_ind].innerText.trim()=="" && src.id=="Black")
        {
            temp.rows[row_ind+1].cells[col_ind].style.backgroundColor="yellow";

        }
    }
        if(row_ind+1<=7 && col_ind+1<=7)
        {
           if((temp.rows[row_ind+1].cells[col_ind+1].id)!=src.id && temp.rows[row_ind+1].cells[col_ind+1].innerText!="")
            {
                temp.rows[row_ind+1].cells[col_ind+1].style.backgroundColor="red";
                //temp.rows[row_ind+1].cells[col_ind+1].style.opacity=0.5;
            }
        if(row_ind+1<=7 && col_ind-1>=0)
        {    
            if((temp.rows[row_ind+1].cells[col_ind-1].id)!=src.id && temp.rows[row_ind+1].cells[col_ind-1].innerText!="")
            {
                temp.rows[row_ind+1].cells[col_ind-1].style.backgroundColor="red";
            }
        }
    }
    if(row_ind-1>=0)
    {
        if(temp.rows[row_ind-1].cells[col_ind].innerText.trim()=="" && src.id=="White")
        {
            temp.rows[row_ind-1].cells[col_ind].style.backgroundColor="yellow";
        }
    }
    if(row_ind-1>=0 && col_ind-1>=0)
        if((temp.rows[row_ind-1].cells[col_ind-1].id)!=src.id && temp.rows[row_ind-1].cells[col_ind-1].innerText!="")
        {
            temp.rows[row_ind-1].cells[col_ind-1].style.backgroundColor="red";
        }
    if(row_ind-1>=0 && col_ind+1<=7)
        if((temp.rows[row_ind-1].cells[col_ind+1].id)!=src.id && temp.rows[row_ind-1].cells[col_ind+1].innerText!="")
        {
            temp.rows[row_ind-1].cells[col_ind+1].style.backgroundColor="red";
        }

    
 } 
function rook(src)
{
    left_pblty(src);
    right_pblty(src);
    top_pblty(src);
    bottom_pblty(src);
}
function knight(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
   if((row_ind-2>=0)&&(row_ind-2<=7)&&(col_ind-1>=0)&&(col_ind-1<=7))
    {
        if(temp.rows[row_ind-2].cells[col_ind-1].innerText.trim()=="") 
        {
            temp.rows[row_ind-2].cells[col_ind-1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind-2].cells[col_ind-1].innerText.trim()!="" && temp.rows[row_ind-2].cells[col_ind-1].id!=src.id)
        {
            temp.rows[row_ind-2].cells[col_ind-1].style.backgroundColor="red";

        }
    }
    if((row_ind+2>=0)&&(row_ind+2<=7)&&(col_ind+1>=0)&&(col_ind+1<=7))
    {
        if(temp.rows[row_ind+2].cells[col_ind+1].innerText.trim()=="")
        {
            temp.rows[row_ind+2].cells[col_ind+1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind+2].cells[col_ind+1].innerText.trim()!="" && temp.rows[row_ind+2].cells[col_ind+1].id!=src.id)
        {
            temp.rows[row_ind+2].cells[col_ind+1].style.backgroundColor="red";

        }
    }
    if((row_ind+1>=0)&&(row_ind+1)<=7&&(col_ind+2>=0)&&(col_ind+2<=7))
    {
        if(temp.rows[row_ind+1].cells[col_ind+2].innerText.trim()=="")
        {
            temp.rows[row_ind+1].cells[col_ind+2].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind+1].cells[col_ind+2].innerText.trim()!="" && temp.rows[row_ind+1].cells[col_ind+2].id!=src.id)
        {
            temp.rows[row_ind+1].cells[col_ind+2].style.backgroundColor="red";

        }
    }
    if((row_ind-1>=0)&&(row_ind-1<=7)&&(col_ind-2>=0)&&(col_ind-2<=7))
    {
        if(temp.rows[row_ind-1].cells[col_ind-2].innerText.trim()=="") 
        {
            temp.rows[row_ind-1].cells[col_ind-2].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind-1].cells[col_ind-2].innerText.trim()!="" && temp.rows[row_ind-1].cells[col_ind-2].id!=src.id)
        {
            temp.rows[row_ind-1].cells[col_ind-2].style.backgroundColor="red";

        }
    }
    if(((row_ind-1>=0)&&(row_ind-1)<=7)&&(col_ind+2>=0)&&(col_ind+2<=7))
    {
        if(temp.rows[row_ind-1].cells[col_ind+2].innerText.trim()=="")
        {
            temp.rows[row_ind-1].cells[col_ind+2].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind-1].cells[col_ind+2].innerText.trim()!="" && temp.rows[row_ind-1].cells[col_ind+2].id!=src.id)
        {
            temp.rows[row_ind-1].cells[col_ind+2].style.backgroundColor="red";

        }
    }
    if((row_ind-2>=0)&&(row_ind-2<=7)&&(col_ind+1>=0)&&(col_ind+1<=7))
    {
        if(temp.rows[row_ind-2].cells[col_ind+1].innerText.trim()=="") 
        {
            temp.rows[row_ind-2].cells[col_ind+1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind-2].cells[col_ind+1].innerText.trim()!="" && temp.rows[row_ind-2].cells[col_ind+1].id!=src.id)
        {
            temp.rows[row_ind-2].cells[col_ind+1].style.backgroundColor="red";

        }
    }
    if((row_ind+2>=0)&&(row_ind+2<=7)&&(col_ind-1>=0)&&(col_ind-1<=7))
    {
        if(temp.rows[row_ind+2].cells[col_ind-1].innerText.trim()=="") 
        {
            temp.rows[row_ind+2].cells[col_ind-1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind+2].cells[col_ind-1].innerText.trim()!="" && temp.rows[row_ind+2].cells[col_ind-1].id!=src.id)
        {
            temp.rows[row_ind+2].cells[col_ind-1].style.backgroundColor="red";

        }
    }
    if((row_ind+1>=0)&&(row_ind+1<=7)&&(col_ind-2>=0)&&(col_ind-2<=7))
    {
        if(temp.rows[row_ind+1].cells[col_ind-2].innerText.trim()=="") 
        {
            temp.rows[row_ind+1].cells[col_ind-2].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind+1].cells[col_ind-2].innerText.trim()!="" && temp.rows[row_ind+1].cells[col_ind-2].id!=src.id)
        {
            temp.rows[row_ind+1].cells[col_ind-2].style.backgroundColor="red";

        }
    }
    else
    {
        return;
    }

}
function bishop(src)
{
    top_right(src);
    bottom_right(src);
    top_left(src);
    bottom_left(src);
}
function queen(src)
{
    left_pblty(src);
    right_pblty(src);
    top_pblty(src);
    bottom_pblty(src);
    top_right(src);
    bottom_right(src);
    top_left(src);
    bottom_left(src);
}
function king(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
    if(row_ind-1>=0 && col_ind-1>=0)
    {
        if(temp.rows[row_ind-1].cells[col_ind-1].innerText.trim()=="")
        {
            temp.rows[row_ind-1].cells[col_ind-1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind-1].cells[col_ind-1].innerText.trim()!="" && temp.rows[row_ind-1].cells[col_ind-1].id!=src.id)
        {
            temp.rows[row_ind-1].cells[col_ind-1].style.backgroundColor="red";
        }
        
    }
    if(row_ind-1>=0)
    {
        if(temp.rows[row_ind-1].cells[col_ind].innerText.trim()=="")
        {
            temp.rows[row_ind-1].cells[col_ind].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind-1].cells[col_ind].innerText.trim()!="" && temp.rows[row_ind-1].cells[col_ind].id!=src.id)
        {
            temp.rows[row_ind-1].cells[col_ind].style.backgroundColor="red";
        }
        
    }
    if(row_ind-1>=0 && col_ind+1<=7)
    {
        if(temp.rows[row_ind-1].cells[col_ind+1].innerText.trim()=="")
        {
            temp.rows[row_ind-1].cells[col_ind+1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind-1].cells[col_ind+1].innerText.trim()!="" && temp.rows[row_ind-1].cells[col_ind+1].id!=src.id)
        {
            temp.rows[row_ind-1].cells[col_ind+1].style.backgroundColor="red";
        }
        
    }
    if( col_ind+1<=7)
    {
        if(temp.rows[row_ind].cells[col_ind+1].innerText.trim()=="")
        {
            temp.rows[row_ind].cells[col_ind+1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind].cells[col_ind+1].innerText.trim()!="" && temp.rows[row_ind].cells[col_ind+1].id!=src.id)
        {
            temp.rows[row_ind].cells[col_ind+1].style.backgroundColor="red";
        }
        
    }
    if(row_ind+1<=7 && col_ind+1<=7)
    {
        if(temp.rows[row_ind+1].cells[col_ind+1].innerText.trim()=="")
        {
            temp.rows[row_ind+1].cells[col_ind+1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind+1].cells[col_ind+1].innerText.trim()!="" && temp.rows[row_ind+1].cells[col_ind+1].id!=src.id)
        {
            temp.rows[row_ind+1].cells[col_ind+1].style.backgroundColor="red";
        }
        
    }
    if(row_ind+1<=7)
    {
        if(temp.rows[row_ind+1].cells[col_ind].innerText.trim()=="")
        {
            temp.rows[row_ind+1].cells[col_ind].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind+1].cells[col_ind].innerText.trim()!="" && temp.rows[row_ind+1].cells[col_ind].id!=src.id)
        {
            temp.rows[row_ind+1].cells[col_ind].style.backgroundColor="red";
        }
    }
    if(row_ind+1<=7 && col_ind-1>=0)
    {
        if(temp.rows[row_ind+1].cells[col_ind-1].innerText.trim()=="")
        {
            temp.rows[row_ind+1].cells[col_ind-1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind+1].cells[col_ind-1].innerText.trim()!="" && temp.rows[row_ind+1].cells[col_ind-1].id!=src.id)
        {
            temp.rows[row_ind+1].cells[col_ind-1].style.backgroundColor="red";
        }
    }
    if(col_ind-1>=0)
    {
        if(temp.rows[row_ind].cells[col_ind-1].innerText.trim()=="")
        {
            temp.rows[row_ind].cells[col_ind-1].style.backgroundColor="yellow";
        }
        else if(temp.rows[row_ind].cells[col_ind-1].innerText.trim()!="" && temp.rows[row_ind].cells[col_ind-1].id!=src.id)
        {
            temp.rows[row_ind].cells[col_ind-1].style.backgroundColor="red";
        }
    }
}
function left_pblty(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
    for(var left=col_ind;left>=0;)
    {
        if(left>=0)
        {
            left--;
            if(left==-1)
                break;
            if(((temp.rows[row_ind].cells[left].innerText.trim())==""))
            { 
                temp.rows[row_ind].cells[left].style.backgroundColor="yellow";
            }
            else if(temp.rows[row_ind].cells[left].id!=src.id && temp.rows[row_ind].cells[left].innerText.trim()!="")
            {
                
                temp.rows[row_ind].cells[left].style.backgroundColor="red";
                return;
            }
            else
            {
                
                break;
            }
            
        }
    }
}
function right_pblty(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    console.log(row_ind,col_ind);
    var temp=document.getElementsByTagName("table")[0];    
    for (var right=col_ind;right<=7;)
    {
        if(right<=7)
        {
            right++;
            if(right==8)
                break;
            if(((temp.rows[row_ind].cells[right].innerText.trim())==""))
            {
                temp.rows[row_ind].cells[right].style.backgroundColor="yellow";
            }
            else if((temp.rows[row_ind].cells[right].innerText.trim())!="" && (temp.rows[row_ind].cells[right].id!=src.id))
            {
                temp.rows[row_ind].cells[right].style.backgroundColor="red";
                return;
            }
            else
            {
                break;
            }
            
        }
        
    }
}
function top_pblty(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
    for(var top=row_ind;top>=0;)
    {
        if(top>=0)
        {
            top--;
            if(top==-1)
                break;
            if(((temp.rows[top].cells[col_ind].innerText.trim())==""))
            {
                temp.rows[top].cells[col_ind].style.backgroundColor="yellow";
            }
            else if((temp.rows[top].cells[col_ind].innerText.trim())!="" && (temp.rows[top].cells[col_ind].id!=src.id))
            {
                temp.rows[top].cells[col_ind].style.backgroundColor="red";
                return;
            }
            else
            {
                break;
            }
            
        }
    }
}
function bottom_pblty(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
    for (var bottom=row_ind;bottom<=7;)
    {
        if(bottom<=7)
        {
            bottom++;
            if(bottom==8)
                break;
            if(((temp.rows[bottom].cells[col_ind].innerText.trim())==""))
            {
                temp.rows[bottom].cells[col_ind].style.backgroundColor="yellow";
            }
            else if((temp.rows[bottom].cells[col_ind].innerText.trim()!="") && (temp.rows[bottom].cells[col_ind].id!=src.id))
            {
                temp.rows[bottom].cells[col_ind].style.backgroundColor="red";
                return;
            }
            else
            {
                break;
            }
            
        }
        
    }
}
function top_right(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
    for(var i=row_ind,j=col_ind;i>=0&&j<=7;)
    {
        i-=1;
        j+=1;
        if(i>=0 && j<=7)
        {
            if(temp.rows[i].cells[j].innerText.trim()=="")
            {
                temp.rows[i].cells[j].style.backgroundColor="yellow";
            }
            else if(temp.rows[i].cells[j].innerText.trim()!="" && temp.rows[i].cells[j].id!=src.id)
            {
                temp.rows[i].cells[j].style.backgroundColor="red";
                return;
            }
            else  
            {  
                return;
            }
        }
        else
        {
            return;
        }
    }
}
function bottom_right(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
    for(var i=row_ind,j=col_ind;i<=7&&j<=7;)
    {
        i+=1;
        j+=1;
        if(i<=7 && j<=7)
        {
            if(temp.rows[i].cells[j].innerText.trim()=="")
            {
                temp.rows[i].cells[j].style.backgroundColor="yellow";
            }
            else if(temp.rows[i].cells[j].innerText.trim()!="" && temp.rows[i].cells[j].id!=src.id)
            {
                temp.rows[i].cells[j].style.backgroundColor="red";
                return;
            }
            else
                return;
        }
        else 
            return;
    }
}
function top_left(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
    for(var i=row_ind,j=col_ind;i>=0&&j>=0;)
    {
        i-=1;
        j-=1;
        if(i>=0 && j>=0)
        {
            if(temp.rows[i].cells[j].innerText.trim()=="")
            {
                temp.rows[i].cells[j].style.backgroundColor="yellow";
            }
            else if(temp.rows[i].cells[j].innerText.trim()!="" && temp.rows[i].cells[j].id!=src.id)
            {
                temp.rows[i].cells[j].style.backgroundColor="red";
                return;
            }
            else
                return;
        }
        else 
            return;
    }
}
function bottom_left(src)
{
    var row_ind=src.parentNode.rowIndex;
    var col_ind=src.cellIndex;
    var temp=document.getElementsByTagName("table")[0];
    for(var i=row_ind,j=col_ind;i<=7&&j>=0;)
    {
        i+=1;
        j-=1;
        if(i<=7 && j>=0)
        {
            if(temp.rows[i].cells[j].innerText.trim()=="")
            {
                temp.rows[i].cells[j].style.backgroundColor="yellow";
            }
            else if(temp.rows[i].cells[j].innerText.trim()!="" && temp.rows[i].cells[j].id!=src.id)
            {
                temp.rows[i].cells[j].style.backgroundColor="red";
                return;
            }
            else
                return;
        }
        else
            return;
    }
}