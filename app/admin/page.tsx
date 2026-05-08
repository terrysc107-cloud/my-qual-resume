import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

async function getOrders() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return []
  const supabase = createClient(url, key)
  const { data } = await supabase
    .from('resume_orders')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)
  return data ?? []
}

export default async function AdminPage() {
  // Simple token-based auth — check ?token= query param or ADMIN_TOKEN env
  const headersList = await headers()
  const url = new URL(headersList.get('x-forwarded-url') ?? 'http://localhost/admin')
  const token = url.searchParams.get('token')
  const adminToken = process.env.ADMIN_TOKEN

  if (adminToken && token !== adminToken) {
    redirect('/?auth=required')
  }

  const orders = await getOrders()

  const statusColors: Record<string, string> = {
    received: 'bg-blue-50 text-blue-600',
    researching: 'bg-yellow-50 text-yellow-600',
    drafting: 'bg-orange-50 text-orange-600',
    review: 'bg-purple-50 text-purple-600',
    delivered: 'bg-green-50 text-green-600',
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">VA Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Qualified Resume Co. — {orders.length} total orders</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-400 text-sm">No orders yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Role</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order: Record<string, string>) => (
                  <tr key={order.order_ref} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-amber-600 font-medium">{order.order_ref}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{order.first_name} {order.last_name}</div>
                      <div className="text-gray-400 text-xs">{order.email}</div>
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-700">{order.package}</td>
                    <td className="px-4 py-3 text-gray-700 max-w-[180px] truncate">{order.target_title}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[order.status ?? 'received'] ?? 'bg-gray-100 text-gray-600'}`}>
                        {order.status ?? 'received'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">
                      {order.created_at ? new Date(order.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/order/${order.order_ref}${token ? `?token=${token}` : ''}`} className="text-xs text-blue-600 hover:underline mr-3">
                        View Status
                      </Link>
                      {order.resume_url && (
                        <a href={order.resume_url} target="_blank" rel="noopener noreferrer" className="text-xs text-amber-600 hover:underline">
                          Resume ↗
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
