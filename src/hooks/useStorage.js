import { async } from "@firebase/util";
import {
	deleteObject,
	getDownloadURL,
	getMetadata,
	listAll,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { storage } from "../firebaseConfig/fbConfig";

const getMList = async res => {
	const mediaList = [];
	const result = await res.items.map(async itemRef => {
		// All the items under listRef.
		// console.log(`itemRef items`, itemRef);

		const url = await getDownloadURL(itemRef);
		// console.log(`url`, url);
		const metaData = await getMetadata(itemRef);
		// console.log(`metaData`, metaData);
		const mediaDataArrayObject = {
			url: url,
			metaData: metaData,
		};
		mediaList.push(mediaDataArrayObject);
		// console.log(`mediaList`, mediaList);

		return mediaList;
	});
	// console.log(`result`, result);
	return result;
};

const getList = async fRef => {
	const res = await listAll(fRef);
	// .then(async res => {
	// console.log(`res`, res);
	// res.prefixes.forEach(folderRef => {
	// 	// All the prefixes under listRef.
	// 	// console.log(`folderRef prefixes`, folderRef);
	// });

	const list = await getMList(res);

	const resultFromPromise = Promise.all(list).then(values => {
		// console.log(`values`, values);

		const value = values[0];
		// console.log(`value`, value);

		// console.log(`end of forEach loop - list: `, value);
		return value;
	});

	// console.log(`resultFromPromise`, resultFromPromise);

	// })
	// .catch(error => {
	// 	// Uh-oh, an error occurred!
	// 	console.log(`error obtaining media list :`, error);
	// });
	return resultFromPromise;
};

const useStorage = () => {
	// mediaList
	// const [isPending, setIsPending] = useState(true);
	// const [mediaList, setMediaList] = useState([]);
	// console.log(`mediaList`, mediaList);

	const mediaList = useRef();

	const getMediaList = async path => {
		// console.log(`running getMediaList ------[path]`, path);
		// get reference to asts storage media
		const mediaRef = ref(storage, path);
		// meaidRef now points to 'path'
		// console.log(`mediaRef`, mediaRef)

		const list = await getList(mediaRef);
		// console.log(`list`, list);
		return list;

		// console.log(`mediaList length is : ${mediaList.length}`);
		// if (mediaList?.length === 0) {
		// console.log(`mediaList length zero (0)`);
		// setMediaList(list);
		// setIsPending(false);
		// console.log(`list`, list);
		// }
	};

	useEffect(() => {
		// console.log(`CLEARING !!!!!!! mediaList on mount`);
		// setMediaList([]);
		return () => {
			// console.log(`CLEARING ^^^^^^^ mediaList on UNmount`);
			// setMediaList([]);
		};
	}, []);

	return {
		// addFile,
		// progress,
		// error,
		// url,
		// deleteFile,
		// fileDeletePending,
		// fileDeleteSuccess,
		// fileDeleteError,
		// mediaList,
		// setMediaList,
		// isPending,
		// setIsPending,
		getMediaList,
		// getMList,
	};
};

export default useStorage;
