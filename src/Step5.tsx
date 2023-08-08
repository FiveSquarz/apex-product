export default function Step5(props: {p: string, q: string, e: string, d: string, dOptions: number[], handleChangeD: React.ChangeEventHandler<HTMLInputElement>, handleSubmitD: React.FormEventHandler<HTMLFormElement>}) {
  const p = <span className="color1">p</span>;
  const q = <span className="color2">q</span>;
  const pv = <span className="color1">{props.p}</span>;
  const qv = <span className="color2">{props.q}</span>;
  const N = <span className="color3">N</span>;
  const Nv = <span className="color3">{parseInt(props.p) * parseInt(props.q)}</span>;
  const phi = <span className="color4">Φ</span>;
  const phiv = <span className="color4">{(parseInt(props.p) - 1) * (parseInt(props.q) - 1)}</span>;
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
      <form autoComplete="off" onSubmit={props.handleSubmitD} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label>
          {d}:&nbsp;
          <input type="text" value={props.d} onChange={props.handleChangeD} required />
          <span className="transparent">d:&nbsp;</span>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>Examples: {props.dOptions.join(" ")} ... + any multiple of {phi}({N})</p>
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