import { useState } from "react";

function getTree(data, clicking,parent=[]) {
 
  return data.map((v) => {
    if (v?.child?.length) {
      parent.push(v.name)

      return (
        <li onClick={(e) => clicking(e, `${v.name}`,v.key,parent)} parent={parent.join(",")}>
          {v.name}          
          <ul>{getTree(v.child, clicking,parent)}</ul>
        </li>
      );
    }
    let dt = [...parent,v.name]

    return <li onClick={(e) => clicking(e, `${v.name}`,v.key,dt)} parent={dt.join(",")}>{v.name}</li>;
  });
}

function underChild(list,key) {
  for (let i = 0; i < list.length; i++) {
    let row = list[i];
    let copyParent = `${i}${row.name}`;
    if(copyParent == key) {
      return true;
    }
  }
  return false;
    
}

 let realData = [];
function updateNode(list,key,text,link){

  console.log("link",link)
  for(let ch of list){
   let name = ch.name;
   let parentName = link.at(-1);
 
   if(parentName == name){
    let c = [];
    if(ch?.child)  c.push(ch.child)
    c.push({name:text})  
    ch['child'] = c
    console.log("Matching..........")
    return ch;
   }
   realData['name'] = ch.name;
    if(ch?.child?.length){
      realData['child'] =  updateNode(ch?.child,key,text,link)
    }
  } 

  return realData;
}

function OrderList() {
  const [list, setList] = useState([
    { name: "a",key:"0a", child: [{ name: "b",key:"0a0b" }, { name: "c",key:"0a1c" ,child: [{ name: "d",key:"0a1c0d" }, { name: "e",key:"0a1c1e" }]}] },
  ]);
  const [text, setText] = useState("");
  const [keyId, setKeyId] = useState("");
  const [parentText, setParentText] = useState("");
  const [clicked, setClicked] = useState("");
  const [parentLink, setParentLink] = useState("");


  let clicking = (v, key,p,par) => {

    let parnt =  v.target.getAttribute("parent")
    parnt =parnt.split(",")
    setParentLink(parnt)
    v.stopPropagation();
    let parent = v.target.innerText;
    setParentText(parent);
  };

  let addList = () => {


    let x = [...list];
    if (!parentText.length) {
      x.push({ name: text ,key:`${x.length}${text}` });
    } else {
      
    }

   let dt =  updateNode(list,clicked,text,parentLink)
    console.log("ddd",dt)


    console.log(x)
    setList(x);
  };

  return (
    <div>
      Parent:{" "}
      <input
        type="text"
        onChange={(e) => setParentText(e.target.value)}
        value={parentText}
      />
      Name:
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <button onClick={addList}>Add {parentText.length?'Child':""}</button>
      <ul>{getTree(list, clicking, [])}</ul>
    </div>
  );
}

export default OrderList;
