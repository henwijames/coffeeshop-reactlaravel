<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use App\Models\Size;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
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
        $products = Product::with(['category', 'sizes'])
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
        $sizes = Size::orderBy('price_modifier')->get();

        return Inertia::render('Products/Create', [
            'categories' => $categories,
            'sizes' => $sizes
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
            'image' => 'nullable|image|max:2048', // Max 2MB
            'sizes' => 'array|nullable'
        ]);

        try {
            // Handle image upload
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('products', 'public');
                $validated['image'] = $path;
            }

            // Create the product
            $product = Product::create($validated);

            // Attach sizes if provided
            if ($request->has('sizes') && is_array($request->sizes)) {
                $sizesData = [];

                foreach ($request->sizes as $sizeId => $sizeData) {
                    if (isset($sizeData['selected']) && $sizeData['selected']) {
                        $sizesData[$sizeId] = [
                            'price' => isset($sizeData['price']) ? $sizeData['price'] : null
                        ];
                    }
                }

                $product->sizes()->attach($sizesData);
            }

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
        $sizes = Size::orderBy('price_modifier')->get();

        // Load sizes with pivot data
        $product->load('sizes');

        return Inertia::render('Products/Edit', [
            'categories' => $categories,
            'sizes' => $sizes,
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // First log the incoming request data for debugging
        Log::info('Product update request data:', [
            'all' => $request->all(),
            'hasSize' => $request->has('sizes'),
            'sizes' => $request->input('sizes')
        ]);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'is_available' => 'boolean',
            'image' => 'nullable|image|max:2048', // Max 2MB
            'sizes' => 'nullable' // Allow any format for sizes for now
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

            // Update the product
            $product->update($validated);

            // Handle sizes with more flexible approach
            if ($request->has('sizes')) {
                $sizesData = [];
                $sizesInput = is_string($request->sizes) ? json_decode($request->sizes, true) : $request->sizes;

                if ($sizesInput && is_array($sizesInput)) {
                    foreach ($sizesInput as $sizeId => $sizeData) {
                        // Only add sizes that are selected
                        if (isset($sizeData['selected']) && $sizeData['selected']) {
                            $sizesData[$sizeId] = [
                                'price' => isset($sizeData['price']) && $sizeData['price'] !== '' ?
                                    $sizeData['price'] : null
                            ];
                        }
                    }

                    // Sync the sizes
                    $product->sizes()->sync($sizesData);
                } else {
                    Log::warning('Invalid sizes data format in product update', [
                        'sizes' => $request->sizes,
                        'decoded' => $sizesInput
                    ]);
                }
            } else {
                // If no sizes provided, detach all
                $product->sizes()->detach();
            }

            return redirect()->route('products.index')->with('success', 'Product updated successfully');
        } catch (\Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage(), [
                'exception' => $e,
                'request' => $request->all()
            ]);
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
