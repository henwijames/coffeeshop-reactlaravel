<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get total revenue, order count, customer count, and product count
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_amount');
        $orderCount = Order::count();
        $customerCount = User::count();
        $productCount = Product::count();

        // Get monthly sales data for the current year
        $monthlySales = Order::where('status', '!=', 'cancelled')
            ->whereYear('created_at', date('Y'))
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total_amount) as sales')
            )
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Format sales data for chart
        $salesData = [];
        $monthNames = [
            1 => 'Jan',
            2 => 'Feb',
            3 => 'Mar',
            4 => 'Apr',
            5 => 'May',
            6 => 'Jun',
            7 => 'Jul',
            8 => 'Aug',
            9 => 'Sep',
            10 => 'Oct',
            11 => 'Nov',
            12 => 'Dec'
        ];

        // Initialize all months with zero
        foreach ($monthNames as $monthNum => $monthName) {
            $salesData[] = [
                'name' => $monthName,
                'sales' => 0
            ];
        }

        // Fill in actual sales data
        foreach ($monthlySales as $monthlySale) {
            $monthIndex = $monthlySale->month - 1; // Array is 0-indexed
            $salesData[$monthIndex]['sales'] = (float) $monthlySale->sales;
        }

        // Get recent orders
        $recentOrders = Order::with(['items.product'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'customer' => $order->customer_name,
                    'product' => $order->items->first() ? $order->items->first()->product->name : 'Unknown',
                    'total' => $order->total_amount,
                    'status' => $order->status,
                    'created_at' => $order->created_at,
                ];
            });

        // Calculate trends (comparison with previous month)
        $lastMonthRevenue = Order::where('status', '!=', 'cancelled')
            ->whereMonth('created_at', '=', Carbon::now()->subMonth()->month)
            ->sum('total_amount');

        $lastMonthOrders = Order::whereMonth('created_at', '=', Carbon::now()->subMonth()->month)
            ->count();

        $revenueTrend = $lastMonthRevenue > 0
            ? (($totalRevenue - $lastMonthRevenue) / $lastMonthRevenue) * 100
            : 100;

        $orderTrend = $lastMonthOrders > 0
            ? (($orderCount - $lastMonthOrders) / $lastMonthOrders) * 100
            : 100;

        // Default positive trends for customers and products (could be refined with actual data)
        $customerTrend = 8.1;
        $productTrend = 2.3;

        return Inertia::render("Dashboard", [
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'orderCount' => $orderCount,
                'customerCount' => $customerCount,
                'productCount' => $productCount,
                'revenueTrend' => $revenueTrend,
                'orderTrend' => $orderTrend,
                'customerTrend' => $customerTrend,
                'productTrend' => $productTrend,
            ],
            'salesData' => $salesData,
            'recentOrders' => $recentOrders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
