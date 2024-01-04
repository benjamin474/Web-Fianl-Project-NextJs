/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import Image from "next/image";
import homeBtn from "../../../resources/icon/home_rounded.png";
import "../../../resources/Container.css";
import { useState } from "react";
import Board from "./board";
import AssignSizeInput from "./assignSizeinput";
import AssignValueInput from "./assignValueInput";
import DeleteInput from "./deleteInput";
import SearchInput from "./searchInput";
import axios, { AxiosResponse } from "axios";

export interface arrayItem {
	num: number | null;
	search: boolean;
	hasItem: boolean;
}

export default function aboutus() {
	const [arraySizeStr, setArraySizeStr] = useState<string>("");
	const [arraySize, setArraySize] = useState(-1);
	const [boardExist, setBoardExist] = useState(false);
	const [array, setArray] = useState<arrayItem[]>([]);
	const [assignSizeInputHidden, setAssignSizeInputHidden] = useState(true);
	const [showNow, setShowNow] = useState(false);
	const [searchIndexValueStr, setSearchIndexValueStr] = useState("");
	const [searchIndexInputHidden, setSearchIndexInputHidden] = useState(true);
	const [requesting, setRequesting] = useState(false);
	const [pushValueStr, setPushValueStr] = useState("");
	const [pushIndexStr, setPushIndexStr] = useState("");
	const [deleteIndexStr, setDeleteIndexStr] = useState("");
	const [pushAssignInputHidden, setPushAssignInputHidden] = useState(true);
	const [deleteInputHidden, setDeleteInputHidden] = useState(true);

	function openAssignSizeInput() {
		if (requesting) return;
		if (!boardExist) {
			setAssignSizeInputHidden(false);
		}
	}

	function openAssignValueInput() {
		if (requesting) return;
		if (boardExist) {
			setPushAssignInputHidden(false);
			setSearchIndexInputHidden(true);
			setDeleteInputHidden(true);
		} else {
			alert("Init an array first");
		}
	}

	function openDeleteInput() {
		if (requesting) return;
		if (boardExist) {
			setPushAssignInputHidden(true);
			setSearchIndexInputHidden(true);
			setDeleteInputHidden(false);
		} else {
			alert("Init an array first");
		}
	}

	function openSearchInput() {
		if (requesting) return;
		if (boardExist) {
			setPushAssignInputHidden(true);
			setSearchIndexInputHidden(false);
			setDeleteInputHidden(true);
		} else {
			alert("Init an array first");
		}
	}

	function assignSize() {
		if (requesting) return;
		if (isNaN(Number.parseInt(arraySizeStr))) {
			alert("Please input array size");
			return;
		}
		let arrayS = Number.parseInt(arraySizeStr);
		if (!(arrayS >= 1 && arrayS <= 10)) {
			alert("Invalid Array Size!");
			return;
		}
		let tempArray: arrayItem[] = [];
		for (let i = 0; i < arrayS; i++) {
			tempArray.push({ num: null, hasItem: false, search: false });
		}
		setArray(tempArray);
		setArraySize(arrayS);
		setBoardExist(true);
		setAssignSizeInputHidden(true);
	}

	function assignValue() {
		if (!boardExist) {
			alert("Init an array first");
			return;
		}
		if (isNaN(Number.parseInt(pushIndexStr))) {
			alert("Please input index to assign");
			return;
		}
		if (isNaN(Number.parseInt(pushValueStr))) {
			alert("Please input value to assign");
			return;
		}
		let assignI = Number.parseInt(pushIndexStr);
		if (!(assignI >= 0 && assignI < arraySize)) {
			alert("Index out of bound");
			return;
		}
		if(pushValueStr.length > 10){
			alert("This value is too large!");
			return ;
		}
		let assignV = Number.parseInt(pushValueStr);
		let tempArray = array;
		tempArray[assignI].hasItem = true;
		tempArray[assignI].num = assignV;
		setArray(tempArray);
		setPushAssignInputHidden(true);
		setPushIndexStr("");
		setPushValueStr("");
	}

	function deleteValue() {
		if (!boardExist) {
			alert("Init an array first");
			return;
		}
		if (isNaN(Number.parseInt(deleteIndexStr))) {
			alert("Please input index to delete");
			return;
		}
		let deleteI = Number.parseInt(deleteIndexStr);
		if (!(deleteI >= 0 && deleteI < arraySize)) {
			alert("Index out of bound");
			return;
		}
		let tempArray = array;
		tempArray[deleteI] = {
			...tempArray[deleteI],
			hasItem: false,
			num: null,
		};
		setArray(tempArray);
		setDeleteIndexStr("");
		setDeleteInputHidden(true);
	}

	function clearAll() {
		if (requesting) return;
		setArray([]);
		setBoardExist(false);
		setArraySize(-1);
		setArraySizeStr("");
		setPushValueStr("");
		setPushIndexStr("");
		setDeleteIndexStr("");
		setSearchIndexValueStr("");
		setAssignSizeInputHidden(true);
		setPushAssignInputHidden(true);
		setDeleteInputHidden(true);
		setSearchIndexInputHidden(true);
	}

	function searchIndex() {
		if (requesting) return;
		if (!boardExist) {
			alert("Init an array first!");
			return;
		}
		if (isNaN(Number.parseInt(searchIndexValueStr))) {
			alert("Please input index to delete");
			return;
		}
		let searchI = Number.parseInt(searchIndexValueStr);
		if (!(searchI >= 0 && searchI < arraySize)) {
			alert("超出 array 長度!");
			return;
		}
		let tempArray = array;
		if (!tempArray[searchI].hasItem) {
			alert("此位置沒有數值!");
			return;
		}
		tempArray[searchI].search = true;
		setArray(tempArray);
		setShowNow(true);
		setTimeout(() => {
			let tempArray = array;
			tempArray[searchI].search = false;
			setArray(tempArray);
			setShowNow(false);
		}, 1500);
		setSearchIndexInputHidden(true);
		setSearchIndexValueStr("");
	}

	function getExample() {
		if (boardExist) {
			alert("Please clear the stack first!");
			return;
		}
		setRequesting(true);
		setAssignSizeInputHidden(true);
		setArraySizeStr("");
		getStackFromWeb();
	}

	async function getStackFromWeb() {
		try {
			const response: AxiosResponse | Error = await axios
				.get("https://web-final-project-example-api.vercel.app/array")
				.then((r) => r)
				.catch((e) => e);

			if (response instanceof Error) {
				console.log(response);
				throw new Error(`Can't get data! Error: ${response}`);
			}
			alert("以下顯示範例");
			const data = response.data;
			setArraySize(data.arraySize);
			setArray(data.array);
			setBoardExist(true);
		} catch (e) {
			alert(e);
		} finally {
			setRequesting(false);
		}
	}

	return (
		<div>
			<h1>
				<span>Array(陣列)</span>
			</h1>

			<div className="go_home">
				<Link href="/" passHref legacyBehavior>
					<a>
						<Image src={homeBtn} alt="" />
					</a>
				</Link>
			</div>

			<div className="button_group" style={{ float: "left" }}>
				<div
					id="assign"
					className="button"
					onClick={() => openAssignSizeInput()}
				>
					Size
				</div>
				<br />
				<div
					id="assignValue"
					className="button"
					onClick={() => openAssignValueInput()}
				>
					Input
				</div>
				<br />
				<div id="delete" className="button" onClick={() => openDeleteInput()}>
					Delete
				</div>
			</div>

			<div className="board" id="board">
				{boardExist ? <Board array={array} showNow={showNow} /> : null}
			</div>

			<div id="input">
				{assignSizeInputHidden ? null : (
					<AssignSizeInput
						arraySize={arraySizeStr}
						setArraySize={setArraySizeStr}
						setAssignInputHidden={setAssignSizeInputHidden}
						assignSize={assignSize}
					/>
				)}
				{pushAssignInputHidden ? null : (
					<AssignValueInput
						pushValueStr={pushValueStr}
						setPushValueStr={setPushValueStr}
						pushIndexStr={pushIndexStr}
						setPushIndexStr={setPushIndexStr}
						setPushAssignInputHidden={setPushAssignInputHidden}
						assignValue={assignValue}
					/>
				)}
				{deleteInputHidden ? null : (
					<DeleteInput
						deleteIndex={deleteIndexStr}
						setDeleteIndex={setDeleteIndexStr}
						setDeleteInputHidden={setDeleteInputHidden}
						deleteVal={deleteValue}
					/>
				)}
				{searchIndexInputHidden ? null : (
					<SearchInput
						searchInddex={searchIndexValueStr}
						setSearchIndex={setSearchIndexValueStr}
						setSearchInputHidden={setSearchIndexInputHidden}
						searchValue={searchIndex}
					/>
				)}
			</div>

			<div className="button_group" style={{ float: "right" }}>
				<div id="search" className="button" onClick={() => openSearchInput()}>
					Search
				</div>
				<br />
				<div id="clear" className="button" onClick={() => clearAll()}>
					Clear
				</div>
				<br />
				<div id="example" className="button" onClick={() => getExample()}>
					Example
				</div>
			</div>
		</div>
	);
}
