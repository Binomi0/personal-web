import mock from '../mockedData.json';

const DB_STORE_NAME = 'maestros';

export default (version, callback) => {
    const request = window.indexedDB.open(DB_STORE_NAME, version);

    request.onsuccess = (event) => {
        const maestrosIDB = event.target.result;

        console.log('onsuccess maestrosIDB =>', maestrosIDB);
        callback(maestrosIDB)
    }
    request.onerror = (event) => {
        console.error('error => ', event.target)
    }
    // request.onupgradeneeded = (event) => {
    //     const db = event.target.result;
        
    //     console.log('onupgradeneeded db =>', db);

    //     try {
    //         const store = db.createObjectStore(DB_OS_COMPRADORES, {keyPath: 'id', autoincrement: true});
    //         // const store = getObjectStore(DB_OS_COMPRADORES, 'readwrite');

    //         store.createIndex("description", "description", { unique: false });

    //         // const transaction = db.transaction(["compradores"], "readwrite");

    //         store.transaction.onerror = (event) => {
    //             console.error('transaction error =>', event.target)
    //         }
    //         store.transaction.oncomplete = function(event) {
    //             // Store values in the newly created objectStore.
    //             const customerObjectStore = db.transaction(DB_OS_COMPRADORES, "readwrite").objectStore(DB_OS_COMPRADORES);
    //             mock.forEach(function(comprador) {
    //               const objectRequest = customerObjectStore.add(comprador);
    //               objectRequest.onsuccess = event => {
    //                   console.log(event.target.result)
    //               }
    //             });
    //             const comprador = store.get("1");
    //             console.log('comprador =>', comprador.result)
    //         };
    //         console.log('onupgradeneeded store =>', store);
            
    //         store.transaction.onversionchange = (event) => {
    //             console.log('onversionchange =>', event)
    //         }

            

    //     }

    //     catch (err) {
    //         console.log('error =>', err.name)
    //     }

        


    //     // console.log('transaction =>', transaction)
    //     // // Do something when all the data is added to the database.
    //     // transaction.oncomplete = function(event) {
    //     //     console.log("All done!");
    //     // };

    //     // transaction.onerror = function(event) {
    //     //     console.error(event.target)
    //     //     // Don't forget to handle errors!
    //     // };
    //     // const compradores = transaction.objectStore('compradores');

    //             /**
    //      * @param {string} store_name
    //      * @param {string} mode either "readonly" or "readwrite"
    //      */
    //     function getObjectStore(store_name, mode) {
    //         var tx = db.transaction(store_name, mode);
    //         return tx.objectStore(store_name);
    //     }

    // }


}
