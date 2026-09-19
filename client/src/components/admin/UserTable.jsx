import React from "react";
import { formatDate } from "../../utils/formatters";

export const UserTable = ({
  users = [],
  onToggleStatus,
  onChangeRole,
  onDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">

      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse text-sm">

          <thead className="sticky top-0 z-10 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">

            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">

              <th className="px-6 py-4">ID</th>

              <th className="px-6 py-4">User</th>

              <th className="px-6 py-4">Email</th>

              <th className="px-6 py-4">Role</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4">Joined Date</th>

              <th className="px-6 py-4 text-right">Actions</th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

            {users.map((u) => (
              <tr
                key={u.id}
                className="group transition-all duration-300 hover:bg-indigo-50/60 dark:hover:bg-slate-800/60"
              >

                <td className="px-6 py-5">
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    #{u.id}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md">
                      {u.first_name?.charAt(0)}
                      {u.last_name?.charAt(0)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                        {u.first_name} {u.last_name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        User ID #{u.id}
                      </p>
                    </div>

                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {u.email}
                  </span>
                </td>

                <td className="px-6 py-5">

                  <select
                    value={u.role}
                    onChange={(e) => onChangeRole(u.id, e.target.value)}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm outline-none transition-all duration-300 hover:border-indigo-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:ring-indigo-800"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>

                </td>

                <td className="px-6 py-5">

                  {u.is_active ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                      🟢 Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
                      🔴 Deactivated
                    </span>
                  )}

                </td>

                <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                  {formatDate(u.created_at)}
                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => onToggleStatus(u.id, !u.is_active)}
                      className={`rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 ${
                        u.is_active
                          ? "bg-gradient-to-r from-amber-500 to-orange-500"
                          : "bg-gradient-to-r from-emerald-500 to-green-600"
                      }`}
                    >
                      {u.is_active ? "Deactivate" : "Activate"}
                    </button>

                    <button
                      onClick={() => onDelete(u.id)}
                      className="rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};