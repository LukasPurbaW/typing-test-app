import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRef, setCaretRef } from "store/actions";
import { State } from "store/reducer";
import "stylesheets/Test.scss";
import "stylesheets/Footer.scss";

export default function Test() {
	const {
		word: { typedWord, currWord, wordList, typedHistory },
		time: { timer },
	} = useSelector((state: State) => state);
	const dispatch = useDispatch();
	const extraLetters = typedWord.slice(currWord.length).split("");
	const activeWord = useRef<HTMLDivElement>(null);
	const caretRef = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		dispatch(setRef(activeWord));
		dispatch(setCaretRef(caretRef));
	}, [dispatch]);

	return (
		<div className="test">
			<div className="timer">{timer}</div>{" "}
			<div className="box">
				{wordList.map((word, idx) => {
					const isActive =
						currWord +
							wordList.indexOf(currWord, typedHistory.length) ===
						word + idx;
					return (
						<div
							key={word + idx}
							className="word"
							ref={isActive ? activeWord : null}>
							{isActive ? (
								<span
									ref={caretRef}
									id="caret"
									className="blink"
									style={{
										left: typedWord.length * 14.5833,
									}}>
									|
								</span>
							) : null}
							{word.split("").map((char, charId) => {
								return <span key={char + charId}>{char}</span>;
							})}
							{isActive
								? extraLetters.map((char, charId) => {
										return (
											<span
												key={char + charId}
												className="wrong extra">
												{char}
											</span>
										);
								  })
								: typedHistory[idx]
								? typedHistory[idx]
										.slice(wordList[idx].length)
										.split("")
										.map((char, charId) => {
											return (
												<span
													key={char + charId}
													className="wrong extra">
													{char}
												</span>
											);
										})
								: null}
						</div>
					);
				})}
			</div>
			<span className="hint">
				<kbd>Ctrl</kbd> + <kbd>k</kbd> to open command pallet
			</span>
			<span className="hint-2">
				<kbd>Tab</kbd> to restart test
			</span>
		</div>
	);
}
