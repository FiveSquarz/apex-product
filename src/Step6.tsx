export default function Step6(props: {p: string, q: string, e: string, d: string}) {
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div>Your public key is: ({props.e}, {parseInt(props.p) * parseInt(props.q)})</div>
      <div>Your private key is: ({props.d}, {parseInt(props.p) * parseInt(props.q)})</div>
    </div>
  )
}