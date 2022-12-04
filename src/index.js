/* global BigInt */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Step1(props) {
  return (
    <div>
      <p>
        Step 1: enter 2 prime numbers p and q whose product is at least 10 <a href="https://raw.githubusercontent.com/FiveSquarz/apex-product/main/src/primes.txt" target="_blank">(list of prime numbers)</a>
      </p>
      <form onSubmit={props.handleSubmitPQ}>
        <label>
          p:
          <input type="text" value={props.p} onChange={props.handleChangeP} required />
        </label>
        <label>
          q:
          <input type="text" value={props.q} onChange={props.handleChangeQ} required />
        </label>
        <span>
          product: {props.p * props.q}
        </span>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function Step2To4(props) {
  return (
    <div>
      <p>Step 1: p = {props.p}, q = {props.q}</p>
      <p>Step 2: N = p * q = {props.p * props.q}</p>
      <p>Step 3: Φ(N) = (p - 1)(q - 1) = {(props.p - 1) * (props.q - 1)}</p>
      <p>Step 4: choose an integer e such that 1 &lt; e &lt; Φ(N) and e is coprime with N and Φ(N)</p>
      <p>{props.eOptions.join(" ")}</p>
      <form onSubmit={props.handleSubmitE}>
        <label>
          e:
          <input type="text" value={props.e} onChange={props.handleChangeE} required />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function Step5(props) {
  return (
    <div>
      <p>Step 1: p = {props.p}, q = {props.q}</p>
      <p>Step 2: N = {props.p * props.q}</p>
      <p>Step 3: Φ(N) = {(props.p - 1) * (props.q - 1)}</p>
      <p>Step 4: e = {props.e}</p>
      <p>Step 5: choose a positive integer d such that de % Φ(N) = 1</p>
      <p>{props.dOptions.join(" ")} ... + any multiple of Φ(N)</p>
      <form onSubmit={props.handleSubmitD}>
        <label>
          d:
          <input type="text" value={props.d} onChange={props.handleChangeD} required />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

function EncryptDecrypt(props) {
  return (
    <div>
      {/*<p>{(900n ** 5371n % 5767n).toString()}</p>
      <p>{(3480n ** 13891n % 5767n).toString()}</p>
  <p>!!!</p>*/}
      <form className="encryptDecrypt" onSubmit={props.handleSubmitEndecrypt}>
        <div>
          <label htmlFor="keyInput">
            key:
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
            text:
          </label>
          <textarea id="textInput" type="textarea" value={props.textInput} onChange={props.handleChangeTextInput} />
          <div />
        </div>
        <div>
          <label htmlFor="unicodeInput">
            unicode input:
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
      this.step = 4;
      this.setState({
        eOptions: this.generateEOptions()
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
    if (isNaN(e) || !this.state.eOptions.includes(e)) {
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
      /*this.step = 5;
      this.setState({
        dOptions: this.generateDOptions()
      }, () => {
        this.setState({
          visible: this.getStep5()
        });
      });*/
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
      newCodes += (BigInt(parseInt(code)) ** BigInt(this.state.key1) % BigInt(this.state.key2)).toString() + " ";
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
      result += String.fromCodePoint(code);
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
          Chuanhai's APEX product will be here.. soon :)
        </div>

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
        {this.state.visible}

      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
