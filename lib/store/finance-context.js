"use client"
import { createContext, useState, useEffect, useContext } from "react";

import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { authContext } from "./auth-context";

export const financeContext = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => { },
    removeIncomeItem: async () => { },
    addExpenseItem: async () => { },
    addCategory: async () => { },
    deleteExpenseItem: async () => { },
    deleteExpenseCategory: async () => { },
});

export default function FinanceContextProvider({ children }) {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

    const {user} = useContext(authContext)

    const addCategory = async (category) => {
        try {
            const collectionRef = collection(db, "expenses")

            const docsSnap = await addDoc(collectionRef, {
                uid: user.uid,
                ...category,
                items:[],
            })

            setExpenses((prevExpense) => {
                return [
                    ...prevExpense,
                    {
                        id: docsSnap.id,
                        uid:user.uid,
                        items:[],
                    }
                ]
            } )
        } catch (error) {
            throw error
        }
    }

    const deleteExpenseCategory = async (expenseCategoryId) => {
        try {
            const docRef = doc(db, "expenses", expenseCategoryId)
            await deleteDoc(docRef);

            setExpenses((prevExpenses) => {
                const updatedExpenses = prevExpenses.filter((expense) => expense.id !== expenseCategoryId)

                return [...updatedExpenses]
            })
        } catch (error) {
            throw error
        }
    }

    const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
        try {
            const docRef = doc(db, "expenses", expenseCategoryId);
            await updateDoc(docRef, {
                ...updatedExpense,
            });

            setExpenses((prevExpense ) => {
                const updatedExpenses = [...prevExpense];
                const pos = updatedExpenses.findIndex((ex) => ex.id === expenseCategoryId)
                updatedExpenses[pos].items = [...updatedExpense.items];
                updatedExpenses[pos].total = updatedExpense.total;

                return updatedExpenses;
            })
        } catch (error) {
            throw error
        }
    }

    const addExpenseItem = async (expenseCategoryId, newExpense) => {
        const docRef = doc(db, "expenses", expenseCategoryId);

        try {
            await updateDoc(docRef, { ...newExpense })

            setExpenses((prevExpenses) => {
                const updatedExpense = [...prevExpenses]

                const foundIndex = updatedExpense.findIndex((expense) => {
                    return expense.id == expenseCategoryId
                })

                updatedExpense[foundIndex] = {id:expenseCategoryId, ...newExpense}

                return updatedExpense
            })
        } catch (error) {
            throw error
        }

    }

    const addIncomeItem = async (newIncome) => {
        const collectionRef = collection(db, 'income')

        try {
            const docSnap = await addDoc(collectionRef, newIncome)

            setIncome((prevState) => {
                return [
                    ...prevState,
                    {
                        id: docSnap.id,
                        ...newIncome,
                    },
                ];
            })


        } catch (error) {
            console.log(error.message);
            throw error
        }

    };

    const removeIncomeItem = async (incomeId) => {
        const docRef = doc(db, "income", incomeId);
        try {
            await deleteDoc(docRef);
            setIncome((prevState) => {
                return prevState.filter((i) => i.id !== incomeId);
            })
        } catch (error) {
            console.log(error.message);
            throw error
        }
    };

    const value = { income, expenses, addIncomeItem, removeIncomeItem, addExpenseItem, addCategory, deleteExpenseItem, deleteExpenseCategory };

    useEffect(() => {

        if(!user) return;
        const getIncomeData = async () => {
            const collectionRef = collection(db, 'income')
            const q = query(collectionRef, where("uid", "==", user.uid))
            const docsSnap = await getDocs(q)

            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                }
            })

            setIncome(data)
        };

        const getExpensesData = async () => {
            const collectionRef = collection(db, "expenses")
            const q = query(collectionRef, where("uid", "==", user.uid))
            const docsSnap = await getDocs(q)

            const data = docsSnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });

            setExpenses(data)
        }

        getIncomeData();
        getExpensesData();

    }, [user])

    return (
        <financeContext.Provider value={value}>
            {children}
        </financeContext.Provider>

    )
}