import React, {useState, useEffect} from "react"
import trash from "../public/trash2.svg"


function Tracker(){

    const inputValue = document.querySelectorAll(".input")
    const categoryList = ["Groceries", "Utilities", "Tax", "Movies", "Rent", "Shopping"]
    const categories = categoryList.map((categoryItem, index) => <option value={categoryItem} key={index}>{categoryItem}</option>)

    const [expense, setExpense] = useState(() => {
        const stored = localStorage.getItem("exp")
        return stored ? JSON.parse(stored) : []
    })
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleAmount = (e) => {
        setAmount(Number(e.target.value))
    }
    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleAddExpence = (e) => {
        e.preventDefault()
        if(title && amount && category){
            const expenseItem = {
                title: title,
                amount: amount,
                category: category
            }
            setExpense(e => [...e, expenseItem])
            inputValue.forEach((item) => item.value = "")
            setTitle("")
            setAmount("")
            setCategory("")
        }
    }

    function handleDelete(index){
        const updatedExpenses = expense.filter((_, i) => i !== index);
        setExpense(updatedExpenses);
    }

    const filteredExpenses = expense.filter(item => selectedCategory === "All" || item.category === selectedCategory);

    const expenses = filteredExpenses.map((item, index) => 
        <div key={index} className="item">
            <p>{item.title}</p>
            <p>{item.amount}</p>
            <button onClick={() => handleDelete(index)}>
                <img src="../public/trash2.svg" alt=""/>
            </button>
        </div>);

    const filterWithCategory = (e) => {
        setSelectedCategory(e.target.value);
    }

    const total = () => {
        let sum = 0
        for (let i = 0; i < filteredExpenses.length; i++){
            sum += filteredExpenses[i].amount
        }
        return Number(sum)
    }

    useEffect(() => {
        localStorage.setItem("exp", JSON.stringify(expense))
    }, [expense])


    return(
        <div className="container">
            <h1>Expense Tracker</h1>
            <h2>Add Expense</h2>
            <form action="">
                <input type="text" className="input" placeholder="Title" onChange={(e) => handleTitle(e)} required/>
                <div className="amt-cty">
                    <input type="number" className="input" placeholder="Amount" onChange={(e) => handleAmount(e)} required/>
                    <select className="input" onChange={(e) => handleCategory(e)} required style={{appearance: "none", WebkitAppearance: "none", MozAppearance: "none"}}>
                        <option value="">Category</option>
                        {categories}
                    </select>
                </div>
                <button type="submit" onClick={handleAddExpence}>Add Expenses</button>
            </form>

            <div className="display">
                <select onChange={(e) => filterWithCategory(e)} style={{appearance: "none", WebkitAppearance: "none", MozAppearance: "none"}}>
                    <option value="All">All</option>
                    {categories}
                </select>
                <div className="list">
                    {expenses}
                </div>
                <p>Total: ${total()}</p>
            </div>
        </div>
    );
}
export default Tracker;