import {doc, setDoc, serverTimestamp, collection, getDocs, deleteDoc, query, where, updateDoc} from 'firebase/firestore';
import { db } from '../lib/firebase.config';

const FireStore={
    readDocs: (...args) =>{
        const [collectionName]=args
        let docs=[];
        const ref= collection(db,`${collectionName}`)
        return new Promise( async resolve =>{
            try{
                const snapshots = await getDocs(ref)
                snapshots.forEach(doc =>{
                    const d ={...doc.data()}
                    docs.push(d)
                })
                resolve(docs)
            }catch (e){
                console.log(e);
            }
        });
    },
    writeDoc: (...args) =>{
        const[productInputs]=args;
        return new Promise( async resolve =>{
            const randomIndex=Math.floor(Math.random() * 1000000);
            try{
                const docRef=doc(db,'products',`${randomIndex}`);
                await setDoc(docRef,{title: productInputs.title, price: productInputs.price, category: productInputs.category,
                        description: productInputs.description, path: productInputs.path , createdAt: serverTimestamp()});
                resolve("new doc is successfuly inserted")
            }catch (e){
                console.log(e);
            }
        })
    },
    deleteDoc: (...args) =>{
        const [product]=args;
        return new Promise( async resolve =>{
            const q = query(collection(db, "products"), where("path", "==", product.path));
            try{
                let docId;
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                docId=doc.id;
                });
                const docRef=doc(db,"products",docId);
                await deleteDoc(docRef)
                resolve(`the document is deleted`)
            }catch (e){
                console.log(e);
            }
        })
    },
    updateDoc: (...args) =>{
        const [product]=args;
        return new Promise( async resolve =>{
            const q = query(collection(db, "products"), where("path", "==", product.path));
            try{
                let docId;
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                docId=doc.id;
                });
                const docRef=doc(db,"products",docId);
                await updateDoc(docRef,{title:product.title, price:product.price, category:product.category, description: product.description});
                resolve(`the document is updated`)
            }catch (e){
                console.log(e);
            }
        })
    },
    // readDocs_quary: (...args) =>{
    //     const [productPath]=args
    //     let favorites=[];
    //     return new Promise( async resolve =>{
    //         const q = query(collection(db, "products"), where("path", "==", productPath));
    //         try{
    //             const snapshots = await getDocs(q);
    //             snapshots.forEach(doc =>{
    //                 const d ={...doc.data()}
    //                 favorites.push(d)
    //             })
    //             resolve(favorites[0])
    //         }catch (e){
    //             console.log(e);
    //         }
    //     })
    // },
    readDocs_favoritesPaths: (...args) =>{
        const[currentUserEmail]=args;
        let favoritesPaths=[];
        const ref= collection(db,`${currentUserEmail}`)
        return new Promise( async resolve =>{
            try{
                const snapshots = await getDocs(ref)
                snapshots.forEach(doc =>{
                    const favoritePath ={...doc.data()}
                    favoritesPaths.push(favoritePath.path)
                })
                resolve(favoritesPaths)
            }catch (e){
                console.log(e);
            }
        });
    },
    writeDoc_favoritesPaths: (...args) =>{
        const[productPath,currentUserEmail]=args;
        return new Promise( async resolve =>{
            const randomIndex=Math.floor(Math.random() * 1000000);
            try{
                const docRef=doc(db,`${currentUserEmail}`,`${randomIndex}`);
                    await setDoc(docRef,{path: productPath, addedAt: serverTimestamp()});
                    resolve(`product has been added to ${currentUserEmail} favorite list`)
                // await setDoc(docRef,{title: productInputs.title, price: productInputs.price, category: productInputs.category,
                //         description: productInputs.description, path: productInputs.path , addedAt: serverTimestamp(), user: currentUserEmail, isAddedToFavorite: true});
                // resolve(`${productInputs.title} has been added to ${currentUserEmail} favorite list`)
            }catch (e){
                console.log(e);
            }
        })
    },
    deleteDoc_favoritesPaths: (...args) =>{
        const[productPath,currentUserEmail]=args;
        return new Promise( async resolve =>{
            const q = query(collection(db,`${currentUserEmail}`), where("path", "==",productPath));
            try{
                let docId;
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                docId=doc.id;
                });
            const docRef = doc(db, `${currentUserEmail}`, docId);
            await deleteDoc(docRef)
            }catch (e){
                console.log(e);
            }
        });
    },
    // readDocs_quary_cart: (...args) =>{
    //     const [productPath]=args
    //     let cartItems=[];
    //     return new Promise( async resolve =>{
    //         const q = query(collection(db, "products"), where("path", "==", productPath));
    //         try{
    //             const snapshots = await getDocs(q);
    //             snapshots.forEach(doc =>{
    //                 const d ={...doc.data()}
    //                 cartItems.push(d)
    //             })
    //             resolve(cartItems[0])
    //         }catch (e){
    //             console.log(e);
    //         }
    //     })
    // },
    readDocs_cartItemsPaths: (...args) =>{
        const[currentUserEmail]=args;
        let cartItemsPaths=[];
        const ref= collection(db,`${currentUserEmail}_cart`)
        return new Promise( async resolve =>{
            try{
                const snapshots = await getDocs(ref)
                snapshots.forEach(doc =>{
                    const cartItemPath ={...doc.data()}
                    cartItemsPaths.push(cartItemPath.path)
                })
                resolve(cartItemsPaths)
            }catch (e){
                console.log(e);
            }
        });
    },
    writeDoc_cartItemsPaths: (...args) =>{
        const[productPath,currentUserEmail]=args;
        return new Promise( async resolve =>{
            const randomIndex=Math.floor(Math.random() * 1000000);
            try{
                const docRef=doc(db,`${currentUserEmail}_cart`,`${randomIndex}`);
                    await setDoc(docRef,{path: productPath, addedAt: serverTimestamp()});
                    resolve(`product has been added to ${currentUserEmail} cart`)
                // await setDoc(docRef,{title: productInputs.title, price: productInputs.price, category: productInputs.category,
                //         description: productInputs.description, path: productInputs.path , addedAt: serverTimestamp(), user: currentUserEmail, isAddedToFavorite: true});
                // resolve(`${productInputs.title} has been added to ${currentUserEmail} favorite list`)
            }catch (e){
                console.log(e);
            }
        })
    },
    deleteDoc_cartItemsPaths: (...args) =>{
        const[productPath,currentUserEmail]=args;
        return new Promise( async resolve =>{
            const q = query(collection(db,`${currentUserEmail}_cart`), where("path", "==",productPath));
            try{
                let docId;
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                docId=doc.id;
                });
            const docRef = doc(db, `${currentUserEmail}_cart`, docId);
            await deleteDoc(docRef)
            }catch (e){
                console.log(e);
            }
        });
    },

}

export default FireStore;
