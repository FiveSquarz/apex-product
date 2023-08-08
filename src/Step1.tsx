export default function Step1(props: {p: string, q: string, handleChangeP: React.ChangeEventHandler<HTMLInputElement>, handleChangeQ: React.ChangeEventHandler<HTMLInputElement>, handleSubmitPQ: React.FormEventHandler<HTMLFormElement>}) {
  const p = <span className="color1">p</span>;
  const q = <span className="color2">q</span>;
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <p>
        Step 1: enter 2 different prime numbers {p} and {q} whose product is at least 10 <a href="https://raw.githubusercontent.com/FiveSquarz/apex-product/main/src/assets/primes.txt" target="_blank">(list of prime numbers)</a>
      </p>
      <form autoComplete="off" onSubmit={props.handleSubmitPQ} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
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