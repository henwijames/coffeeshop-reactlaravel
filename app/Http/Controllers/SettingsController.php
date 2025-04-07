<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Display the settings page
     */
    public function index()
    {
        // Get all settings
        $settings = Setting::all()->keyBy('key')->map->value;

        return Inertia::render('Settings/Index', [
            'currentRole' => Auth::user()->role,
            'settings' => $settings,
            'availableThemes' => [
                ['id' => 'coffee', 'name' => 'Coffee', 'description' => 'Warm, earthy coffee tones'],
                ['id' => 'dark', 'name' => 'Dark', 'description' => 'Dark, sleek interface'],
                ['id' => 'light', 'name' => 'Light', 'description' => 'Clean, bright interface'],
                ['id' => 'cupcake', 'name' => 'Cupcake', 'description' => 'Soft pastel colors'],
                ['id' => 'bumblebee', 'name' => 'Bumblebee', 'description' => 'Yellow-black contrast'],
                ['id' => 'emerald', 'name' => 'Emerald', 'description' => 'Cool green tones'],
            ]
        ]);
    }

    /**
     * Update site settings
     */
    public function updateSiteSettings(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_theme' => 'required|string|max:255',
            'primary_color' => 'required|string|max:255',
        ]);

        try {
            foreach ($validated as $key => $value) {
                Setting::set($key, $value, 'string', $key === 'site_name' ? 'general' : 'appearance');
            }

            // Clear cached settings
            Setting::clearCache();

            return redirect()->back()->with('success', 'Settings updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update settings: ' . $e->getMessage());
        }
    }

    /**
     * Toggle the user's role between admin and cashier
     */
    public function toggleRole()
    {
        $user = Auth::user();

        // Toggle role
        $user->role = $user->role === 'admin' ? 'cashier' : 'admin';
        $user->save();

        return redirect()->back()->with('success', 'Role updated successfully to ' . $user->role);
    }

    public function create() {}
}
