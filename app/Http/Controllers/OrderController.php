<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Show the order page
     */
    public function index()
    {
        $orders = Order::with(['items.product', 'items.size'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders
        ]);
    }

    /**
     * Display the order creation page
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();

        // Get products by category, including sizes and only available products
        $products = Product::with(['category', 'sizes'])
            ->where('is_available', true)
            ->get()
            ->groupBy('category.name');

        return Inertia::render('Orders/Create', [
            'categories' => $categories,
            'products' => $products,
        ]);
    }

    /**
     * Process an order
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.size_id' => 'nullable|exists:sizes,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        try {
            // Calculate total amount
            $totalAmount = 0;
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $price = $product->price;

                // Add size modifier if a size is selected
                if (!empty($item['size_id'])) {
                    $size = Size::findOrFail($item['size_id']);
                    $price += $size->price_modifier;
                }

                $totalAmount += $price * $item['quantity'];
            }

            // Create the order
            $order = Order::create([
                'user_id' => Auth::id(),
                'customer_name' => $validated['customer_name'],
                'total_amount' => $totalAmount,
                'notes' => $validated['notes'] ?? null,
            ]);

            // Create order items
            foreach ($validated['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $price = $product->price;

                // Add size modifier if a size is selected
                if (!empty($item['size_id'])) {
                    $size = Size::findOrFail($item['size_id']);
                    $price += $size->price_modifier;
                }

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'size_id' => $item['size_id'] ?? null,
                    'quantity' => $item['quantity'],
                    'price' => $price,
                    'notes' => $item['notes'] ?? null,
                ]);
            }

            return redirect('/orders')->with('success', 'Order placed successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to place order: ' . $e->getMessage());
        }
    }

    /**
     * Display the order details
     */
    public function show(Order $order)
    {
        $order->load(['items.product', 'items.size']);

        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the order status
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled'
        ]);

        try {
            $order->update([
                'status' => $validated['status']
            ]);

            return redirect()->back()->with('success', 'Order status updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update order status: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
