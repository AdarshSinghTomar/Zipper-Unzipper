import { HuffmanCoder } from "./Algo";
onload =() =>{
  const treearea=document.getElementById('treearea');
  const encode= document.getElementById('encode');
  const decode=document.getElementById('decode');
  const temptext=document.getElementById('temptext');
  const upload=document.getElementById('uploadedFile');

  const coder=new HuffmanCoder();
  upload.addEventListener("change",()=>{alert("File uploaded")});
  encode.onclick =()=>{
    const uploadedFile=upload.files[0];
    if(uploadedFile===undefined)
    {
        alert("No file uploaded !");
        return ;
    }
    const fileReader= new FileReader();
    fileReader.onload =(fileLoadedEvent)=>{
        const text=fileLoadedEvent.target.result;
        if(text.length==0)
        {
            alert("Text can not be empty! Upload another file !");
            return ;
        }
        let  [encoded, tree_structure, info]=coder.encode(text);
        downloadFile(uploadedFile.name.split('.')[0]+'_encoded.txt'.encode);
        treearea.innerText=tree_structure;
        treearea.style.marginTop="2000px";
        temptext.innerText=info;
    };
    fileReader.readAsText(uploadedFile,"UTF-8");
  };
}