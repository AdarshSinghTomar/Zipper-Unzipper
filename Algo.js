import { BinaryHeap } from './heap.js';

export { HuffmanCoder }

class HuffmanCoder{   // using huffman algorithm

    stringify(node){
        if(typeof(node[1])==="string"){
            return '\''+node[1];
        }

        return '0' + this.stringify(node[1][0]) + '1' + this.stringify(node[1][1]);
    }

    display(node, modify, index=1){
        if(modify){
            node = ['',node];
            if(node[1].length===1)
                node[1] = node[1][0];
        }

        if(typeof(node[1])==="string"){
            return String(index) + " = " + node[1];
        }

        let left = this.display(node[1][0], modify, index*2);
        let right = this.display(node[1][1], modify, index*2+1);
        let res = String(index*2)+" <= "+index+" => "+String(index*2+1);
        return res + '\n' + left + '\n' + right;
    }

    destringify(data){
        let node = [];
        if(data[this.ind]==='\''){
            this.ind++;
            node.push(data[this.ind]);
            this.ind++;
            return node;
        }

        this.ind++;
        let left = this.destringify(data);
        node.push(left);
        this.ind++;
        let right = this.destringify(data);
        node.push(right);

        return node;
    }

    getMappings(node, path){
        if(typeof(node[1])==="string"){
            this.mappings[node[1]] = path;
            return;
        }

        this.getMappings(node[1][0], path+"0");
        this.getMappings(node[1][1], path+"1");
    }

    encode(data){

        this.heap = new BinaryHeap();

        const mp = new Map();         // storing the frequency
        for(let i=0;i<data.length;i++){
            if(data[i] in mp){
                mp[data[i]] = mp[data[i]] + 1;   // here key is frequency and  character is value
            } else{
                mp[data[i]] = 1;
            }
        }

        for(const key in mp){
            this.heap.insert([-mp[key], key]); // here inserting frequency in negative to get min
        }

        while(this.heap.size() > 1){
            const node1 = this.heap.extractMax();
            const node2 = this.heap.extractMax();

            const node = [node1[0]+node2[0],[node1,node2]];
            this.heap.insert(node);
        }
        const huffman_encoder = this.heap.extractMax();

        this.mappings = {};
        this.getMappings(huffman_encoder, "");

        let binary_string = "";         // creating a binary string from the original text using mappings of characters
        for(let i=0;i<data.length;i++) {
            binary_string = binary_string + this.mappings[data[i]];
        }

        let rem = (8 - binary_string.length%8)%8;  // we can't store data in the form of bits so we need to store data in the form of characters
        let padding = "";                           // so we need to add some padding zeroes to the binary string
        for(let i=0;i<rem;i++)
            padding = padding + "0";
        binary_string = binary_string + padding;

        let result = "";
        for(let i=0;i<binary_string.length;i+=8){
            let temp=binary_string.slice(i,i+8).toString();
             let digit=parseInt(temp,2);
              result=result+String.fromCharCode(digit);         // this will give us cypher code which is kind of secure

        }

        let final_res = this.stringify(huffman_encoder) + '\n' + rem + '\n' + result;
        let info = "Compression Ratio : " + data.length/final_res.length;
        info = "Compression complete and file sent for download" + '\n' + info;
        return [final_res, this.display(huffman_encoder, false), info];
    }
}
