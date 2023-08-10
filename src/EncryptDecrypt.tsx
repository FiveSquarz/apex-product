export default function EncryptDecrypt(props: {key1: string, key2: string, textInput: string, unicodeInput: string, handleChangeKey1: React.ChangeEventHandler<HTMLInputElement>, handleChangeKey2: React.ChangeEventHandler<HTMLInputElement>, handleChangeTextInput: React.ChangeEventHandler<HTMLTextAreaElement>, handleChangeUnicodeInput: React.ChangeEventHandler<HTMLTextAreaElement>, handleSubmitEndecrypt: React.FormEventHandler<HTMLFormElement>}) {
  return (
    <div>
      <form autoComplete="off" className="encryptDecrypt" onSubmit={props.handleSubmitEndecrypt}>
        <div>
          <label htmlFor="keyInput">
            Key:&nbsp;
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
            Text:&nbsp;
          </label>
          <textarea id="textInput" spellCheck={false} value={props.textInput} onChange={props.handleChangeTextInput} />
          <div />
        </div>
        <div>
          <label htmlFor="unicodeInput">
            Unicode:&nbsp;
          </label>
          <textarea id="unicodeInput" spellCheck={false} value={props.unicodeInput} onChange={props.handleChangeUnicodeInput} />
          <div />
          </div>
        <input type="submit" value="Submit" />
      </form>
      <div>&nbsp;</div>
      <div>
        Transforms each Unicode value into code<sup>Key<sub>1</sub></sup> % Key<sub>2</sub>
      </div>
      <div>&nbsp;</div>
      <div>
        Try using either your public or private key to encrypt a message, then use the other key to decrypt the ciphertext!
      </div>
      <div>&nbsp;</div>
      <div>
        If the site refreshes when you click submit, that means your key was too large and your browser ran out of memory trying to perform the computation (the exponents can be massive!)
      </div>
      <div>&nbsp;</div>
      <div>
        If your Key<sub>2</sub> is too small ({"<"} &tilde;125), common characters with low Unicode values in your message may be lost due to the modulo
      </div>
    </div>
  );
}