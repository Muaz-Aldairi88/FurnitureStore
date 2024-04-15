import {deleteObject, getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import { storage } from '../lib/firebase.config';

const Storage={
    uploadProductImg: (product)=>{
        return new Promise(async resolve =>{
            try{
                const productRef=ref(storage, `products/${product.title}`)
                uploadBytes(productRef,product.file).then(snapshot =>{
                    resolve({path: snapshot.metadata.fullPath, name: product.title})
                })
            } catch (e){
                console.error(e);
            }
        })
    },
    downloadProductImg: (product)=>{
        return new Promise(async resolve =>{
            try{
                const productRef=ref(storage,product.path)
                const productUrl=await getDownloadURL(productRef)
                resolve(productUrl)
            } catch (e){
                console.error(e);
            }
        })
    },
    deleteProductImg: (product)=>{
        return new Promise(async resolve =>{
            try{
                const productRef=ref(storage, `products/${product.title}`)
                deleteObject(productRef).then(() =>{
                    resolve(console.log("img deleted"))
                })
            } catch (e){
                console.error(e);
            }
        })
    },
}
export default Storage;
