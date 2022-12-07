/* global BigInt */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Step1(props) {
  const p = <span className="color1">p</span>;
  const q = <span className="color2">q</span>;
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <p>
        Step 1: enter 2 prime numbers {p} and {q} whose product is at least 10 <a href="https://raw.githubusercontent.com/FiveSquarz/apex-product/main/src/primes.txt" target="_blank">(list of prime numbers)</a>
      </p>
      <form onSubmit={props.handleSubmitPQ} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label>
          {p}:&nbsp;
          <input type="text" value={props.p} onChange={props.handleChangeP} required />
          <span className="transparent">p:&nbsp;</span> {/*centering*/}
        </label>
        <label>
          {q}:&nbsp;
          <input type="text" value={props.q} onChange={props.handleChangeQ} required />
          <span className="transparent">q:&nbsp;</span>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function Step2To4(props) {
  const p = <span className="color1">p</span>;
  const q = <span className="color2">q</span>;
  const pv = <span className="color1">{props.p}</span>;
  const qv = <span className="color2">{props.q}</span>;
  const N = <span className="color3">N</span>;
  const Nv = <span className="color3">{props.q * props.q}</span>;
  const phi = <span className="color4">Φ</span>;
  const phiv = <span className="color4">{(props.p - 1) * (props.q - 1)}</span>;
  const e = <span className="color5">e</span>;
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <p>Step 1: {p} = {pv}, {q} = {qv}</p>
      <p>Step 2: {N} = {p} * {q} = {Nv}</p>
      <p>Step 3: {phi}({N}) = ({p} - 1)({q} - 1) = {phiv}</p>
      <p>Step 4: choose an integer {e} such that 1 &lt; {e} &lt; {phi}({N}) and {e} is coprime with {N} and {phi}({N})</p>
      <form onSubmit={props.handleSubmitE} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label>
          {e}:&nbsp;
          <input type="text" value={props.e} onChange={props.handleChangeE} required />
          <span className="transparent">e:&nbsp;</span>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>examples: {props.eOptions.join(" ")}</p>
    </div>
  );
}

function Step5(props) {
  const p = <span className="color1">p</span>;
  const q = <span className="color2">q</span>;
  const pv = <span className="color1">{props.p}</span>;
  const qv = <span className="color2">{props.q}</span>;
  const N = <span className="color3">N</span>;
  const Nv = <span className="color3">{props.q * props.q}</span>;
  const phi = <span className="color4">Φ</span>;
  const phiv = <span className="color4">{(props.p - 1) * (props.q - 1)}</span>;
  const e = <span className="color5">e</span>;
  const ev = <span className="color5">{props.e}</span>;
  const d = <span className="color6">d</span>;
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <p>Step 1: {p} = {pv}, {q} = {qv}</p>
      <p>Step 2: {N} = {Nv}</p>
      <p>Step 3: {phi}({N}) = {phiv}</p>
      <p>Step 4: {e} = {ev}</p>
      <p>Step 5: choose a positive integer {d} such that {d}{e} % {phi}({N}) = 1</p>
      <form onSubmit={props.handleSubmitD} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label>
          {d}:&nbsp;
          <input type="text" value={props.d} onChange={props.handleChangeD} required />
          <span className="transparent">d:&nbsp;</span>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>examples: {props.dOptions.join(" ")} ... + any multiple of {phi}({N})</p>
      <div />
      <div style={{display: "flex"}}>
        <div style={{width: "160px"}}>Your public key will be: </div><div style={{width: "50px"}}>({e}, {N})</div>
      </div>
      <div style={{display: "flex"}}>
        <div style={{width: "160px"}}>Your private key will be: </div><div style={{width: "50PX"}}>({d}, {N})</div>
      </div>
    </div>
  );
}

function Step6(props) {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>Your public key is: ({props.e}, {props.p * props.q})</div>
      <div>Your private key is: ({props.d}, {props.p * props.q})</div>
    </div>
  )
}

function EncryptDecrypt(props) {
  return (
    <div>
      <form className="encryptDecrypt" onSubmit={props.handleSubmitEndecrypt}>
        <div>
          <label htmlFor="keyInput">
            key:&nbsp;
          </label>
          (
          <input id="keyInput" type="text" value={props.key1} onChange={props.handleChangeKey1} required />
          ,&nbsp;
          <input type="text" value={props.key2} onChange={props.handleChangeKey2} required />
          )
          <div />
        </div>
        <div>
          <label htmlFor="textInput">
            text:&nbsp;
          </label>
          <textarea id="textInput" type="textarea" value={props.textInput} onChange={props.handleChangeTextInput} />
          <div />
        </div>
        <div>
          <label htmlFor="unicodeInput">
            unicode:&nbsp;
          </label>
          <textarea id="unicodeInput" type="textarea" value={props.unicodeInput} onChange={props.handleChangeUnicodeInput} />
          <div />
          </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

class App extends React.Component {

  constructor(props) {
    super(props);

    this.step = 1;

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
      visible: this.getStep1(),

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

  getStepN(step) {
    if (step == 1) {
      return this.getStep1();
    } else if (step >= 2 && step <= 4) {
      return this.getStep2To4();
    } else if (step == 5) {
      return this.getStep5();
    } else if (step == 6) {
      return this.getStep6();
    }
  }

  getStep1() {
    return <Step1 p={this.state != null ? this.state.p : ""} q={this.state != null ? this.state.q : ""} handleChangeP={this.handleChangeP} handleChangeQ={this.handleChangeQ} handleSubmitPQ={this.handleSubmitPQ} />;
  }

  getStep2To4() {
    return <Step2To4 p={this.state.p} q={this.state.q} e={this.state.e} eOptions={this.state.eOptions} handleChangeE={this.handleChangeE} handleSubmitE={this.handleSubmitE} />;
  }

  getStep5() {
    return <Step5 p={this.state.p} q={this.state.q} e={this.state.e} d={this.state.d} dOptions={this.state.dOptions} handleChangeD={this.handleChangeD} handleSubmitD={this.handleSubmitD} />;
  }

  getStep6() {
    return <Step6 p={this.state.p} q={this.state.q} e={this.state.e} d={this.state.d} />;
  }

  getEncryptDecrypt() {
    return <EncryptDecrypt key1={this.state.key1} key2={this.state.key2} textInput={this.state.textInput} unicodeInput={this.state.unicodeInput} handleChangeKey1={this.handleChangeKey1} handleChangeKey2={this.handleChangeKey2} handleChangeTextInput={this.handleChangeTextInput} handleChangeUnicodeInput={this.handleChangeUnicodeInput} handleSubmitEndecrypt={this.handleSubmitEndecrypt} />;
  }

  handleChangeP(event) {
    this.setState({
      p: isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value)
    }, () => {
      this.setState({
        visible: this.getStep1(event.target.value, this.state.q)
      });
    });
  }

  handleChangeQ(event) {
    this.setState({
      q: isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value)
    }, () => {
      this.setState({
        visible: this.getStep1(this.state.p, event.target.value)
      });
    });
  }

  handleSubmitPQ(event) {
    const p = parseInt(this.state.p);
    const q = parseInt(this.state.q);
    if (isNaN(p) || isNaN(q) || !this.isPrime(p) || !this.isPrime(q) || p * q <= 9) {
      alert("your inputs are invalid");
    } else {
      let allEOptions = this.generateEOptions();
      let temp = [...allEOptions];
      let eOptions = [];

      //1 option
      eOptions.push(temp[0]);
      temp = temp.slice(1);

      //2 options
      if (temp.length >= 1) {
        eOptions.push(temp.pop());
      }

      //up to 3 more options
      temp = temp.sort(() => 0.5 - Math.random());
      for (let i = 0; i < 3 && i < temp.length; i++) {
        eOptions.push(temp.pop());
      }
      eOptions.sort((a, b) => a - b);

      this.step = 4;
      this.setState({
        allEOptions: allEOptions,
        eOptions: eOptions,
      }, () => {
        this.setState({
          visible: this.getStep2To4(),
        });
      });
    }
    event.preventDefault();
  }

  handleChangeE(event) {
    this.setState({
      e: isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value)
    }, () => {
      this.setState({
        visible: this.getStep2To4()
      });
    });
  }

  handleSubmitE(event) {
    const e = parseInt(this.state.e);
    if (isNaN(e) || !this.state.allEOptions.includes(e)) {
      alert("your input is invalid");
    } else {
      this.step = 5;
      this.setState({
        dOptions: this.generateDOptions()
      }, () => {
        this.setState({
          visible: this.getStep5()
        });
      });
    }
    event.preventDefault();
  }

  handleChangeD(event) {
    this.setState({
      d: isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value)
    }, () => {
      this.setState({
        visible: this.getStep5()
      });
    });
  }

  handleSubmitD(event) {
    const d = parseInt(this.state.d);
    if (isNaN(d) || !this.state.dOptions.includes(d)) {
      alert("your input is invalid");
    } else {
      this.step = 6;
      this.setState({
        visible: this.getStep6()
      });
    }
    event.preventDefault();
  }

  handleChangeKey1(event) {
    this.setState({
      key1: isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value)
    }, () => {
      this.setState({
        visible: this.getEncryptDecrypt()
      });
    });
  }

  handleChangeKey2(event) {
    this.setState({
      key2: isNaN(parseInt(event.target.value)) ? "" : parseInt(event.target.value)
    }, () => {
      this.setState({
        visible: this.getEncryptDecrypt()
      });
    });
  }

  handleChangeTextInput(event) {
    this.setState({
      textInput: event.target.value,

      unicodeInput: this.textToUnicode(event.target.value)
    }, () => {
      this.setState({
        visible: this.getEncryptDecrypt()
      })
    });
  }

  handleChangeUnicodeInput(event) {
    const newUnicode = event.target.value.replaceAll(/[^\d| ]/g, "");
    this.setState({
      unicodeInput: newUnicode,

      textInput: this.unicodeToText(newUnicode)
    }, () => {
      this.setState({
        visible: this.getEncryptDecrypt()
      })
    });
  }

  handleSubmitEndecrypt(event) {
    let newCodes = "";
    for (const code of this.state.unicodeInput.split(" ")) {
      newCodes += (BigInt(code) ** BigInt(this.state.key1) % BigInt(this.state.key2)).toString() + " ";
    }
    newCodes = newCodes.slice(0, -1);

    this.setState({
      unicodeInput: newCodes,
      textInput: this.unicodeToText(newCodes)
    }, () => {
      this.setState({
        visible: this.getEncryptDecrypt()
      });
    });
    event.preventDefault();
  }

  textToUnicode(text) {
    let result = "";
    for (const char of text) {
      result += char.codePointAt(0) + " ";
    }
    return result.slice(0, -1);
  }

  unicodeToText(unicode) {
    let result = "";
    for (const code of unicode.split(" ").filter((value, index, arr) => {return value != ""})) {
      result += BigInt(code) <= BigInt(1114111) ? String.fromCodePoint(code) : " ";
    }
    return result;
  }

  isPrime(num) {
    for (let i = 3; i * i <= num; i += 2)
      if (num % i === 0) return false;
    return num >= 2 && (num == 2 || num % 2 != 0);
  }

  gcf(a, b) {
    if (!b) {
      return a;
    }

    return this.gcf(b, a % b);
  }

  isCoprime(a, b) {
    return this.gcf(a, b) == 1;
  }

  generateEOptions() {
    let options = [];
    const totient = (this.state.p - 1) * (this.state.q - 1);
    for (let i = 2; i < totient; i++) {
      if (this.isCoprime(i, this.state.p * this.state.q) && this.isCoprime(i, totient)) {
        options.push(i);
      }
    }
    return options;
  }

  //de mod phi(N) = 1
  generateDOptions() {
    let options = [];
    const totient = (this.state.p - 1) * (this.state.q - 1);

    let de = this.state.e;
    while (options.length < 5) {
      if (de % totient == 1) {
        options.push(de / this.state.e);
      }
      de += this.state.e;
    }
    return options;
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="game" style={{ fontSize: "5vmin" }}>
          RSA Encryption Demo
        </div>
        <div className="game" style={{ fontSize: "2vmin"}}>
          Chuanhai Xu's APEX Product
        </div>

        <div style={{height: "40px"}} />

        <div className='game'>
          <button onClick={() => {
            this.setState({ visible: this.getStepN(this.step) })
          }}>
            Generate Keys
          </button>
          <button onClick={() => {
            this.setState({ visible: this.getEncryptDecrypt() })
          }}>
            Encrypt/Decrypt
          </button>
        </div>

        <div style={{height: "40px"}} />

        {this.state.visible}

      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
