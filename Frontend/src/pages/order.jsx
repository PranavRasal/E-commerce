import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContract.js";
import {useNavigate } from 'react-router-dom';

function Order() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeStatus = (orderId) => {
    navigate('/update-status', { state: { orderId } });
  }

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const storedUser = JSON.parse(
          localStorage.getItem("userInfo") || "null",
        );
        const token = user?.generatedToken ?? storedUser?.generatedToken;

        if (!token) {
          throw new Error("You must be logged in to view orders");
        }

        const endpoint =
          user?.role === "admin" ? "/api/order" : "/api/order/my-orders";
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            errorText || `Request failed with status ${response.status}`,
          );
        }

        const data = await response.json();
        setOrders(Array.isArray(data) ? data : (data?.orders ?? []));
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const formatCurrency = (value) => `$${Number(value ?? 0).toFixed(2)}`;

  const formatStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  const buildAddressLine = (address) => {
    if (!address) {
      return "Address not available";
    }

    return [address.street, address.city, address.state, address.postalCode]
      .filter(Boolean)
      .join(", ");
  };

  if (loading) {
    return <div className="px-4 py-10 text-slate-600">Loading orders...</div>;
  }

  if (!user) {
    return (
      <div className="px-4 py-10 text-slate-600">
        Please log in to view your orders.
      </div>
    );
  }

  if (error) {
    return <div className="px-4 py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            Order History
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Your Orders
          </h1>
          <p className="mt-3 text-slate-600">
            Orders are shown with the address, payment, products, and status
            from the API response.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm">
            No orders found.
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <article
                key={order._id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                      Order ID
                    </p>
                    <h2 className="mt-2 break-all text-lg font-semibold text-slate-900">
                      {order._id}
                    </h2>
                    <div className="flex flex-row ">
                      <p className="mt-2 text-sm text-slate-500">
                        Payment ID: {order.paymentid || "Not available"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <span
                      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-sm font-semibold capitalize ${formatStatusClass(order.status)}`}
                    >
                      {order.status || "pending"}
                    </span>
                    {user?.role === "admin" && (
                      <button className="mt-4 rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-green-500" onClick={() => changeStatus(order._id)}>
                        update
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 px-6 py-6 lg:grid-cols-[1.4fr_1fr]">
                  <div className="space-y-6">
                    <section>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Shipping Address
                      </p>
                      <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                        <p className="font-semibold text-slate-900">
                          {order.address?.fullName ||
                            "Customer name unavailable"}
                        </p>
                        <p className="mt-1">
                          {buildAddressLine(order.address)}
                        </p>
                      </div>
                    </section>

                    <section>
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Products
                      </p>
                      <div className="mt-3 space-y-3">
                        {(order.products || []).map((product) => {
                          const productName =
                            product.productid?.name || "Product not populated";
                          const productId =
                            product.productid?._id ||
                            product.productid ||
                            "N/A";

                          return (
                            <div
                              key={product._id}
                              className="rounded-2xl border border-slate-200 p-4"
                            >
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <p className="font-semibold text-slate-900">
                                    {productName}
                                  </p>
                                  <p className="mt-1 text-sm text-slate-500">
                                    Product ID: {productId}
                                  </p>
                                </div>
                                <div className="text-sm text-slate-600">
                                  <p>Qty: {product.quantity ?? 0}</p>
                                  <p>Price: {formatCurrency(product.price)}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  </div>

                  <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Order Summary
                    </p>
                    <dl className="mt-4 space-y-3 text-sm text-slate-600">
                      <div className="flex items-center justify-between gap-4">
                        <dt>Total Amount</dt>
                        <dd className="font-semibold text-slate-900">
                          {formatCurrency(order.totalAmount)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt>Items</dt>
                        <dd className="font-semibold text-slate-900">
                          {order.products?.length ?? 0}
                        </dd>
                      </div>
                    </dl>
                  </aside>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
