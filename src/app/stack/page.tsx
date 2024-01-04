/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Image from "next/image";
import "../../../resources/Container.css";
import Link from "next/link";
import homeBtn from "../../../resources/icon/home_rounded.png";
import { useState } from "react";
import Board from "./board";
import Input from "./assignSizeInput";
import InputValue from "./pushValueInput";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface stackItem {
	num: Number | null;
	hasItem: boolean;
	top: boolean;
}

export default function stack() {
	const [stackSizeStr, setStackSizeStr] = useState<string>("");
	const [stackSize, setStackSize] = useState(-1);
	const [topIndex, setTopIndex] = useState(-1);
	const [boardExist, setBoardExist] = useState(false);
	const [stack, setStack] = useState<stackItem[]>([]);
	const [hidden, setHidden] = useState(true);
	const [showTop, setShowTop] = useState(false);
	const [requesting, setRequesting] = useState(false);
	const [pushValueStr, setPushValueStr] = useState("");
	const [pushInputHidden, setPushInputHidden] = useState(true);

	function push() {
		if (requesting) return;
		if (!(topIndex < stackSize - 1)) {
			alert("This stack is full!");
			return;
		}
		if (isNaN(Number.parseInt(pushValueStr))) {
			alert("Please input a number");
			return;
		}

		if(pushValueStr.length>10){
			alert("This value is too large!")
			return
		}
		
		let num = Number.parseInt(pushValueStr);
		const toIns = topIndex + 1;
		let tempStack = stack;
		if (topIndex >= 0) {
			tempStack[topIndex].top = false;
		}
		tempStack[toIns] = { hasItem: true, num, top: true };
		setStack(tempStack);
		setTopIndex(toIns);
	}

	function pop() {
		if (requesting) return;
		if (!boardExist) {
			alert("Init a stack first!");
			return;
		}
		if (topIndex < 0) {
			alert("This stack is empty!");
			return;
		}
		let tempStack = stack;
		tempStack.splice(topIndex, 1);
		tempStack.push({ hasItem: false, num: null, top: false });
		if (topIndex - 1 >= 0) {
			tempStack[topIndex - 1].top = true;
		}
		setTopIndex(topIndex - 1);
		setStack(tempStack);
	}

	function buildStack() {
		if (requesting) return;
		if (isNaN(Number.parseInt(stackSizeStr))) {
			alert("Please input stack size");
			return;
		}

		let stackS = Number.parseInt(stackSizeStr);
		if (!(stackS >= 1 && stackS <= 10)) {
			alert("Invalid Stack Size!");
			return;
		}
		let tempStack: stackItem[] = [];
		for (let i = 0; i < stackS; i++) {
			tempStack.push({ num: null, hasItem: false, top: false });
		}
		setStack(tempStack);
		setStackSize(stackS);
		setBoardExist(true);
		setHidden(true);
	}

	function clearAll() {
		if (requesting) return;
		setStack([]);
		setBoardExist(false);
		setTopIndex(-1);
		setStackSize(-1);
		setStackSizeStr("");
		setPushValueStr("");
		setPushInputHidden(true);
	}

	function assign() {
		if (requesting) return;
		if (!boardExist) {
			setHidden(false);
		}
	}

	function swTop() {
		if (requesting) return;
		if (!boardExist) {
			alert("Init a stack first!");
			return;
		}
		setShowTop(true);
		setTimeout(() => {
			setShowTop(false);
		}, 1500);
	}

	function getExample() {
		if (boardExist) {
			alert("Please clear the stack first!");
			return;
		}
		setRequesting(true);
		setHidden(true);
		setStackSizeStr("");
		getStackFromWeb();
	}

	async function getStackFromWeb() {
		try {
			const response: AxiosResponse | Error = await axios
				.get("https://web-final-project-example-api.vercel.app/stack")
				.then((r) => r)
				.catch((e) => e);

			if (response instanceof Error) {
				console.log(response);
				throw new Error(`Can't get data! Error: ${response}`);
			}
			alert("以下顯示範例");
			const data = response.data;
			setStackSize(data.stackSize);
			setTopIndex(data.topIndex);
			setStack(data.stack);
			setBoardExist(true);
		} catch (e) {
			alert(e);
		} finally {
			setRequesting(false);
		}
	}

	function openPushInput() {
		if (requesting) return;
		if (!boardExist) {
			alert("Init a stack first!");
			return;
		}
		setPushInputHidden(false);
	}

	return (
		<div>
			<h1>
				<span>Stack(堆疊)</span>
			</h1>
			<div className="go_home">
				<Link href="/" passHref legacyBehavior>
					<a>
						<Image src={homeBtn} alt="" />
					</a>
				</Link>
			</div>
			<div className="button_group" style={{ float: "left" }}>
				<div id="assign" className="button" onClick={() => assign()}>
					Assign
				</div>
				<br />
				<div id="top" className="button" onClick={() => swTop()}>
					Top
				</div>
				<br />
				<div id="push" className="button" onClick={() => openPushInput()}>
					Push
				</div>
				<br />
			</div>

			<div className="board" id="board">
				{boardExist ? <Board stack={stack} showTop={showTop} /> : null}
			</div>

			<div id="input">
				{hidden ? null : (
					<Input
						stackSize={stackSizeStr}
						setStackSize={setStackSizeStr}
						setHidden={setHidden}
						buildStack={buildStack}
					/>
				)}
				{pushInputHidden ? null : (
					<InputValue
						pushValueStr={pushValueStr}
						setPushValueStr={setPushValueStr}
						setPushInputHidden={setPushInputHidden}
						push={push}
					/>
				)}
			</div>

			<div className="button_group" style={{ float: "right" }}>
				<div id="pop" className="button" onClick={() => pop()}>
					Pop
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
