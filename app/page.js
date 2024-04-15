"use client";

import { useState, useContext, useEffect } from "react";

import { currencyFormatter } from "@/lib/utils"
import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import ExpensesCategoryItem from "@/components/ExpeneseCategoryItem";
import AddIncomeModal from "@/components/modals/AddIncomeModal"
import AddExpensesModal from "@/components/modals/AddExpensesModal"
import SignIn from "@/components/signin";


import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";



ChartJS.register(ArcElement, Tooltip, Legend);



export default function Home() {

  const [showAddIncomeModal, setshowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setshowAddExpenseModal] = useState(false);
  const { expenses, income } = useContext(financeContext)
  const { user } = useContext(authContext)


  const [balance, setBalance] = useState(0)

  useEffect(() => {
    const newBalance = income.reduce((total, i) => total + (parseFloat(i.amount) || 0), 0) - expenses.reduce((total, e) => total + (parseFloat(e.total) || 0), 0);
    setBalance(newBalance);
  }, [expenses, income])

  if(!user) {
    return <SignIn />
  }
  return (

    <>
      <AddIncomeModal show={showAddIncomeModal} onClose={setshowAddIncomeModal} />
      <AddExpensesModal show={showAddExpenseModal} onClose={setshowAddExpenseModal} />
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-grey-600 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button onClick={() => { setshowAddExpenseModal(true) }} className="btn btn-primary">+ Expenses</button>
          <button onClick={() => { setshowAddIncomeModal(true) }} className="btn btn-primary-outline"> + Income</button>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {
              expenses.map((expense) => {
                return (
                  <ExpensesCategoryItem key={expense.id} expense={expense} />
                )
              })
            }

          </div>
        </section>

        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>

          <div className="w-1/2 mx-auto">
            <Doughnut data={{
              labels: expenses.map((expense) => expense.title),
              datasets: [{
                labels: "Expense",
                data: expenses.map((expense) => expense.total),
                backgroundColor: expenses.map((expense) => expense.color),
                borderColor: ["#18181b"],
                borderWidth: 5,
              }
              ]
            }} />
          </div>
        </section>


      </main>
    </>



  );
}
