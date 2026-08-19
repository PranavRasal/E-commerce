import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContract.js";

function Cart() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDeleteItem = async (userId, productId) => {
    try {
      const response = await fetch(`/api/auth/user/${userId}/cart/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.generatedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setCartItems((prevItems) =>
        prevItems.filter(
          (item) => (item.productid ?? item._id)?.toString() !== productId.toString(),
        ),
      );
    } catch (err) {
      console.error("Error deleting cart item:", err);
      setError(err.message || "Unable to delete cart item");
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userId = user._id ?? user.id;
        const response = await fetch(`/api/auth/user/${userId}/cart`, {
          headers: {
            Authorization: `Bearer ${user.generatedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setCartItems(data.cart ?? []);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setError(err.message || "Unable to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  if (loading) {
    return <div className="p-4">Loading cart...</div>;
  }

  if (!user) {
    return (
      <div className="p-4 text-slate-600">Please log in to view your cart.</div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  const handleBuyAll = () => {
    window.alert("Checkout flow is not available yet.");
  };

  return (
    <div className="min-h-[70vh] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-semibold text-slate-900">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="mt-4 text-slate-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {cartItems.map((item) => (
                <li
                  key={item.productid ?? item._id}
                  onClick={() =>
                    navigate(`/product/${item.productid ?? item._id}`)
                  }
                  className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="aspect-square w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-600">
                      ${Number(item.price).toFixed(2)}
                    </p>
                    
                    <p className="mt-1 text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                   </div>
                   <div className="flex flex-row items-end justify-between p-3">
                   <button className="ml-auto rounded-full bg-green-400 px-3 py-1 text-sm font-semibold text-white  hover:bg-green-600 mb-3 mr-3" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${item.productid ?? item._id}`, {
                      state: { openCheckout: true, quantity: item.quantity },
                    });
                   }}>
                      Buy
                    </button>
                   <button className="ml-auto rounded-full bg-red-400 px-3 py-1 text-sm font-semibold text-white transition hover:bg-red-600 mb-3 mr-3"  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteItem(user._id ?? user.id, item.productid ?? item._id);
                   }}>
                      Delete
                    </button>
                    </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                  Total
                </p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>

              <button
                type="button"
                onClick={handleBuyAll}
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-9 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Buy All
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
