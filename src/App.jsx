import {Input} from "./components/forms/Input.jsx";
import {Checkbox} from "./components/forms/Checkbox.jsx";
import {ProductCategoryRow} from "./components/ products/ProductCategoryRow.jsx";
import {ProductRow} from "./components/ products/ProductRow.jsx";
import {useState} from "react";
import {Range} from "./components/forms/Range.jsx";

const PRODUCTS = [
    {category: "Fruits", price: 3, stocked: true, name: "Apple"},
    {category: "Fruits", price: 8, stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: 7, stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: 5, stocked: true, name: "Spinach"},
    {category: "Vegetables", price: 2, stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: 4, stocked: true, name: "Peas"}
]

function App() {
    const [showStockedOnly, setShowStockedOnly] = useState(false)
    const [search, setSearch] = useState('')
    const [range, setRange] = useState(0)

    const visibleProducts = PRODUCTS.filter(product => {
        if (showStockedOnly && !product.stocked) {
            return false
        }

        if (search && !product.name.includes(search)) {
            return false
        }

        if (range && product.price < range) {
            return false
        }

        return true
    })

    return <div className="container my-3">
        <SearchBar
            search={search}
            onSearchChange={setSearch}
            showStockedOnly={showStockedOnly}
            onStockedOnlyChange={setShowStockedOnly}
            range={range}
            onRangeChange={setRange}
        />
        <ProductTable products={visibleProducts} />
    </div>
}

function SearchBar ({showStockedOnly, onStockedOnlyChange, search, onSearchChange, range, onRangeChange}) {
    return <div>
        <div className="mb-3">
        <Input value={search} placeholder="Rechercher..." onChange={onSearchChange} />
            <Checkbox id="stocked" checked={showStockedOnly} onChange={onStockedOnlyChange} label="N'afficher que les produits en stocks." />
            <Range value={range} onChange={onRangeChange}/>
        </div>
    </div>
}

function ProductTable({products}) {

    const rows = []
    let lastCategory = null

    for (let product of products) {
        if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
        }
        lastCategory = product.category
        rows.push(<ProductRow key={product.name} product={product} />)
    }

    return <table className="table">
        <thead>
        <tr>
            <th>Nom</th>
            <th>Prix</th>
        </tr>
        </thead>
        <tbody>
        {rows.length === 0 ? <center>Aucun produit trouvé.</center> : rows}
        </tbody>
    </table>
}
export default App
