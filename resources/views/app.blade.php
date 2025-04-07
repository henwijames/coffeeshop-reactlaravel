<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}"
  data-theme="{{ \App\Models\Setting::get('site_theme', 'coffee') }}">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="icon" href="/favicon.ico" />
  @viteReactRefresh
  @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
  @inertiaHead
  <title>{{ \App\Models\Setting::get('site_name', 'Kaffee Siyap') }}</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

</head>

<body class="h-full font-sans antialiased bg-base-300">
  @inertia
</body>

</html>
