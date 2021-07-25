import React from "react";
import Result from "./components/Result";
import Test from "./components/Test";

export default class App extends React.Component {
	state = {
		currWord: "",
		typedWord: "",
		timer: 60,
		correctWords: 0,
		incorrectWords: 0,
		correctChars: 0,
		incorrectChars: 0,
	};
	timer = null;
	words = [
		"the",
		"be",
		"of",
		"and",
		"a",
		"to",
		"in",
		"he",
		"have",
		"it",
		"that",
		"for",
		"they",
		"I",
		"with",
		"as",
		"not",
		"on",
		"she",
		"at",
		"by",
		"this",
		"we",
		"you",
		"do",
		"but",
		"from",
		"or",
		"which",
		"one",
		"would",
		"all",
		"will",
		"there",
		"say",
		"who",
		"make",
		"when",
		"can",
		"more",
		"if",
		"no",
		"man",
		"out",
		"other",
		"so",
		"what",
		"time",
		"up",
		"go",
		"about",
		"than",
		"into",
		"could",
		"state",
		"only",
		"new",
		"year",
		"some",
		"take",
		"come",
		"these",
		"know",
		"see",
		"use",
		"get",
		"like",
		"then",
		"first",
		"any",
		"work",
		"now",
		"may",
		"such",
		"give",
		"over",
		"think",
		"most",
		"even",
		"find",
		"day",
		"also",
		"after",
		"way",
		"many",
		"must",
		"look",
		"before",
		"great",
		"back",
		"through",
		"long",
		"where",
		"much",
		"should",
		"well",
		"people",
		"down",
		"own",
		"just",
		"because",
		"good",
		"each",
		"those",
		"feel",
		"seem",
		"how",
		"high",
		"too",
		"place",
		"little",
		"world",
		"very",
		"still",
		"nation",
		"hand",
		"old",
		"life",
		"tell",
		"write",
		"become",
		"here",
		"show",
		"house",
		"both",
		"between",
		"need",
		"mean",
		"call",
		"develop",
		"under",
		"last",
		"right",
		"move",
		"thing",
		"general",
		"school",
		"never",
		"same",
		"another",
		"begin",
		"while",
		"number",
		"part",
		"turn",
		"real",
		"leave",
		"might",
		"want",
		"point",
		"form",
		"off",
		"child",
		"few",
		"small",
		"since",
		"against",
		"ask",
		"late",
		"home",
		"interest",
		"large",
		"person",
		"end",
		"open",
		"public",
		"follow",
		"during",
		"present",
		"without",
		"again",
		"hold",
		"govern",
		"around",
		"possible",
		"head",
		"consider",
		"word",
		"program",
		"problem",
		"however",
		"lead",
		"system",
		"set",
		"order",
		"eye",
		"plan",
		"run",
		"keep",
		"face",
		"fact",
		"group",
		"play",
		"stand",
		"increase",
		"early",
		"course",
		"change",
		"help",
		"line",
	];

	BLACKLISTED_KEYS = [
		"Escape",
		"CapsLock",
		"Enter",
		"OS",
		"Alt",
		"Control",
		"Shift",
		"F1",
		"F2",
		"F3",
		"F4",
		"F5",
		"F6",
		"F7",
		"F8",
		"F9",
		"F10",
		"F11",
		"F12",
	];

	recordTest = (e) => {
		if (this.timer === null) {
			this.timer = setInterval(() => {
				this.setState({ timer: this.state.timer - 1 }, () => {
					if (this.state.timer === 0) {
						clearInterval(this.timer);
					}
				});
			}, 1000);
		}
		const currIdx = this.words.indexOf(this.state.currWord);
		const currWord = document.getElementById("active");
		if (this.state.timer > 0) {
			currWord.scrollIntoView({ behavior: "smooth", block: "center" });
			const caret = document.getElementById("caret");
			caret.classList.remove("blink");
			setTimeout(() => {
				caret.classList.add("blink");
			}, 1000);
			switch (e.key) {
				case " ":
					if (this.state.typedWord === "") {
						return;
					}
					if (this.state.currWord === this.state.typedWord) {
						this.setState({
							correctWords: this.state.correctWords + 1,
							correctChars:
								this.state.correctChars +
								this.state.currWord.length,
						});
					} else {
						this.setState({
							incorrectWords: this.state.incorrectWords + 1,
							incorrectChars:
								this.state.incorrectChars +
								this.state.currWord.length,
						});
					}
					currWord.classList.add(
						this.state.typedWord !== this.state.currWord
							? "wrong"
							: "right"
					);
					this.setState({
						typedWord: "",
						currWord: this.words[currIdx + 1],
					});
					break;
				case "Backspace":
					if (e.ctrlKey) {
						this.setState({ typedWord: "" });
						currWord.childNodes.forEach((char) => {
							char.classList.remove("wrong", "right");
						});
					} else {
						this.setState(
							{
								typedWord: this.state.typedWord.slice(
									0,
									this.state.typedWord.length - 1
								),
							},
							() => {
								let idx = this.state.typedWord.length;
								if (idx < this.state.currWord.length)
									currWord.children[idx + 1].classList.remove(
										"wrong",
										"right"
									);
							}
						);
					}
					break;
				default:
					this.setState(
						{ typedWord: this.state.typedWord + e.key },
						() => {
							let idx = this.state.typedWord.length;
							if (
								this.state.currWord[idx - 1] !==
								this.state.typedWord[idx - 1]
							) {
								currWord.children[idx].classList.add("wrong");
							} else {
								currWord.children[idx].classList.add("right");
							}
						}
					);
					break;
			}
		}
	};

	resetTest = () => {
		document
			.querySelectorAll(".wrong, .right")
			.forEach((el) => el.classList.remove("wrong", "right"));
		this.words = this.words.sort(() => Math.random() - 0.5);
		clearInterval(this.timer);
		this.timer = null;
		this.setState({
			timer: 60,
			currWord: this.words[0],
			typedWord: "",
			correctChars: 0,
			correctWords: 0,
			incorrectWords: 0,
			incorrectChars: 0,
		});
	};

	componentDidMount() {
		this.words = this.words.sort(() => Math.random() - 0.5);
		this.setState({ currWord: this.words[0] });
		document.body.onkeydown = (e) => {
			if (e.key === "Tab") {
				this.resetTest();
				document.getElementsByClassName("word")[0].scrollIntoView();
				e.preventDefault();
			} else if (this.BLACKLISTED_KEYS.indexOf(e.key) === -1) {
				this.recordTest(e);
			}
		};
	}

	componentWillUnmount() {
		document.body.onkeydown = null;
	}

	render() {
		return (
			<>
				{this.state.timer !== 0 ? (
					<Test
						words={this.words}
						currWord={this.state.currWord}
						typedWord={this.state.typedWord}
						timer={this.state.timer}
					/>
				) : (
					<Result
						data={this.state}
						resetTest={() => this.resetTest()}
					/>
				)}
			</>
		);
	}
}