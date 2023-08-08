import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Step1 from './Step1';
import Step2To4 from './Steps2To4';
import Step5 from './Step5';
import Step6 from './Step6';
import EncryptDecrypt from './EncryptDecrypt';

type AppState = {
  step: number
  onEncryptScreen: boolean
  p: string
  q: string
  e: string
  d: string
  allEOptions: number[]
  eOptions: number[]
  dOptions: number[]
  key1: string
  key2: string
  textInput: string
  unicodeInput: string
}

class App extends React.Component<{}, AppState> {

  constructor(props: {}) {
    super(props);

    this.handleChangeP = this.handleChangeP.bind(this);
    this.handleChangeQ = this.handleChangeQ.bind(this);
    this.handleSubmitPQ = this.handleSubmitPQ.bind(this);

    this.handleChangeE = this.handleChangeE.bind(this);
    this.handleSubmitE = this.handleSubmitE.bind(this);

    this.handleChangeD = this.handleChangeD.bind(this);
    this.handleSubmitD = this.handleSubmitD.bind(this);

    this.handleChangeKey1 = this.handleChangeKey1.bind(this);
    this.handleChangeKey2 = this.handleChangeKey2.bind(this);

    this.handleChangeTextInput = this.handleChangeTextInput.bind(this);
    this.handleChangeUnicodeInput = this.handleChangeUnicodeInput.bind(this);
    this.handleSubmitEndecrypt = this.handleSubmitEndecrypt.bind(this);

    this.state = {
      step: 1,
      onEncryptScreen: false,

      p: "",
      q: "",
      e: "",
      d: "",

      allEOptions: [],
      eOptions: [],
      dOptions: [],

      key1: "",
      key2: "",

      textInput: "",
      unicodeInput: "",
    };
  }

  handleChangeP(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      p: event.target.value.replace(/[^\d]/g, "")
    });
  }

  handleChangeQ(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      q: event.target.value.replace(/[^\d]/g, "")
    });
  }

  handleSubmitPQ(event: React.FormEvent<HTMLFormElement>) {
    const p = parseInt(this.state.p);
    const q = parseInt(this.state.q);
    if (isNaN(p) || !this.isPrime(p)) {
      alert("p should be a prime number")
    } else if (isNaN(q) || !this.isPrime(q)) {
      alert("q should be a prime number")
    } else if (p == q) {
      alert("p and q should be different prime numbers")
    } else if (p * q <= 9) {
      alert("The product of p and q should be at least 10")
    } else {
      let allEOptions = this.generateEOptions();
      let temp = [...allEOptions];
      let eOptions: number[] = [];

      //1 option
      eOptions.push(temp[0]);
      temp = temp.slice(1);

      //2 options
      if (temp.length >= 1) {
        eOptions.push(temp.pop() || 0);
      }

      //up to 3 more options
      temp = temp.sort(() => 0.5 - Math.random());
      for (let i = 0; i < 3 && i < temp.length; i++) {
        eOptions.push(temp.pop() || 0);
      }
      eOptions.sort((a, b) => a - b);

      this.setState({
        step: 4,
        allEOptions: allEOptions,
        eOptions: eOptions,
      });
    }
    event.preventDefault(); //prevent refreshing site when clicking "ok" on error
  }

  handleChangeE(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      e: event.target.value.replace(/[^\d]/g, "")
    });
  }

  handleSubmitE(event: React.FormEvent<HTMLFormElement>) {
    const e = parseInt(this.state.e);
    if (isNaN(e) || !this.state.allEOptions.includes(e)) {
      alert("Your input does not meet the criteria");
    } else {
      this.setState({
        step: 5,
        dOptions: this.generateDOptions()
      });
    }
    event.preventDefault();
  }

  handleChangeD(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      d: event.target.value.replace(/[^\d]/g, "")
    });
  }

  handleSubmitD(event: React.FormEvent<HTMLFormElement>) {
    const d = parseInt(this.state.d);
    if (isNaN(d) || !this.state.dOptions.includes(d)) {
      alert("Your input does not meet the criteria");
    } else {
      this.setState({
        step: 6,
      });
    }
    event.preventDefault();
  }

  handleChangeKey1(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      key1: event.target.value.replace(/[^\d]/g, "")
    });
  }

  handleChangeKey2(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      key2: event.target.value.replace(/[^\d]/g, "")
    });
  }

  handleChangeTextInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      textInput: event.target.value,
      unicodeInput: this.textToUnicode(event.target.value)
    });
  }

  handleChangeUnicodeInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newUnicode = event.target.value.replace(/[^\d| ]/g, "");
    this.setState({
      unicodeInput: newUnicode,
      textInput: this.unicodeToText(newUnicode)
    });
  }

  handleSubmitEndecrypt(event: React.FormEvent<HTMLFormElement>) {
    let newCodes = "";
    for (const code of this.state.unicodeInput.split(" ")) {
      newCodes += (BigInt(code) ** BigInt(this.state.key1) % BigInt(this.state.key2)).toString() + " ";
    }
    newCodes = newCodes.slice(0, -1);

    this.setState({
      unicodeInput: newCodes,
      textInput: this.unicodeToText(newCodes)
    });
    event.preventDefault();
  }

  textToUnicode(text: string) {
    let result = "";
    for (const char of text) {
      result += char.codePointAt(0) + " ";
    }
    return result.slice(0, -1);
  }

  unicodeToText(unicode: string) {
    let result = "";
    for (const code of unicode.split(" ").filter((value, _, __) => {return value != ""})) {
      //1114111 is last valid code point
      result += BigInt(code) <= BigInt(1114111) ? String.fromCodePoint(parseInt(code)) : " ";
    }
    return result;
  }

  isPrime(num: number) {
    for (let i = 3; i * i <= num; i += 2)
      if (num % i === 0) return false;
    return num >= 2 && (num == 2 || num % 2 != 0);
  }

  gcf(a: number, b: number): number {
    if (!b)
      return a;
    return this.gcf(b, a % b);
  }

  isCoprime(a: number, b: number) {
    return this.gcf(a, b) == 1;
  }

  generateEOptions() {
    let options = [];
    const totient = (parseInt(this.state.p) - 1) * (parseInt(this.state.q) - 1);
    for (let i = 2; i < totient; i++) {
      if (this.isCoprime(i, parseInt(this.state.p) * parseInt(this.state.q)) && this.isCoprime(i, totient)) {
        options.push(i);
      }
    }
    return options;
  }

  //de mod phi(N) = 1
  generateDOptions() {
    let options = [];
    const totient = (parseInt(this.state.p) - 1) * (parseInt(this.state.q) - 1);

    let de = parseInt(this.state.e);
    while (options.length < 5) {
      if (de % totient == 1) {
        options.push(de / parseInt(this.state.e));
      }
      de += parseInt(this.state.e);
    }
    return options;
  }

  render() {
    let toShow: ReactNode
    if (this.state.onEncryptScreen)
      toShow = <EncryptDecrypt key1={this.state.key1} key2={this.state.key2} textInput={this.state.textInput} unicodeInput={this.state.unicodeInput} handleChangeKey1={this.handleChangeKey1} handleChangeKey2={this.handleChangeKey2} handleChangeTextInput={this.handleChangeTextInput} handleChangeUnicodeInput={this.handleChangeUnicodeInput} handleSubmitEndecrypt={this.handleSubmitEndecrypt} />;
    else if (this.state.step === 1)
      toShow = <Step1 p={this.state != null ? this.state.p : ""} q={this.state != null ? this.state.q : ""} handleChangeP={this.handleChangeP} handleChangeQ={this.handleChangeQ} handleSubmitPQ={this.handleSubmitPQ} />;
    else if (this.state.step === 4)
      toShow = <Step2To4 p={this.state.p} q={this.state.q} e={this.state.e} eOptions={this.state.eOptions} handleChangeE={this.handleChangeE} handleSubmitE={this.handleSubmitE} />;
    else if (this.state.step === 5)
      toShow = <Step5 p={this.state.p} q={this.state.q} e={this.state.e} d={this.state.d} dOptions={this.state.dOptions} handleChangeD={this.handleChangeD} handleSubmitD={this.handleSubmitD} />;
    else if (this.state.step === 6)
      toShow = <Step6 p={this.state.p} q={this.state.q} e={this.state.e} d={this.state.d} />;

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: "5vmin" }}>
          RSA Encryption Demo
        </div>

        <div style={{height: "40px"}} />

        <div>
          <button onClick={() => {
            this.setState({ onEncryptScreen: false })
          }}>
            Generate Keys
          </button>
          <button onClick={() => {
            this.setState({ onEncryptScreen: true })
          }}>
            Encrypt/Decrypt
          </button>
        </div>

        <div style={{height: "40px"}} />

        {toShow}

      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
