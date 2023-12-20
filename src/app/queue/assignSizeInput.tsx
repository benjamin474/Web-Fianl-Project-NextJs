/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Dispatch, SetStateAction, useState } from "react";

interface prop {
	queueSize: string;
	setQueueSize: Dispatch<SetStateAction<string>>;
	setHidden: Dispatch<SetStateAction<boolean>>;
	buildQueue: () => void;
}

export default function input({
	queueSize,
	setQueueSize,
	setHidden,
	buildQueue,
}: prop) {
	function onChange(val: string) {
		setQueueSize(val);
	}

	function cancel() {
		setQueueSize("");
		setHidden(true);
	}

	function submit() {
		buildQueue();
	}

	return (
		<div className="input" style={{ background: "transparent" }}>
			<input
				type="number"
				id="stackSize"
				placeholder="請輸入1~10之間的數字"
				value={queueSize}
				onChange={(e) => onChange(e.target.value)}
			/>
			<button id="submitBtn" onClick={submit}>
				submit
			</button>
			<button id="cancelBtn" onClick={cancel}>
				cancel
			</button>
		</div>
	);
}
