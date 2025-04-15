<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        if ($user->profile_image) {
            $user->profile_image = Storage::url($user->profile_image);
        }
        return Inertia::render('Profile', [
            'user' => $user
        ]);
    }

    public function update(Request $request)
    {
        Log::info('Profile update attempted');
        $user = Auth::user();

        // Log raw request details
        Log::info('Raw request details:', [
            'files' => $request->allFiles(),
            'has_file' => $request->hasFile('profile_image'),
            'content_type' => $request->header('Content-Type'),
            'method' => $request->method(),
            'real_method' => $request->getRealMethod(),
            'all_input' => $request->all()
        ]);

        // Validate the request
        $validationRules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
        ];

        if ($request->hasFile('profile_image')) {
            $validationRules['profile_image'] = ['required', 'image', 'max:2048'];

            // Log file details
            $file = $request->file('profile_image');
            Log::info('Profile image details:', [
                'original_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'size' => $file->getSize(),
                'error' => $file->getError(),
                'error_message' => $file->getErrorMessage()
            ]);
        }

        $validated = $request->validate($validationRules);

        try {
            // Handle profile image upload
            if ($request->hasFile('profile_image')) {
                // Delete old image if exists
                if ($user->profile_image) {
                    Storage::disk('public')->delete($user->profile_image);
                    Log::info('Old profile image deleted');
                }

                // Store new image
                $path = $request->file('profile_image')->store('profile-images', 'public');
                $validated['profile_image'] = $path;
            }

            // Update user
            $user->update($validated);

            // Return success response
            return redirect()->back()->with('success', 'Profile updated successfully');
        } catch (\Exception $e) {
            Log::error('Error updating profile: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update profile');
        }
    }
}
