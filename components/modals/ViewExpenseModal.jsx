import { useContext } from "react";
import { financeContext } from "@/lib/store/finance-context";
import Model from "@/components/Model";
import { currencyFormatter } from "@/lib/utils"

import { FaTrashAlt } from "react-icons/fa";

function ViewExpenseModal({ show, onClose, expense }) {
  const { deleteExpenseItem, deleteExpenseCategory} = useContext(financeContext)

  const deleteExpenesHandler = (item) => {
    try {
      const updatedItems = expense.items.filter((i) => i.id !== item.id);

      const updatedExpense = {
        items: [... updatedItems],
        total: expense.total - item.amount
      }

      deleteExpenseItem( updatedExpense, expense.id)
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteExpenseCategoryHandler = async () => {
    try {
      await deleteExpenseCategory(expense.id)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Model show={show} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl">{expense.title}</h2>
        <button  className="btn btn-danger">Delete</button>
      </div>

      <div>
        <h3 className="my-3 text-2xl">Expense History</h3>
        { expense && (
          expense.items.map((item) => {
           
            return (
              <div key={item.id} className="flex items-center justify-between">
                <small>
                  {item.createdAt && item.createdAt.toMillis ?
                    new Date(item.createdAt.toMillis()).toISOString() :
                    item.createdAt?.toISOString()}
                </small>
                <p className="flex items-center gap-2">
                  {currencyFormatter(item.amount)}
                  <button  ><FaTrashAlt/> </button>
                </p>
              </div>
            )
          })
        )

        }
      </div>
    </Model>
  )

};


export default ViewExpenseModal;


