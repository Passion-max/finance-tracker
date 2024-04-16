import { useRef, useContext } from "react"

import { currencyFormatter } from "@/lib/utils";
import Model from "@/components/Model";
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";


import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function AddIncomeModal({ show, onClose }) {

    const { income, addIncomeItem, removeIncomeItem} = useContext(financeContext)
    const { user} = useContext(authContext)

    const amountRef = useRef();
    const descriptionRef = useRef();

    const addIncomeHandler = async (e) => {
        e.preventDefault()

        const newIncome = {
            amount: +amountRef.current.value,
            description: descriptionRef.current.value,
            createdAt: new Date(),
            uid: user.uid,

        };

        try {
            await addIncomeItem(newIncome);
            descriptionRef.current.value = "";
            amountRef.current.value = "";
            toast.success("Income added successfully!")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }

        
    }

    const deleteIncomeEntryHandler = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId)
            toast.success("Income deleted successfully!")
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    

    return (
        <Model show={show} onClose={onClose}>
            <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
                <div className="input-group">
                    <label htmlFor="amount"> Income Amount</label>
                    <input name="amount" type='number' min={0.01} step={0.01} ref={amountRef} placeholder="Enter Income amount" required />
                </div>

                <div className="input-group">
                    <label htmlFor="descirption"> Descirption</label>
                    <input type='text' name="descirption" ref={descriptionRef} placeholder="Enter Income Description" required />
                </div>

                <button type="submit" className="btn btn-primary">
                    Add Entry
                </button>
            </form>

            <div className="flex flex-col gap-4 mt-6">
                <h3 className="text-2xl font-bold">Income History</h3>

                {
                    income.map(i => {
                        return (
                            <div className="flex items-center justify-between" key={i.id}>
                                <div>
                                    <p className="font-semibold">{i.description}</p>
                                    <small className="text-xs">{i.createdAt.toISOString()}</small>
                                </div>
                                <p className="flex items-center gap-2">
                                    {currencyFormatter(i.amount)}
                                    <button onClick={() => { deleteIncomeEntryHandler(i.id) }}>
                                        <FaTrashAlt />
                                    </button>
                                </p>
                            </div>
                        )
                    })
                }
            </div>

        </Model>
    )
}

export default AddIncomeModal;