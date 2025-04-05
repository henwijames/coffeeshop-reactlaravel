<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderBy('name')->get();

        // Get products grouped by category
        $products = Product::with('category')
            ->get()
            ->groupBy('category.name');

        return Inertia::render('Products/Index', [
            'categories' => $categories,
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'is_available' => 'boolean',
            'image' => 'nullable|image|max:2048' // Max 2MB
        ]);

        try {
            // Handle image upload
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('products', 'public');
                $validated['image'] = $path;
            }

            Product::create($validated);

            return redirect()->back()->with('success', 'Product created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create product: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Products/Edit', [
            'categories' => $categories,
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'is_available' => 'boolean',
            'image' => 'nullable|image|max:2048' // Max 2MB
        ]);

        try {
            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }

                $path = $request->file('image')->store('products', 'public');
                $validated['image'] = $path;
            }

            $product->update($validated);

            return redirect()->route('products.index')->with('success', 'Product updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update product: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            $product->delete();

            return redirect()->route('products.index')->with('success', 'Product deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete product: ' . $e->getMessage());
        }
    }
}
