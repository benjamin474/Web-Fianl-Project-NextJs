/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import Link from "next/link";
import Image from "next/image";
import homeBtn from "../../../resources/icon/home_rounded.png";
import { useState } from "react";
import "../../../resources/Container.css";
import Board from "./board";
import AssignSizeInput from "./assignSizeInput";
import InputValue from "./pushValueInput";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface queueItem {
	num: Number | null;
	hasItem: boolean;
	front: boolean;
	back: boolean;
}

//////////////////////////////////

export default function queue() {
	const [qeueueSizeStr, setQueueSizeStr] = useState<string>("");
	const [queueSize, setQueueSize] = useState(-1);
	const [frontIndex, setFrontIndex] = useState(-1);
	const [backIndex, setBackIndex] = useState(-1);
	const [boardExist, setBoardExist] = useState(false);
	const [queue, setQueue] = useState<queueItem[]>([]);
	const [hidden, setHidden] = useState(true);
	const [showFront, setShowFront] = useState(false);
	const [showBack, setShowBack] = useState(false);
	const [requesting, setRequesting] = useState(false);
	const [enqueueValueStr, setEnqueueValueStr] = useState("");
	const [enqueueInputHidden, setEnqueueInputHidden] = useState(true);

	function enqueue() {
		if (requesting) return;
		console.log("Enqueue");
		if (!(backIndex < queueSize - 1)) {
			alert("This queue is full!");
			return;
		}

		if (isNaN(Number.parseInt(enqueueValueStr))) {
			alert("Please input a number");
			return;
		}
		let num = Number.parseInt(enqueueValueStr);
		const toIns = backIndex + 1;

		let tempQueue = queue;
		if (toIns > 0) {
			tempQueue[backIndex].back = false;
		}
		tempQueue[toIns] = {
			hasItem: true,
			num,
			back: true,
			front: toIns == 0 ? true : false,
		};

		setQueue(tempQueue);
		setBackIndex(toIns);
		if (toIns >= 0) {
			setFrontIndex(0);
		}
	}

	function assign() {
		if (requesting) return;
		if (!boardExist) {
			setHidden(false);
		}
	}

	function dequeue() {
		if (requesting) return;
		if (!boardExist) {
			alert("Init a queue first!");
			return;
		}
		if (frontIndex < 0) {
			alert("This queue is empty!");
			return;
		}
		let tempQueue = queue;

		tempQueue.splice(frontIndex, 1);

		//     //////////這邊你也要特別注意一下，很多Stack那邊的屬性我不知道搬過來應該長怎樣
		tempQueue.push({ num: null, hasItem: false, front: false, back: false });
		let newBackIndex = backIndex - 1;
		if (newBackIndex >= 0) {
			tempQueue[frontIndex].front = true;
		}
		setBackIndex(newBackIndex);
		if (newBackIndex == -1) setFrontIndex(-1);
		setQueue(tempQueue);
	}

	function buildQueue() {
		if (requesting) return;
		if (isNaN(Number.parseInt(qeueueSizeStr))) {
			alert("Please input queue size");
			return;
		}

		let queueS = Number.parseInt(qeueueSizeStr);
		if (!(queueS >= 1 && queueS <= 10)) {
			alert("Invalid Queue size!");
			return;
		}
		let tempQueue: queueItem[] = [];
		for (let i = 0; i < queueS; i++)
			tempQueue.push({ num: null, hasItem: false, front: false, back: false });
		setQueue(tempQueue);
		setQueueSize(queueS);
		setBoardExist(true);
		setHidden(true);
	}

	function getExample() {
		if (boardExist) {
			alert("Please clear the queue first!");
			return;
		}
		setRequesting(true);
		setHidden(true);
		setQueueSizeStr("");
		getQueueFromWeb();
	}

	async function getQueueFromWeb() {
		try {
			const response: AxiosResponse | Error = await axios
				.get("https://web-final-project-example-api.vercel.app/queue")
				.then((r) => r)
				.catch((e) => e);

			if (response instanceof Error) {
				console.log(response);
				throw new Error(`Can't get data! Error: ${response}`);
			}
			alert("Get the response");
			const data = response.data;
			setQueueSize(data.queueSize);
			setFrontIndex(data.frontIndex);
			setBackIndex(data.backIndex);
			setQueue(data.queue);
			setBoardExist(true);
		} catch (e) {
			alert(e);
		} finally {
			setRequesting(false);
		}
	}

	function openEnqueueInput() {
		if (requesting) return;
		if (!boardExist) {
			alert("Init a queue first!");
			return;
		}

		setEnqueueInputHidden(false);
	}

	function clearAll() {
		if (requesting) return;
		setQueue([]);
		setBoardExist(false);
		setFrontIndex(-1);
		setBackIndex(-1);
		setQueueSizeStr("");
		setEnqueueValueStr("");
		setHidden(true);
		setEnqueueInputHidden(true);
	}

	function swFront() {
		if (requesting) return;
		if (!boardExist) {
			alert("Init a stack first!");
			return;
		}
		setShowFront(true);
		setTimeout(() => {
			setShowFront(false);
		}, 1500);
	}

	function swBack() {
		if (requesting) return;
		if (!boardExist) {
			alert("Init a stack first!");
			return;
		}
		setShowBack(true);
		setTimeout(() => {
			setShowBack(false);
		}, 1500);
	}

	return (
		<div>
			<h1>
				<span>Queue(佇列)</span>
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
					Size
				</div>
				<br />
				<div id="front" className="button" onClick={() => swFront()}>
					Front
				</div>
				<br />
				<div id="back" className="button" onClick={() => swBack()}>
					Back
				</div>
			</div>

			<div className="board" id="board">
				{boardExist ? (
					<Board queue={queue} showFront={showFront} showBack={showBack} />
				) : null}
			</div>

			<div id="input">
				{hidden ? null : (
					<AssignSizeInput
						queueSize={qeueueSizeStr}
						setQueueSize={setQueueSizeStr}
						setHidden={setHidden}
						buildQueue={buildQueue}
					/>
				)}
				{enqueueInputHidden ? null : (
					<InputValue
						enqueueValueStr={enqueueValueStr}
						setEnqueueValueStr={setEnqueueValueStr}
						setEnqueueInputHidden={setEnqueueInputHidden}
						enqueue={enqueue}
					/>
				)}
			</div>

			<div className="button_group" style={{ float: "right" }}>
				<div id="enqueue" className="button" onClick={() => openEnqueueInput()}>
					Enqueue
				</div>
				<br />
				<div id="dequeue" className="button" onClick={() => dequeue()}>
					Dequeue
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
