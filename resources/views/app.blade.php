<!DOCTYPE html>
<html data-theme="corporate" class="h-full">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <link rel="icon" href="/favicon.ico" />
  @viteReactRefresh
  @vite('resources/js/app.jsx')
  @inertiaHead
</head>

<body class="h-full">
  @inertia
</body>

</html>
