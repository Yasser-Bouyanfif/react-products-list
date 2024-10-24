export function Input({placeholder, value, onChange}) {
    return <div>
        <input type="text"
               className="form-control mt-3"
               placeholder={placeholder}
               value={value}
               onChange={(e) => onChange(e.target.value)}
               />
    </div>
}