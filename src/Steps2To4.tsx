export default function Step2To4(props: {p: string, q: string, e: string, eOptions: number[], handleChangeE: React.ChangeEventHandler<HTMLInputElement>, handleSubmitE: React.FormEventHandler<HTMLFormElement>}) {
  const p = <span className="color1">p</span>;
  const q = <span className="color2">q</span>;
  const pv = <span className="color1">{props.p}</span>;
  const qv = <span className="color2">{props.q}</span>;
  const N = <span className="color3">N</span>;
  const Nv = <span className="color3">{parseInt(props.p) * parseInt(props.q)}</span>;
  const phi = <span className="color4">Φ</span>;
  const phiv = <span className="color4">{(parseInt(props.p) - 1) * (parseInt(props.q) - 1)}</span>;
  const e = <span className="color5">e</span>;
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <p>Step 1: {p} = {pv}, {q} = {qv}</p>
      <p>Step 2: {N} = {p} * {q} = {Nv}</p>
      <p>Step 3: {phi}({N}) = ({p} - 1)({q} - 1) = {phiv}</p>
      <p>Step 4: choose an integer {e} such that 1 &lt; {e} &lt; {phi}({N}) and {e} is coprime with {N} and {phi}({N})</p>
      <form autoComplete="off" onSubmit={props.handleSubmitE} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <label>
          {e}:&nbsp;
          <input type="text" value={props.e} onChange={props.handleChangeE} required />
          <span className="transparent">e:&nbsp;</span>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>Examples: {props.eOptions.join(" ")}</p>
    </div>
  );
}