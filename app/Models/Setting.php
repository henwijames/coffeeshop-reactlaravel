<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value', 'type', 'group'];

    /**
     * Get a setting by key
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public static function get(string $key, $default = null)
    {
        return Cache::rememberForever('setting_' . $key, function () use ($key, $default) {
            $setting = self::where('key', $key)->first();
            return $setting ? $setting->value : $default;
        });
    }

    /**
     * Set a setting value
     *
     * @param string $key
     * @param mixed $value
     * @param string $type
     * @param string $group
     * @return void
     */
    public static function set(string $key, $value, string $type = 'string', string $group = 'general'): void
    {
        self::updateOrCreate(
            ['key' => $key],
            ['value' => $value, 'type' => $type, 'group' => $group]
        );

        Cache::forget('setting_' . $key);
    }

    /**
     * Get all settings grouped by group
     *
     * @return array
     */
    public static function getAllGrouped()
    {
        return Cache::rememberForever('settings_grouped', function () {
            return self::all()->groupBy('group')->toArray();
        });
    }

    /**
     * Clear all settings cache
     */
    public static function clearCache()
    {
        Cache::forget('settings_grouped');

        foreach (self::all() as $setting) {
            Cache::forget('setting_' . $setting->key);
        }
    }
}
