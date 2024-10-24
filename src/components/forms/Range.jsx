export function Range({value, onChange}) {
    return <div className="form-range">
        <input className="m-3"
            type="range"
            value={value}
            min={0}
            max={10}
            onChange={(e) => onChange(e.target.value)}
        /><b>{value}</b>
    </div>
}