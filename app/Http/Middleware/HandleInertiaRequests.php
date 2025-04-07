<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => Auth::user() ? [
                    'id' => Auth::id(),
                    'name' => Auth::user()->name,
                    'email' => Auth::user()->email,
                    'profile_image' => Auth::user()->profile_image,
                    'role' => Auth::user()->role,
                ] : null
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'appSettings' => $this->getAppSettings(),
        ]);
    }

    /**
     * Get application settings from the database
     */
    private function getAppSettings(): array
    {
        try {
            return \App\Models\Setting::all()->keyBy('key')->map->value->toArray();
        } catch (\Exception $e) {
            return [
                'site_name' => 'Kaffee Siyap',
                'site_theme' => 'coffee',
                'primary_color' => '#DB924C',
            ];
        }
    }
}
