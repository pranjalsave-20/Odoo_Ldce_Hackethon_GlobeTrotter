"use client";
import React, { useEffect, useState } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button, Input } from "@/components/ui/index";
import { useToast } from "@/components/ui/Toast";
import { Wallet, Plus, Trash2, ArrowUpRight, TrendingUp, Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { Trip } from "@/lib/types";

export default function TripBudgetPage({ params }: { params: { id: string } }) {
  const { getTrip, updateTrip } = useTrips();
  const { addToast } = useToast();
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [addingExpense, setAddingExpense] = useState(false);
  const [expenseForm, setExpenseForm] = useState({ category: "Food", amount: "", description: "" });

  useEffect(() => {
    const t = getTrip(params.id);
    if (t) setTrip(t);
  }, [params.id, getTrip]);

  if (!trip) return null;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(expenseForm.amount);
    if (!amountNum || isNaN(amountNum)) return;

    // Update categories estimated vs actual
    const updatedCategories = trip.budget.categories.map(c => {
      if (c.name.toLowerCase() === expenseForm.category.toLowerCase()) {
        return { ...c, actual: c.actual + amountNum };
      }
      return c;
    });

    const updatedActual = trip.budget.actual + amountNum;
    const updatedRemaining = trip.budget.total - updatedActual;

    const updatedTrip = {
      ...trip,
      budget: {
        ...trip.budget,
        actual: updatedActual,
        remaining: updatedRemaining,
        categories: updatedCategories
      }
    };

    updateTrip(trip.id, updatedTrip);
    setTrip(updatedTrip);
    setAddingExpense(false);
    setExpenseForm({ category: "Food", amount: "", description: "" });
    addToast("success", `Expense of ₹${amountNum} added successfully.`);
  };

  const chartData = trip.budget.categories.map(c => ({
    name: c.name,
    Planned: c.planned,
    Actual: c.actual
  }));

  const pieData = trip.budget.categories.map(c => ({
    name: c.name,
    value: c.actual || c.planned // Fallback to planned if no actuals spent yet
  }));

  const COLORS = ["#E85D26", "#1A3A5C", "#F5C842", "#10B981"];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Financial Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 flex items-center justify-between border-l-4 border-[#1A3A5C]">
          <div>
            <p className="text-xs text-[#6B7280]">Total Allocated Budget</p>
            <p className="text-2xl font-black text-[#1C1C1E] mt-1">₹{trip.budget.total}</p>
          </div>
          <div className="w-10 h-10 bg-blue-50 text-[#1A3A5C] rounded-xl flex items-center justify-center">
            <Wallet size={20} />
          </div>
        </Card>
        <Card className="p-5 flex items-center justify-between border-l-4 border-[#E85D26]">
          <div>
            <p className="text-xs text-[#6B7280]">Total Spent (Actual)</p>
            <p className="text-2xl font-black text-gray-800 mt-1">₹{trip.budget.actual}</p>
          </div>
          <div className="w-10 h-10 bg-orange-50 text-[#E85D26] rounded-xl flex items-center justify-center">
            <ArrowUpRight size={20} />
          </div>
        </Card>
        <Card className="p-5 flex items-center justify-between border-l-4 border-emerald-500">
          <div>
            <p className="text-xs text-[#6B7280]">Remaining Budget</p>
            <p className="text-2xl font-black text-gray-800 mt-1">₹{trip.budget.remaining}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Charts & Graphs */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-[#E5E0D8]">
              <div>
                <h3 className="text-lg font-bold text-[#1C1C1E]">Planned vs Actual Spending</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">Compare category allocations.</p>
              </div>
              <Button variant="primary" size="sm" onClick={() => setAddingExpense(true)}>
                <Plus size={14} /> Add Expense
              </Button>
            </div>

            {/* Recharts Bar Chart */}
            <div className="h-64 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Planned" fill="#1A3A5C" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Actual" fill="#E85D26" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Detailed table */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E]">Spending Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Planned</th>
                    <th className="px-6 py-3">Actual Spent</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trip.budget.categories.map((c, i) => {
                    const pct = c.planned > 0 ? (c.actual / c.planned) * 100 : 0;
                    return (
                      <tr key={i} className="bg-white border-b border-[#E5E0D8]">
                        <td className="px-6 py-4 font-semibold text-[#1C1C1E]">{c.name}</td>
                        <td className="px-6 py-4">₹{c.planned}</td>
                        <td className="px-6 py-4">₹{c.actual}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            pct > 100 ? "bg-red-100 text-red-800" : pct > 80 ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
                          }`}>
                            {pct > 100 ? "Overbudget" : pct > 0 ? `${pct.toFixed(0)}% Used` : "No Spends"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right Side: Pie Chart & Expense Form */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Spending Distribution</h3>
            <div className="h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 text-xs">
              {trip.budget.categories.map((c, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-[#6B7280]">{c.name}</span>
                  </div>
                  <span className="font-semibold text-gray-800">₹{c.actual || c.planned}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Expense modal */}
      {addingExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAddingExpense(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="bg-[#E85D26] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold">Add New Expense</h3>
              <button onClick={() => setAddingExpense(false)}>✕</button>
            </div>
            <form onSubmit={handleAddExpense} className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Category</label>
                <select
                  value={expenseForm.category}
                  onChange={e => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  className="w-full border border-[#E5E0D8] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#E85D26]"
                >
                  <option value="Transport">Transport</option>
                  <option value="Hotel">Hotel / Stay</option>
                  <option value="Food">Food & Dinings</option>
                  <option value="Activities">Activities / Sightseeing</option>
                </select>
              </div>
              <Input
                label="Amount (₹)"
                type="number"
                value={expenseForm.amount}
                onChange={e => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                required
              />
              <Input
                label="Short Description"
                value={expenseForm.description}
                onChange={e => setExpenseForm({ ...expenseForm, description: e.target.value })}
                placeholder="Dinner at Agashiye..."
              />
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="md" className="flex-1" onClick={() => setAddingExpense(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Save Expense
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
