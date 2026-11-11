"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Enquiry = {
  id: number;
  name: string;
  phone: string;
  email: string;
  course: string;
  stream: string;
  village: string;
  message: string;
  language: string;
  status: "new" | "contacted" | "admitted" | "closed";
  notes: string;
  createdAt: string;
};

type Notice = {
  id: number;
  date: string;
  title: string;
  titleMr: string;
  link: string;
  published: boolean;
};

const STATUSES: Enquiry["status"][] = ["new", "contacted", "admitted", "closed"];
const field = "mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2";
const btn = "rounded-lg px-4 py-2 font-semibold";

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error ?? `Request failed (${res.status})`);
  return body as T;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function AdminDashboard({ dbConfigured }: { dbConfigured: boolean }) {
  const router = useRouter();
  const [tab, setTab] = useState<"enquiries" | "notices">("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!dbConfigured) return;
    try {
      setError("");
      const [e, n] = await Promise.all([
        api<{ enquiries: Enquiry[] }>("/api/enquiries"),
        api<{ notices: Notice[] }>("/api/notices?all=1"),
      ]);
      setEnquiries(e.enquiries);
      setNotices(n.notices);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [dbConfigured]);

  useEffect(() => {
    load();
  }, [load]);

  async function run(action: () => Promise<unknown>) {
    try {
      setError("");
      await action();
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  async function addNotice(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    await run(() => api("/api/notices", { method: "POST", body: JSON.stringify({ ...data, published: true }) }));
    form.reset();
  }

  const newCount = enquiries.filter((e) => e.status === "new").length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-primary-dark">College admin</h1>
        <div className="flex gap-3">
          <a href="/" className={`${btn} border border-gray-300 bg-white`}>
            View website
          </a>
          <button type="button" onClick={logout} className={`${btn} border border-gray-300 bg-white`}>
            Log out
          </button>
        </div>
      </div>

      {!dbConfigured && (
        <p className="mt-6 rounded-lg bg-amber-50 p-4 text-amber-900">
          No database is connected. Set <code>DATABASE_URL</code> in your <code>.env</code> file (or in
          Vercel), run <code>npm run db:deploy</code>, then restart.
        </p>
      )}
      {error && (
        <p role="alert" className="mt-6 rounded-lg bg-red-50 p-4 text-red-800">
          {error}
        </p>
      )}

      <div role="tablist" className="mt-8 flex gap-2 border-b border-gray-200">
        {(["enquiries", "notices"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className="-mb-px border-b-2 border-transparent px-4 py-2 font-semibold text-gray-600 aria-selected:border-primary aria-selected:text-primary-dark"
          >
            {t === "enquiries" ? `Enquiries${newCount ? ` (${newCount} new)` : ""}` : "Notices"}
          </button>
        ))}
      </div>

      {tab === "enquiries" ? (
        <section className="mt-6 overflow-x-auto rounded-xl bg-white shadow-sm">
          {enquiries.length === 0 ? (
            <p className="p-8 text-center text-gray-600">No enquiries yet.</p>
          ) : (
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">Received</th>
                  <th className="p-3">Student</th>
                  <th className="p-3">Course / stream</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enquiries.map((e) => (
                  <tr key={e.id} className="align-top">
                    <td className="p-3 whitespace-nowrap text-gray-600">{formatDate(e.createdAt)}</td>
                    <td className="p-3">
                      <div className="font-semibold">{e.name}</div>
                      <a href={`tel:+91${e.phone}`} className="text-primary-dark underline">
                        {e.phone}
                      </a>
                      {e.email && <div className="text-gray-600">{e.email}</div>}
                      {e.village && <div className="text-gray-600">{e.village}</div>}
                    </td>
                    <td className="p-3">
                      {e.course}
                      {e.stream && <div className="text-gray-600">{e.stream}</div>}
                    </td>
                    <td className="max-w-xs p-3 text-gray-800">{e.message}</td>
                    <td className="p-3">
                      <label className="sr-only" htmlFor={`status-${e.id}`}>
                        Status for {e.name}
                      </label>
                      <select
                        id={`status-${e.id}`}
                        value={e.status}
                        onChange={(ev) =>
                          run(() =>
                            api(`/api/enquiries/${e.id}`, {
                              method: "PATCH",
                              body: JSON.stringify({ status: ev.target.value }),
                            }),
                          )
                        }
                        className="rounded border border-gray-300 bg-white px-2 py-1"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete the enquiry from ${e.name}?`)) {
                            run(() => api(`/api/enquiries/${e.id}`, { method: "DELETE" }));
                          }
                        }}
                        className="text-red-700 underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      ) : (
        <section className="mt-6 grid gap-8 lg:grid-cols-5">
          <form onSubmit={addNotice} className="space-y-4 rounded-xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-primary-dark">Add a notice</h2>
            <div>
              <label htmlFor="n-date" className="font-medium">Date</label>
              <input id="n-date" name="date" type="date" required className={field} />
            </div>
            <div>
              <label htmlFor="n-title" className="font-medium">Title (English)</label>
              <input id="n-title" name="title" required minLength={3} maxLength={300} className={field} />
            </div>
            <div>
              <label htmlFor="n-title-mr" className="font-medium">Title (Marathi)</label>
              <input id="n-title-mr" name="titleMr" maxLength={300} lang="mr" className={field} />
            </div>
            <div>
              <label htmlFor="n-link" className="font-medium">Link (optional)</label>
              <input id="n-link" name="link" maxLength={500} placeholder="https://… or /mgdcon/notice.pdf" className={field} />
            </div>
            <button type="submit" className={`${btn} bg-primary text-white hover:bg-primary-dark`}>
              Add notice
            </button>
          </form>

          <div className="overflow-hidden rounded-xl bg-white shadow-sm lg:col-span-3">
            {notices.length === 0 ? (
              <p className="p-8 text-center text-gray-600">No notices in the database yet.</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notices.map((n) => (
                  <li key={n.id} className="flex flex-wrap items-start justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="text-sm text-gray-600">{n.date.slice(0, 10)}</div>
                      <div className="font-semibold">{n.title}</div>
                      {n.titleMr && <div lang="mr">{n.titleMr}</div>}
                      {!n.published && <span className="text-sm font-semibold text-amber-700">Hidden</span>}
                    </div>
                    <div className="flex gap-3 text-sm">
                      <button
                        type="button"
                        onClick={() =>
                          run(() =>
                            api(`/api/notices/${n.id}`, {
                              method: "PATCH",
                              body: JSON.stringify({ published: !n.published }),
                            }),
                          )
                        }
                        className="text-primary-dark underline"
                      >
                        {n.published ? "Hide" : "Show"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete the notice "${n.title}"?`)) {
                            run(() => api(`/api/notices/${n.id}`, { method: "DELETE" }));
                          }
                        }}
                        className="text-red-700 underline"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
